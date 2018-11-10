import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import EditCard from './EditCard'
import DeleteCard from './DeleteCard'
import { addCard, deleteCard, updateCard, loadBaseCards } from 'client/js/reducers/base.js'
import Loader from '@ieremeev/loader'
import AudioLink from 'client/js/components/AudioLink'
import { Formik, Form, Field, SemanticInput, SemanticTextarea } from '@ieremeev/formik'
import WordHelper from './WordHelper'
import style from './style.module.css'

export const errorMessages = {
    noTitle: 'You have to provide title',
}

export const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = errorMessages.noTitle
    }

    return errors
}

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        updateBase: PropTypes.func,
        list: PropTypes.array,
        cardsLoaded: PropTypes.bool,
        addCard: PropTypes.func,
        deleteCard: PropTypes.func,
        updateCard: PropTypes.func,
        loadBaseCards: PropTypes.func,
    }

    state = {
        loading: false,
    }

    componentDidMount = async () => {
        if (!this.props.cardsLoaded) {
            this.setState({ loading: true })
            await this.props.loadBaseCards(this.props.base.id)
            this.setState({ loading: false })
        }
    }

    addCard = async values => {
        const baseId = this.props.base.id
        await this.props.addCard({ ...values, baseId })
    }

    updateBase = values => {
        this.props.updateBase({ ...values, id: this.props.base.id })
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
            <div>
                <h2>{this.props.base.title}</h2>
                <div className="margin1">
                    <Formik
                        initialValues={{
                            title: this.props.base.title,
                            words: this.props.base.words,
                        }}
                        isInitialValid
                        validate={validate}
                        onValidChange={this.updateBase}
                        render={props => (
                            <Form className="ui form">
                                <Field
                                    name="title"
                                    component={SemanticInput}
                                    label="Title"
                                    autoFocus
                                />
                                <Field name="words" component={SemanticTextarea} label="Words" />
                                <WordHelper base={this.props.base} idPrefix="table_" />
                            </Form>
                        )}
                    />
                </div>
                <div className="margin1">
                    <AddCard addCard={this.addCard} base={this.props.base} />
                </div>
                <Loader type="inline" loading={this.state.loading}>
                    <Table
                        data={this.props.list}
                        columns={columns}
                        perPage={500}
                        showRowNumber
                        orderBy="createdAt"
                        isAscentOrder={false}
                    />
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

export default connect(mapStateToProps, { addCard, deleteCard, updateCard, loadBaseCards })(
    ShowBase
)
