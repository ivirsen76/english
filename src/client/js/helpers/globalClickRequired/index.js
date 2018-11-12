import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconPlay from '@ieremeev/icons/svg/play'
import _omit from 'lodash/omit'
import style from './style.module.css'

export default WrappedComponent => {
    const GlobalClickRequired = props => {
        if (!props.globalClickCaptured) {
            return (
                <div className={style.wrapper}>
                    <div id="globalPlayButton">
                        <IconPlay />
                        <div>Click anywhere to start</div>
                    </div>
                </div>
            )
        }

        return <WrappedComponent {..._omit(props, ['globalClickCaptured'])} />
    }

    GlobalClickRequired.propTypes = {
        globalClickCaptured: PropTypes.bool,
    }

    const mapStateToProps = state => ({
        globalClickCaptured: state.boilerplate.globalClickCaptured,
    })

    return connect(mapStateToProps)(GlobalClickRequired)
}
