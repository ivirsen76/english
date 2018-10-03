import React from 'react'
import style from './style.module.css'

export default class Component extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.logo} />
                <div />
            </div>
        )
    }
}
