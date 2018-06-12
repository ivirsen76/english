import React from 'react'
import PropTypes from 'prop-types'
import { loadBases } from 'js/reducers/base'
import { connect } from 'react-redux'
import Loader from '@ieremeev/loader'
import FolderView from './FolderView'
import CardsView from './CardsView'
import { Link } from 'react-router-dom'
import { getParents } from 'js/helpers/base.js'

class Component extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        parents: PropTypes.array,
        loadBases: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadBases()
    }

    renderBreadcrumbs = () => {
        const { base, parents } = this.props

        if (base.id === 0) {
            return null
        }

        return (
            <div style={{ margin: '-1em 0 1em' }}>
                <div className="ui breadcrumb">
                    <Link to="/user/base" className="section">
                        Bases
                    </Link>
                    <i className="right angle icon divider" />
                    {parents.map(parent => [
                        <Link key="link" to={`/user/base/${parent.id}`} className="section">
                            {parent.title}
                        </Link>,
                        <i key="divider" className="right angle icon divider" />,
                    ])}
                    <div className="active section">{base.title}</div>
                </div>
            </div>
        )
    }

    render() {
        const { loading, base } = this.props

        return (
            <Loader loading={loading}>
                <h2>{base.title}</h2>
                {this.renderBreadcrumbs()}
                {base.type === 'cards' ? <CardsView base={base} /> : <FolderView base={base} />}
            </Loader>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = +props.match.params.id

    return {
        parents: getParents(state.app.base.list, baseId),
        base: state.app.base.list.find(item => item.id === baseId) || { id: 0, title: 'Bases' },
        loading: state.app.base.loading,
    }
}

export default connect(mapStateToProps, { loadBases })(Component)
