import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from './form'

export default class Component extends React.Component {
    static propTypes = {
        addBase: PropTypes.func,
    }

    handleSubmit = async values => {
        await this.props.addBase(values)
        notification('Base has been added')
        this.modal.handleClose()
    }

    render() {
        const trigger = (
            <button id="addBaseButton" className="ui compact primary button">
                Add base
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
                <Modal.Header>Add base</Modal.Header>
                <Modal.Content>
                    <div>
                        <Form form="addBase" onSubmit={this.handleSubmit} submitButtonTitle="Add" />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
