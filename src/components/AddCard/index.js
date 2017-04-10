import React, { PropTypes } from 'react'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from './form'


export default class Component extends React.Component {
    static propTypes = {
        addCard: PropTypes.func,
        nextNewId: PropTypes.number,
        latestLabel: PropTypes.string,
    }

    handleSubmit = (values) => {
        this.props.addCard(values)
        notification('Карточка добавлена')
    }

    render() {
        const trigger = <button className="ui compact primary button">Добавить слово</button>

        return (
            <Modal
                size="small"
                closeIcon
                trigger={trigger}
            >
                <Modal.Header>Добавить слово</Modal.Header>
                <Modal.Content>
                    <div key={this.props.nextNewId}>
                        <Form
                            form={'addCard' + this.props.nextNewId}
                            onSubmit={this.handleSubmit}
                            initialValues={{ label: this.props.latestLabel }}
                            submitButtonTitle="Добавить"
                        />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
