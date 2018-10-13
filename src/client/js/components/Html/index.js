import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        convertLineBreaks: PropTypes.bool,
        children: PropTypes.string,
    }

    render() {
        const html = this.props.convertLineBreaks
            ? this.props.children.replace('\n', '<br>')
            : this.props.children

        return <div dangerouslySetInnerHTML={{ __html: html }} />
    }
}
