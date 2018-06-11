import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FolderView from './FolderView'
import CardsView from './CardsView'
import { getParents } from 'js/helpers/base.js'
import { Link } from 'react-router-dom'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        parents: PropTypes.array,
    }

    renderBreadcrumbs = () => {
        const { base, parents } = this.props

        return (
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
        )
    }

    render() {
        const { base } = this.props

        return (
            <div>
                <h2>{base.title}</h2>
                <div style={{ margin: '-1em 0 1em' }}>{this.renderBreadcrumbs()}</div>
                {base.type === 'cards' ? <CardsView base={base} /> : <FolderView base={base} />}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = +props.match.params.id

    return {
        parents: getParents(state.app.base.list, baseId),
        base: state.app.base.list.find(item => item.id === baseId),
    }
}

export default connect(mapStateToProps)(ShowBase)
