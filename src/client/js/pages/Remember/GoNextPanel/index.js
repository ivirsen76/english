import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.scss'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    componentDidMount() {
        this.updateHeight()

        window.onresize = () => {
            this.updateHeight()
        }
    }

    updateHeight = () => {
        // let windowHeight = $(window).height()
        // let { top } = this.refs.panel.getBoundingClientRect()
        // $(this.refs.panel).height(Math.max(windowHeight - top - 20, 0))
    }

    render() {
        return <div className={style.panel} onClick={this.props.onClick} />
    }
}
