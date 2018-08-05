import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import EditCard from './EditCard'
import DeleteCard from './DeleteCard'
import { addCard, deleteCard, updateCard, loadCards } from 'client/js/reducers/base.js'
import Loader from '@ieremeev/loader'
import AudioLink from 'client/js/components/AudioLink'
import style from './style.module.css'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array,
        cardsLoaded: PropTypes.bool,
        addCard: PropTypes.func,
        deleteCard: PropTypes.func,
        updateCard: PropTypes.func,
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

    addCard = values => {
        const baseId = this.props.base.id
        this.props.addCard({ ...values, baseId })
    }

    render() {
        const columns = [
            {
                name: 'actions',
                label: '',
                render: (value, row) => (
                    <div>
                        <EditCard
                            id={row.id}
                            updateCard={this.props.updateCard}
                            initialValues={row}
                        />
                        <DeleteCard deleteCard={this.props.deleteCard} id={row.id} />
                    </div>
                ),
                className: style.actions,
            },
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
            {
                name: 'createdAt',
                label: 'Created at',
                sort: true,
                render: (value, row) => format(new Date(value), 'DD.MM.YYYY'),
            },
        ]

        return (
            <Loader loading={this.state.loading}>
                <div className="margin1">
                    <AddCard addCard={this.addCard} />
                </div>
                <Table data={this.props.list} columns={columns} showRowNumber />
            </Loader>
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

export default connect(mapStateToProps, { addCard, deleteCard, updateCard, loadCards })(ShowBase)
