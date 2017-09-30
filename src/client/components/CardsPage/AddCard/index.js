import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from './form'

export default class Component extends React.Component {
    static propTypes = {
        addCard: PropTypes.func,
        nextNewId: PropTypes.number,
        latestLabel: PropTypes.string,
    }

    handleSubmit = values => {
        this.props.addCard(values)
        notification('Card has been added')
    }

    render() {
        const trigger = <button className="ui compact primary button">Add card</button>

        return (
            <Modal size="small" closeIcon trigger={trigger}>
                <Modal.Header>Add card</Modal.Header>
                <Modal.Content>
                    <div key={this.props.nextNewId}>
                        <Form
                            form={'addCard' + this.props.nextNewId}
                            onSubmit={this.handleSubmit}
                            initialValues={{ label: this.props.latestLabel }}
                            submitButtonTitle="Add card"
                        />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
