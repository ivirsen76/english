import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from './form'
import { SubmissionError } from 'redux-form'

export default class Component extends React.Component {
    static propTypes = {
        addCard: PropTypes.func,
        nextNewId: PropTypes.number,
        latestLabel: PropTypes.string,
    }

    handleSubmit = async values => {
        try {
            await this.props.addCard(values)
            notification('Card has been added')
        } catch (error) {
            throw new SubmissionError(error)
        }
    }

    render() {
        const trigger = (
            <button id="addCardButton" className="ui compact primary button">
                Add card
            </button>
        )

        return (
            <Modal size="small" closeIcon trigger={trigger}>
                <Modal.Header>Add card</Modal.Header>
                <Modal.Content>
                    <div key={this.props.nextNewId}>
                        <Form
                            form={'addCard' + this.props.nextNewId}
                            onSubmit={this.handleSubmit}
                            initialValues={{ label: this.props.latestLabel }}
                            submitButtonTitle="Add card"
                        />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
