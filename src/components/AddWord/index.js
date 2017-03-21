import React, { PropTypes } from 'react';
import { Modal } from 'semantic-ui-react';
import Form from './form';


export default class Component extends React.Component {
    static propTypes = {
        addWord: PropTypes.func,
        nextNewId: PropTypes.number,
        latestLabel: PropTypes.string,
    }

    handleSubmit = (values) => {
        this.props.addWord(values);
    }

    render() {
        const trigger = <button className="ui primary button">Добавить слово</button>;

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
                            form={'addWord' + this.props.nextNewId}
                            onSubmit={this.handleSubmit}
                            initialValues={{ label: this.props.latestLabel }}
                        />
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}
