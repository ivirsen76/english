import React, { PropTypes } from 'react';
import _pick from 'lodash/pick';


export default class Component extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        label: PropTypes.node,
    }

    render() {
        const { input, label, meta: { touched, error } } = this.props;
        const props = _pick(this.props, ['autoFocus', 'type']);

        return (
            <div className={'field ' + (touched && error && 'error')}>
                <label htmlFor={input.name}>{label}</label>
                <input {...input} {...props} />
                {touched && error && (
                    <div className="ui pointing red basic label">{error}</div>
                )}
            </div>
        );
    }
}
