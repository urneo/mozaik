import React, { Component, PropTypes } from 'react'


const colorMapping = {
    success: ['success', 'passed', 'good', 'ok'],
    warning: ['warning'],
    failure: ['error', 'failed', 'bad', 'ko'],
}

const getColorKey = status => {
    for (let c in colorMapping) {
        if (colorMapping[c].includes(status)) return c
    }

    return 'unknown'
}

const iconMapping = {
    'check-circle': ['success', 'passed', 'good', 'ok'],
    'warning':      ['warning', 'error', 'failed', 'bad', 'ko'],
}

const getIcon = status => {
    for (let i in iconMapping) {
        if (iconMapping[i].includes(status)) return i
    }

    return 'question'
}

export default class WidgetStatusBadge extends Component {
    static propTypes = {
        status:  PropTypes.string,
        message: PropTypes.node,
        meta:    PropTypes.node,
        style:   PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { status, message, meta, style } = this.props
        const { theme } = this.context

        const colorKey = getColorKey(status)
        const icon     = getIcon(status)

        const rootStyle = {
            display:        'flex',
            flexDirection:  'column',
            padding:        '3vmin',
            alignItems:     'center',
            justifyContent: 'space-between',
            height:         '100%',
            ...style,
        }

        const iconStyle = {
            fontSize:     '12vmin',
            color:        theme.colors[colorKey],
        }

        let messageNode = null
        if (message !== undefined) {
            messageNode = (
                <div>{message}</div>
            )
        }

        let metaNode = null
        if (meta !== undefined) {
            metaNode = (
                <div>{meta}</div>
            )
        }

        return (
            <div style={rootStyle}>
                <i className={`fa fa-${icon}`} style={iconStyle}/>
                {messageNode}
                {metaNode}
            </div>
        )
    }
}
