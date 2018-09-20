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
        title: PropTypes.string,
    }

    render() {
        const { title, connectDragSource } = this.props

        return connectDragSource(<div className={style.item}>{title}</div>)
    }
}

export default DragSource('BUILDER', source, collect)(Element)
