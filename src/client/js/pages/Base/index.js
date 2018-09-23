import React from 'react'
import PropTypes from 'prop-types'
import { loadBases, moveElement, addElement, saveBaseTree } from 'client/js/reducers/base'
import { getTree } from 'client/js/selectors/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import FolderView from './FolderView'
import CardsView from './CardsView'
import Tree from '@ieremeev/tree'
import _pick from 'lodash/pick'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Element from './Element'
import style from './style.module.css'

class Component extends React.Component {
    static propTypes = {
        tree: PropTypes.object,
        base: PropTypes.object,
        loadBases: PropTypes.func,
        addElement: PropTypes.func,
        moveElement: PropTypes.func,
        saveBaseTree: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadBases()
    }

    getTree = () => {
        const baseId = +this.props.match.params.id

        const getBranch = element => {
            const result = _pick(element, ['id', 'isAdult'])
            const isActive = element.id === baseId

            result.component = (
                <Link to={`/user/base/${element.id}`}>
                    <div
                        className={classnames(style.item, style[element.type], {
                            [style.active]: isActive,
                        })}
                    >
                        {element.type === 'folder' && <i className="ui folder icon" />}
                        {element.title}
                    </div>
                </Link>
            )

            if (element.children) {
                result.children = element.children.map(child => getBranch(child))
            }

            return result
        }

        return getBranch(this.props.tree)
    }

    onDrop = (element, parentId, beforeId) => {
        if (element.id) {
            this.props.moveElement({ id: element.id, parentId, beforeId })
        } else {
            this.props.addElement({ element, parentId, beforeId })
        }
    }

    render() {
        const { loading, base } = this.props

        return (
            <Loader loading={loading}>
                <h2>Bases</h2>
                <div className={style.grid}>
                    <div className={style.tree}>
                        <div style={{ marginBottom: '0.5em' }}>
                            <button onClick={this.props.saveBaseTree} className="tiny ui button">
                                Save
                            </button>
                        </div>
                        <div className={style.addArea}>
                            <div>Add:</div>
                            <Element element={{ type: 'folder', title: 'Folder' }} />
                            <Element element={{ type: 'cards', title: 'Cards' }} />
                        </div>

                        <Tree
                            tree={this.getTree()}
                            dragDropType="BUILDER"
                            onDrop={this.onDrop}
                            indentSize={20}
                        />
                    </div>
                    {base.id !== 0 && (
                        <div className={style.body}>
                            <h2>{base.title}</h2>
                            {base.type === 'cards' ? (
                                <CardsView base={base} />
                            ) : (
                                <FolderView base={base} />
                            )}
                        </div>
                    )}
                </div>
            </Loader>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = +props.match.params.id

    return {
        base: state.app.base.list.find(item => item.id === baseId) || { id: 0, title: 'Bases' },
        loading: state.app.base.loading,
        tree: getTree(state.app.base),
    }
}

export default connect(mapStateToProps, { loadBases, moveElement, addElement, saveBaseTree })(
    Component
)
