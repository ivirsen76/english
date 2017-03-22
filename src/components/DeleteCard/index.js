import React, { PropTypes } from 'react';


export default class Component extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        deleteCard: PropTypes.func,
    }

    onClick = () => {
        this.props.deleteCard(this.props.id);
    }

    render() {
        return (
            <button className="ui red compact tiny icon button" onClick={this.onClick}>
                <i className="icon-cross" />
            </button>
        );
    }
}
