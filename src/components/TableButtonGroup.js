
// A table button group.

import PropTypes from 'prop-types'
import React from 'react'

import SmallButton from 'components/SmallButton'

const TableButtonGroup = ({group}) => {

    // Make a group of buttons for a table where group is an array of objects
    // with contents as {
    //      action: 'delete',
    //      href: 'http://somewhere.com',
    //      onClick: onClick
    // } where href and onClick are mutually exclusive.
    let comp =
        <div
            style={{
                width: '100%',
                marginTop: '-0.5rem',
            }}
        >
            {
                group.map((info, i) =>
                    <SmallButton
                        key = {i}
                        action={info.action}
                        id = {info.id}
                        href={info.href}
                        linkTo={info.linkTo}
                        variant='flat'
                        onClick={info.onClick}
                    />
                )
            }
        </div>
    return comp
}

TableButtonGroup.propTypes = {
    group: PropTypes.object.isRequired,
}

export default TableButtonGroup
