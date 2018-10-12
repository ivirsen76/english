import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        children: PropTypes.string,
    }

    render() {
        return <div dangerouslySetInnerHTML={{ __html: this.props.children }} />
    }
}
