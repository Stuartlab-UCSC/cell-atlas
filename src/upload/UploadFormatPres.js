
import PropTypes from 'prop-types'
import React from 'react'

import Typography from '@material-ui/core/Typography';

import GrowPanel from 'components/GrowPanel'

const detail = (item) => {

    // The expanded part of a GrowPanel.
    // Note we don't use the usual styles = theme method here because the styles
    // are not picked up here because this component is actually rendered
    // under the generalized GrowPanel.
    let comp =
        <div>
            <pre
                style={{
                    display: 'inline-Block',
                    verticalAlign: 'top',
                    margin: 0,
                }}
            >
                <code style={{ width: '500px' }}>
                    {item.detailExample}
                </code>
            </pre>
            <Typography
                style={{
                    display: 'inline-Block',
                    width: '500px',
                    marginLeft: '40px',
                    verticalAlign: 'top',
                }}
            >
                {item.detailText}
            </Typography>
        </div>
    return comp
}

const childPanel = (item, i, detailShow, fwdClasses, onClick) => {
    
    // Skip the info for the main panel.
    if (item.id === 'main') {
        return null
    }
    detailShow = detailShow || false
    let comp =
        <GrowPanel
            key={i}
            id={item.id}
            summaryText={item.summaryText}
            detail={detail(item)}
            detailShow={detailShow}
            classes={fwdClasses}
            onClick={onClick}
        />
    return comp
}

const UpdateFormatPres = ({ info, detailShow, fwdClasses, onClick } ) => (
    
    <GrowPanel
        id={info[0].id}
        summaryText={info[0].summaryText}
        detailShow={detailShow['main'] || false}
        classes={fwdClasses}
        onClick={onClick}
        detail={
            info.map((item, i) =>
                childPanel(item, i, detailShow[item.id], fwdClasses,
                    onClick)
            )
        }
    >
    </GrowPanel>
)

UpdateFormatPres.propTypes = {
    info: PropTypes.array.isRequired,
    detailShow: PropTypes.object.isRequired,
    fwdClasses: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default UpdateFormatPres
