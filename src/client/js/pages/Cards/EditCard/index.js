import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from '../AddCard/form'
import { SubmissionError } from 'redux-form'

export default class Component extends React.Component {
    static propTypes = {
        cardId: PropTypes.number,
        initialValues: PropTypes.object,
        updateCard: PropTypes.func,
    }

    handleSubmit = async values => {
        try {
            await this.props.updateCard(values)
            notification('Card has been updated')
            this.modal.handleClose()
        } catch (error) {
            throw new SubmissionError(error)
        }
    }

    render() {
        const trigger = (
            <button
                id={`updateCardButton${this.props.cardId}`}
                className="ui green compact mini icon button"
            >
                <i className="icon-pencil" />
            </button>
        )

        return (
            <Modal
                size="small"
                closeIcon
                trigger={trigger}
                ref={modal => {
                    this.modal = modal
                }}
            >
                <Modal.Header>Update card</Modal.Header>
                <Modal.Content>
                    <Form
                        form="editCard"
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues}
                        submitButtonTitle="Update card"
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
