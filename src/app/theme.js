
// Theme and default theme overrides.

import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';

const themeData = createMuiTheme({

    // Values of the material-ui default theme are in comments.
    palette: {
        primary: indigo,
        secondary: {
            main: '#03a9f4',
        },
    },
    typography: {
       fontFamily: [
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            'Arial',
        ].join(','), //""Roboto", "Helvetica", "Arial", sans-serif"
        fontSize: '16', // 14
    },
    overrides: {
        MuiGrid: {
            item: {
                marginBottom: '0.5rem',
                marginLeft: '1rem',
                marginRight: '1rem',
                marginTop: '0.5rem',
            },
        },
        MuiInput: {
            input: {
                fontSize: '1rem',
            },
        },

        MuiListItem: {
            root: {
                paddingTop: '0.3rem',
                paddingBottom: '0.3rem',
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: '1rem',
                lineHeight: '1rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
            },
        },
        MuiTableRow: {
            root: {
                height: '2rem', // 56px
            },
            head: {
                height: '2rem', // 48px
            },
        },
        MuiTableCell: {
            root: {
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
            },
        },
        MuiButton: {
            sizeSmall: {
                fontSize: '0.8rem',
            },
        },
    },
});

export default themeData
