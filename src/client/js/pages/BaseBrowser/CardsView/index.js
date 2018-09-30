import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import { loadCards } from 'client/js/reducers/base.js'
import Loader from '@ieremeev/loader'
import AudioLink from 'client/js/components/AudioLink'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array,
        cardsLoaded: PropTypes.bool,
        loadCards: PropTypes.func,
    }

    state = {
        loading: false,
    }

    componentDidMount = async () => {
        if (!this.props.cardsLoaded) {
            this.setState({ loading: true })
            await this.props.loadCards(this.props.base.id)
            this.setState({ loading: false })
        }
    }

    render() {
        const columns = [
            {
                name: 'text',
                label: 'Text',
                filter: true,
                sort: true,
                render: (value, row) => <AudioLink text={value} audioUrl={row.usSoundFile} />,
            },
            {
                name: 'translate',
                label: 'Translate',
                filter: true,
                sort: true,
                render: (value, row) => <AudioLink text={value} audioUrl={row.ruSoundFile} />,
            },
        ]

        return (
            <div>
                <Loader type="inline" loading={this.state.loading}>
                    <Table data={this.props.list} columns={columns} showRowNumber />
                </Loader>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = props.base.id

    return {
        cardsLoaded: !!state.app.base.cards.find(item => item.baseId === baseId),
        list: state.app.base.cards.filter(item => item.baseId === baseId),
    }
}

export default connect(mapStateToProps, { loadCards })(ShowBase)
