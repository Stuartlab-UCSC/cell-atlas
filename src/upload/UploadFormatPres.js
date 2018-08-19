
// Show the upload file formats available and their details,
// the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import GrowPanel from 'components/GrowPanel'

const styles = theme => ({
    main: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const detail = (item) => {

    // The expanded part of a GrowPanel.
    // Note on Themes:
    // We don't use the usual "styles = theme" method because this component is
    // rendered under the GrowPanel component and somehow that method's styles
    // are not picked up here.
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
                {item.detailText + '  '}
                <a href='#' alt='more'>More...</a>
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

const UpdateFormatPres = ({ info, detailShow, classes, fwdClasses,
    onClick } ) => (
    <div className={classes.main}>
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
    </div>
)

UpdateFormatPres.propTypes = {
    info: PropTypes.array.isRequired,
    detailShow: PropTypes.object.isRequired,
    fwdClasses: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(UpdateFormatPres);

