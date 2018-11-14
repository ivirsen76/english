import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from 'client/js/pages/Cards/AddCard/form.js'
import IconPencil from '@ieremeev/icons/pencil'
import playCard from 'client/js/helpers/playCard.js'

export default class Component extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        initialValues: PropTypes.object,
        updateCard: PropTypes.func,
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
        const trigger = (
            <button
                className="ui green compact mini icon button"
                id={`updateCardButton${this.props.id}`}
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
                        form="editCard"
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues}
                        submitButtonTitle="Update card"
                        hideLabel
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
