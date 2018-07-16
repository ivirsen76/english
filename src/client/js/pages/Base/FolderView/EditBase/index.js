import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from '../AddBase/form'

export default class Component extends React.Component {
    static propTypes = {
        baseId: PropTypes.number,
        initialValues: PropTypes.object,
        updateBase: PropTypes.func,
    }

    handleSubmit = values => {
        this.props.updateBase(values)
        notification('Base has been updated')
        this.modal.handleClose()
    }

    render() {
        const trigger = (
            <button
                id={`updateBaseButton${this.props.baseId}`}
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
                        form="editBase"
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues}
                        submitButtonTitle="Update"
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
