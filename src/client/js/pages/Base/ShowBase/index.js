import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FolderView from './FolderView'
import CardsView from './CardsView'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
    }

    render() {
        const { base } = this.props

        return (
            <div>
                <h2>{base.title}</h2>
                {base.type === 'cards' ? <CardsView base={base} /> : <FolderView base={base} />}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    base: state.app.base.list.find(item => item.id === +props.match.params.id),
})

export default connect(mapStateToProps)(ShowBase)
