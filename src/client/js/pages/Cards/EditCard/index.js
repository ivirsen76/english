import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from '../AddCard/form'
import IconPencil from '@ieremeev/icons/pencil'
import playCard from 'client/js/helpers/playCard.js'

export default class Component extends React.Component {
    static propTypes = {
        cardId: PropTypes.number,
        initialValues: PropTypes.object,
        updateCard: PropTypes.func,
        trigger: PropTypes.node,
    }

    handleSubmit = async values => {
        try {
            const card = await this.props.updateCard(values)
            notification('Card has been updated')
            this.modal.handleClose()
            playCard(card)
        } catch (errors) {
            throw errors
        }
    }

    render() {
        const trigger = this.props.trigger || (
            <button
                id={`updateCardButton${this.props.cardId}`}
                className="ui compact mini icon button"
            >
                <IconPencil />
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
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues}
                        submitButtonTitle="Update card"
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
