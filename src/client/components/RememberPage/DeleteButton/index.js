import React from 'react'
import ClickButton from '@ieremeev/button'

export default class Component extends React.Component {
    render() {
        return (
            <ClickButton
                className="ui tiny red icon button"
                title={<i className="icon-cross" />}
                isConfirm
            />
        )
    }
}
