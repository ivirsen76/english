import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getSortedList } from 'client/js/selectors/base'
import { connect } from 'react-redux'
import style from './style.module.css'

class BaseTree extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        baseId: PropTypes.number,
        url: PropTypes.string,
    }

    static defaultProps = {
        url: '/user/baseBrowser',
    }

    getSubtree = id => {
        const getChildren = parentId =>
            this.props.list.filter(item => item.parentId === parentId).map(item => {
                const child = item
                if (child.type === 'folder') {
                    child.children = getChildren(child.id)
                }

                return child
            })

        const parent = this.props.list.find(item => item.id === id)

        return {
            ...parent,
            isMain: false,
            children: getChildren(id),
        }
    }

    showTree = parent => {
        let title
        if (parent.type === 'cards') {
            title = (
                <div>
                    <Link to={`${this.props.url}/${parent.id}`} style={{ position: 'relative' }}>
                        {parent.title}
                        <div className={style.count}>{parent.count}</div>
                    </Link>
                </div>
            )
        } else if (parent.isMain) {
            title = (
                <div>
                    <Link to={`${this.props.url}/${parent.id}`}>{parent.title}</Link>
                </div>
            )
        } else {
            title = <div className={style.title}>{parent.title}</div>
        }

        return (
            <div>
                {parent.id !== this.props.baseId && title}
                {parent.children &&
                    !parent.isMain && (
                        <div className={parent.arrangeChildren === 'table' && style.table}>
                            {parent.children.map(child => (
                                <div key={child.id}>{this.showTree(child)}</div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }

    render() {
        const subtree = this.getSubtree(this.props.baseId)

        return <div>{this.showTree(subtree)}</div>
    }
}

const mapStateToProps = (state, props) => ({
    list: getSortedList(state.app.base),
})

export default connect(mapStateToProps)(BaseTree)