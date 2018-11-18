import React from 'react'
import PropTypes from 'prop-types'
import {
    loadBases,
    moveElement,
    addElement,
    saveBaseTree,
    updateBase,
    deleteBase,
    toggleShowBaseSettings,
    saveBaseImage,
} from 'client/js/reducers/base'
import {
    getTree,
    getNewIds,
    getUpdatedIds,
    getProtectedIds,
    getHasTreeChanges,
} from 'client/js/selectors/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import Tree from '@ieremeev/tree'
import _pick from 'lodash/pick'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import IconCross from '@ieremeev/icons/cross'
import Element from './Element'
import CardsView from './CardsView'
import FolderView from './FolderView'
import style from './style.module.css'

class Component extends React.Component {
    static propTypes = {
        tree: PropTypes.object,
        base: PropTypes.object,
        showBaseSettings: PropTypes.bool,
        loadBases: PropTypes.func,
        addElement: PropTypes.func,
        moveElement: PropTypes.func,
        saveBaseTree: PropTypes.func,
        newIds: PropTypes.array,
        updatedIds: PropTypes.array,
        protectedIds: PropTypes.array,
        hasTreeChanges: PropTypes.bool,
        updateBase: PropTypes.func,
        deleteBase: PropTypes.func,
        toggleShowBaseSettings: PropTypes.func,
        saveBaseImage: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadBases()
    }

    deleteBase = async (baseId, e) => {
        e && e.preventDefault()
        e && e.stopPropagation()

        this.props.deleteBase(baseId)
    }

    getTree = () => {
        const baseId = +this.props.match.params.id
        const { newIds, updatedIds } = this.props

        const getBranch = element => {
            const result = _pick(element, ['id', 'isAdult'])
            const isActive = element.id === baseId

            result.component = (
                <Link to={`/user/base/${element.id}`}>
                    <div
                        className={classnames('testcafeTreeItem', style.item, style[element.type], {
                            [style.active]: isActive,
                        })}
                    >
                        {newIds.includes(element.id) && (
                            <div className={style.mark + ' ' + style.new} title="New" />
                        )}
                        {updatedIds.includes(element.id) && (
                            <div className={style.mark + ' ' + style.dirty} title="Updated" />
                        )}
                        {element.type === 'folder' && <i className="ui folder icon" />}
                        {element.title}
                        <div className={style.actions}>
                            {!this.props.protectedIds.includes(element.id) && (
                                <div onClick={this.deleteBase.bind(this, element.id)}>
                                    <IconCross />
                                </div>
                            )}
                        </div>
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

    onElementClick = (expandElement, element) => {
        let parentId = 0
        if (this.props.base.type === 'folder') {
            parentId = this.props.base.id
        }
        this.props.addElement({ element, parentId })
        expandElement(parentId)
    }

    render() {
        const { loading, base, hasTreeChanges } = this.props

        return (
            <Loader loading={loading}>
                <h2>Bases</h2>
                <div className={style.grid}>
                    <div className={style.tree}>
                        <Tree
                            tree={this.getTree()}
                            dragDropType="BUILDER"
                            onDrop={this.onDrop}
                            indentSize={20}
                            render={({ tree, expandElement }) => {
                                const onElementClick = this.onElementClick.bind(this, expandElement)

                                return (
                                    <div>
                                        <div className={style.topArea}>
                                            <div className={style.elementArea}>
                                                <Element
                                                    element={{ type: 'folder', title: 'Folder' }}
                                                    onClick={onElementClick}
                                                />
                                                <Element
                                                    element={{ type: 'cards', title: 'Cards' }}
                                                    onClick={onElementClick}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    id="saveButton"
                                                    onClick={this.props.saveBaseTree}
                                                    className={`fluid compact ui ${
                                                        hasTreeChanges ? 'orange' : ''
                                                    } button`}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>

                                        {tree}
                                    </div>
                                )
                            }}
                        />
                    </div>
                    {base.id !== 0 && (
                        <div className={style.body}>
                            {base.type === 'cards' ? (
                                <CardsView
                                    key={base.id}
                                    base={base}
                                    updateBase={this.props.updateBase}
                                />
                            ) : (
                                <FolderView
                                    key={base.id}
                                    base={base}
                                    updateBase={this.props.updateBase}
                                    showBaseSettings={this.props.showBaseSettings}
                                    toggleShowBaseSettings={this.props.toggleShowBaseSettings}
                                    saveBaseImage={this.props.saveBaseImage}
                                />
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
        newIds: getNewIds(state.app.base),
        updatedIds: getUpdatedIds(state.app.base),
        protectedIds: getProtectedIds(state.app.base),
        hasTreeChanges: getHasTreeChanges(state.app.base),
        showBaseSettings: state.app.base.showBaseSettings,
    }
}

export default connect(mapStateToProps, {
    loadBases,
    moveElement,
    addElement,
    saveBaseTree,
    updateBase,
    deleteBase,
    toggleShowBaseSettings,
    saveBaseImage,
})(Component)
