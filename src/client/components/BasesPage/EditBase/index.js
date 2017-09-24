import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from '../AddBase/form'

export default class Component extends React.Component {
    static propTypes = {
        trigger: PropTypes.node,
        initialValues: PropTypes.object,
        updateBase: PropTypes.func,
    }

    static defaultProps = {
        trigger: (
            <button className="ui green compact mini icon button">
                <i className="icon-pencil" />
            </button>
        ),
    }

    handleSubmit = values => {
        this.props.updateBase(values)
        notification('Base has been updated')
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
                <Modal.Header>Изменить слово</Modal.Header>
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
