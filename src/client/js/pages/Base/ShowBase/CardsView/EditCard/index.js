import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from 'js/pages/Cards/AddCard/form.js'

export default class Component extends React.Component {
    static propTypes = {
        trigger: PropTypes.node,
        initialValues: PropTypes.object,
        updateCard: PropTypes.func,
    }

    static defaultProps = {
        trigger: (
            <button className="ui green compact mini icon button">
                <i className="icon-pencil" />
            </button>
        ),
    }

    handleSubmit = values => {
        this.props.updateCard(values)
        notification('Card has been updated')
        this.modal.handleClose()
    }

    render() {
        return (
            <Modal
                size="small"
                closeIcon
                trigger={this.props.trigger}
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
