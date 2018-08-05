import React from 'react'
import PropTypes from 'prop-types'
import diff from 'client/js/utils/diff.js'
import style from './style.module.scss'

export default class DiffResult extends React.Component {
    static propTypes = {
        str1: PropTypes.string,
        str2: PropTypes.string,
        diffStyle: PropTypes.string,
    }

    static defaultProps = {
        diffStyle: 'removed',
    }

    getDiff = () => {
        const { str1, str2 } = this.props

        return diff(str1, str2).map((item, index) => {
            if (item.added) {
                return (
                    <span key={index} className={style[this.props.diffStyle]}>
                        {item.text}
                    </span>
                )
            }

            return item.text
        })
    }

    render() {
        return <div>{this.getDiff()}</div>
    }
}
