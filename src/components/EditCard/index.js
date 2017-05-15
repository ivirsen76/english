import React, { PropTypes } from 'react'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from 'components/AddCard/form'


export default class Component extends React.Component {
    static propTypes = {
        initialValues: PropTypes.object,
        updateCard: PropTypes.func,
    }

    handleSubmit = values => {
        this.props.updateCard(values)
        notification('Карточка обновлена')
        this.modal.handleClose()
    }

    render() {
        const trigger = (
            <button className="ui green compact tiny icon button">
                <i className="icon-pencil" />
            </button>
        )

        return (
            <Modal
                size="small"
                closeIcon
                trigger={trigger}
                ref={modal => { this.modal = modal }}
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
