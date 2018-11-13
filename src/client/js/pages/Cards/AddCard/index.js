import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import notification from '@ieremeev/notification'
import Form from './form'
import { play } from 'client/js/utils/mp3.js'
import { getMediaUrl } from 'client/js/utils/media.js'

export default class Component extends React.Component {
    static propTypes = {
        addCard: PropTypes.func,
        nextNewId: PropTypes.number,
        latestLabel: PropTypes.string,
    }

    handleSubmit = async values => {
        let card
        try {
            card = await this.props.addCard(values)
            notification('Card has been added')
        } catch (errors) {
            throw errors
        }

        if (card) {
            await play(getMediaUrl(card.usSoundFile))
            await new Promise(resolve => setTimeout(resolve, 500))
            await play(getMediaUrl(card.ruSoundFile))
        }
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
                    <Form
                        key={this.props.nextNewId}
                        onSubmit={this.handleSubmit}
                        initialValues={{ label: this.props.latestLabel }}
                        submitButtonTitle="Добавить слово"
                    />
                </Modal.Content>
            </Modal>
        )
    }
}
