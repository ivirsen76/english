import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import style from '../style.module.css'

const source = {
    beginDrag(props, monitor, component) {
        return {
            element: props.element,
        }
    },
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
    }
}

class Element extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        element: PropTypes.object,
        onClick: PropTypes.func,
    }

    onClick = () => {
        this.props.onClick(this.props.element)
    }

    getCamelCaseType = () => {
        const { type } = this.props.element
        return type.charAt(0).toUpperCase() + type.slice(1)
    }

    render() {
        const { element, connectDragSource, connectDragPreview } = this.props

        return connectDragSource(
            <div
                id={`element${this.getCamelCaseType()}`}
                className={style.item}
                onClick={this.onClick}
            >
                {connectDragPreview(<span />)}
                {element.title}
            </div>
        )
    }
}

export default DragSource('BUILDER', source, collect)(Element)
