import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from '../AddCard/form'

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
        notification('Карточка обновлена')
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
                        form="editCard"
                        onSubmit={this.handleSubmit}
                        initialValues={this.props.initialValues}
                        submitButtonTitle="Изменить"
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
