import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import { loadCards } from 'client/js/reducers/base.js'
import { addCardsFromBase } from 'client/js/reducers/card.js'
import Loader from '@ieremeev/loader'
import notification from '@ieremeev/notification'
import AudioLink from 'client/js/components/AudioLink'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array,
        cardsLoaded: PropTypes.bool,
        loadCards: PropTypes.func,
        addCardsFromBase: PropTypes.func,
    }

    state = {
        loading: false,
        adding: false,
    }

    componentDidMount = async () => {
        if (!this.props.cardsLoaded) {
            this.setState({ loading: true })
            await this.props.loadCards(this.props.base.id)
            this.setState({ loading: false })
        }
    }

    addCards = async () => {
        this.setState({ adding: true })
        await this.props.addCardsFromBase(this.props.base.id)
        this.setState({ adding: false })
        notification('The cards have been added')
    }

    render() {
        const { adding, loading } = this.state

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
                <Loader type="inline" loading={loading}>
                    <div className="margin1">
                        <button
                            className={`ui ${adding && 'loading'} compact primary button`}
                            onClick={this.addCards}
                        >
                            Добавить все новые карточки
                        </button>
                    </div>
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

export default connect(mapStateToProps, { loadCards, addCardsFromBase })(ShowBase)
