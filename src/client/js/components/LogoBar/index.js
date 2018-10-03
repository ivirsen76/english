/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'

export default class Component extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <Link to="/" className={style.logo} />
                <div />
            </div>
        )
    }
}
