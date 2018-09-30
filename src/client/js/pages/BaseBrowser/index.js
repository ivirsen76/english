import React from 'react'
import PropTypes from 'prop-types'
import { loadBases } from 'client/js/reducers/base'
import { getSortedList } from 'client/js/selectors/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import { Link } from 'react-router-dom'
import CardsView from './CardsView'
import style from './style.module.css'

class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        base: PropTypes.object,
        loadBases: PropTypes.func,
        loading: PropTypes.bool,
    }

    componentDidMount() {
        this.props.loadBases()
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
            children: getChildren(id),
        }
    }

    showTree = (parent, level = 0) => {
        const maxLevel = 3
        const isLastLevel = level === maxLevel

        let title
        if (parent.type === 'cards') {
            title = (
                <div>
                    <Link to={`/user/baseBrowser/${parent.id}`}>
                        {parent.title}
                        {` (${parent.count})`}
                    </Link>
                </div>
            )
        } else if (isLastLevel) {
            title = (
                <div>
                    <Link to={`/user/baseBrowser/${parent.id}`}>{parent.title}</Link>
                </div>
            )
        } else {
            title = <div className={style.title}>{parent.title}</div>
        }

        return (
            <div>
                {title}
                {level < maxLevel &&
                    parent.children && (
                        <div className={[1, 12].includes(parent.id) && style.table}>
                            {parent.children.map(child => (
                                <div key={child.id}>{this.showTree(child, level + 1)}</div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }

    render() {
        const { loading, base } = this.props

        return (
            <Loader loading={loading}>
                <h2>{base.title}</h2>
                {base.type === 'cards' ? (
                    <CardsView base={base} />
                ) : (
                    this.showTree(this.getSubtree(base.id))
                )}
            </Loader>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = +props.match.params.id

    return {
        base: state.app.base.list.find(item => item.id === baseId) || { id: 0, title: 'Bases' },
        loading: state.app.base.loading,
        list: getSortedList(state.app.base),
    }
}

export default connect(mapStateToProps, { loadBases })(Component)
