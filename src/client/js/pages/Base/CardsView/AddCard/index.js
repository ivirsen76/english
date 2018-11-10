import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from 'client/js/pages/Cards/AddCard/form.js'
import WordHelper from '../WordHelper'

export default class Component extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        addCard: PropTypes.func,
    }

    state = {
        count: 1,
    }

    handleSubmit = async values => {
        try {
            await this.props.addCard(values)
            notification('Card has been added')
            this.setState({ count: this.state.count + 1 })
        } catch (errors) {
            throw errors
        }
    }

    addWord = word => {
        const input = document.getElementById('inputText')
        if (!input) {
            console.error('There is no input with id="inputText"')
            return
        }

        // This is a hack method to change React input value directly
        const lastValue = input.value
        input.value += word
        const event = new Event('input', { bubbles: true })
        event.simulated = true
        const tracker = input._valueTracker
        if (tracker) {
            tracker.setValue(lastValue)
        }
        input.dispatchEvent(event)

        input.focus()
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
                    <div style={{ marginBottom: '1em' }}>
                        <WordHelper base={this.props.base} onClick={this.addWord} />
                    </div>
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
