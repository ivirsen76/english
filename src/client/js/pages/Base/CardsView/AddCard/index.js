import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from 'client/js/pages/Cards/AddCard/form.js'

export default class Component extends React.Component {
    static propTypes = {
        addCard: PropTypes.func,
    }

    state = {
        count: 1,
    }

    handleSubmit = values => {
        this.props.addCard(values)
        notification('Card has been added')
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        const trigger = (
            <button id="addCardButton" className="ui compact primary button">
                Добавить слово
            </button>
        )

        return (
            <Modal size="small" closeIcon trigger={trigger}>
                <Modal.Header>Добавить слово</Modal.Header>
                <Modal.Content>
                    <div key={this.state.count}>
                        <Form
                            form={'addCardForBase' + this.state.count}
                            onSubmit={this.handleSubmit}
                            submitButtonTitle="Добавить слово"
                            hideLabel
                        />
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}
