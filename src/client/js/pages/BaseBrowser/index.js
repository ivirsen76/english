import React from 'react'
import PropTypes from 'prop-types'
import { loadBases } from 'client/js/reducers/base'
import { loadCards } from 'client/js/reducers/card'
import { getSortedList } from 'client/js/selectors/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import { Link } from 'react-router-dom'
import BaseTree from 'client/js/components/BaseTree'
import { isLoggedIn } from 'client/js/utils/auth.js'
import CardsView from './CardsView'
import style from './style.module.css'

class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        base: PropTypes.object,
        loadBases: PropTypes.func,
        loadCards: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadBases()
        if (isLoggedIn()) {
            this.props.loadCards()
        }
    }

    getBreadcrumbs = id => {
        const result = []

        const processParent = parentId => {
            const parent = this.props.list.find(item => item.id === parentId)
            if (!parent) {
                return
            }

            result.push(parent)
            processParent(parent.parentId)
        }

        const node = this.props.list.find(item => item.id === id)
        if (node) {
            processParent(node.parentId)
        }

        // Add top level
        if (id !== 0) {
            result.push({ title: 'Базы карточек', id: 0 })
        }

        return result.reverse()
    }

    render() {
        const { loading, base } = this.props
        const breadcrumbs = this.getBreadcrumbs(base.id)
        const basePath = this.props.match.path.replace('/:id?', '')

        return (
            <Loader loading={loading}>
                <h2>{base.title}</h2>
                <div className={style.breadcrumb}>
                    <div className="ui breadcrumb">
                        {breadcrumbs.map(item => [
                            <Link
                                className="section"
                                key={item.id}
                                to={item.id === 0 ? basePath : `${basePath}/${item.id}`}
                            >
                                {item.title}
                            </Link>,
                            <i className="right angle icon divider" key="divider" />,
                        ])}
                        <div className="section">{base.title}</div>
                    </div>
                </div>
                {base.type === 'cards' ? (
                    <CardsView base={base} />
                ) : (
                    <BaseTree base={base} url={basePath} />
                )}
            </Loader>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = +props.match.params.id

    return {
        base: state.app.base.list.find(item => item.id === baseId) || {
            id: 0,
            title: 'Базы карточек',
        },
        loading: state.app.base.loading,
        list: getSortedList(state.app.base),
    }
}

export default connect(mapStateToProps, { loadBases, loadCards })(Component)
