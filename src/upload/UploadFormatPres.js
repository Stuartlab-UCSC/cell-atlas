
// Show the upload file formats available and their details,
// the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import Typography from '@material-ui/core/Typography'

import GrowPanel from 'components/GrowPanel'
import MoreButton from 'components/MoreButton'

const detail = (item, classes, onMoreClick) => {

    // The expanded part of a GrowPanel.
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
                <MoreButton
                    onClick={onMoreClick}
                />
            </Typography>
        </div>
    return comp
}

const childPanel = (item, i, detailShow, growPanelClasses, classes,
    onSummaryClick, onMoreClick) => {
    
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
            detail={detail(item, classes, onMoreClick)}
            detailShow={detailShow}
            detailStyle={{marginLeft: '2rem'}}
            classes={growPanelClasses}
            onClick={onSummaryClick}
        />
    return comp
}

const UpdateFormatPres = ({ info, detailShow, classes, growPanelClasses,
    onSummaryClick, onMoreClick } ) => (
    <div className='LookAtMe' style={{ marginBottom: '1rem' }}>
        <GrowPanel
            id={info[0].id}
            summaryText={info[0].summaryText}
            detailShow={detailShow['main'] || false}
            classes={growPanelClasses}
            detailStyle={{marginLeft: '2rem'}}
            onClick={onSummaryClick}
            detail={
                info.map((item, i) =>
                    childPanel(item, i, detailShow[item.id], growPanelClasses,
                        classes, onSummaryClick, onMoreClick)
                )
            }
        >
        </GrowPanel>
    </div>
)

UpdateFormatPres.propTypes = {
    info: PropTypes.array.isRequired,
    detailShow: PropTypes.object.isRequired,
    growPanelClasses: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onSummaryClick: PropTypes.func.isRequired,
    onMoreClick: PropTypes.func.isRequired,
}

export default UpdateFormatPres;

