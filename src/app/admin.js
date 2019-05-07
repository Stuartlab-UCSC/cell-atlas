
// Admin page.

import React from 'react'
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'


const linkItem = (text, to) => {
    return (
        <MenuItem
            component={Link}
            to={to}
        >
            {text}
        </MenuItem>
    )
}

const Page = () => {
    return (
        <div>
            <Typography variant='h6' >
                Admin
            </Typography>
            <MenuList style={{width: '20rem'}}>
                {linkItem('Add users to role', 'addUsersToRole')}
            </MenuList>
        </div>
    )
}

export default Page
