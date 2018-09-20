import React from 'react'
import PropTypes from 'prop-types'
import { loadBases, moveElement } from 'client/js/reducers/base'
import { getTree } from 'client/js/selectors/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import FolderView from './FolderView'
import CardsView from './CardsView'
import Tree from '@ieremeev/tree'
import _pick from 'lodash/pick'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import style from './style.module.css'

class Component extends React.Component {
    static propTypes = {
        tree: PropTypes.object,
        base: PropTypes.object,
        loadBases: PropTypes.func,
        moveElement: PropTypes.func,
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

    moveElement = (element, parentId, beforeId) => {
        this.props.moveElement({ id: element.id, parentId, beforeId })
    }

    render() {
        const { loading, base } = this.props

        return (
            <Loader loading={loading}>
                <h2>Bases</h2>
                <div className={style.grid}>
                    <div className={style.tree}>
                        <Tree
                            tree={this.getTree()}
                            dragDropType="BUILDER"
                            onDrop={this.moveElement}
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

export default connect(mapStateToProps, { loadBases, moveElement })(Component)
