
// Theme and default theme overrides.

export const chipBackgrounds = {
    Success: 'rgba(0,255,0,0.3)',  // green
    Error: 'rgba(255,0,0,0.3)',    // pink
    Canceled: 'rgba(255,255,0,0.3)', // yellow
}

export let background
export let altBackground
export let altForeground
export const primaryColor = '#03a9f4'
export const fontFamily = [
    "Myriad Set Pro",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "Verdana",
    "sans-serif"
    /*'Open Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',*/
].join(',') // "Roboto", "Helvetica", "Arial", "sans-serif"

const buttonTextColor = '#000'

// Values of the material-ui default theme are in comments.
export const themeData = themeType => {
    if (themeType === 'light') {
        background = '#ffffff'
        altBackground = '#dddddd'
        altForeground = '#222222'
    } else {
        background = '#000000'
        altBackground = '#333333'
        altForeground = '#dddddd'
    }
    let data = {
        palette: {
            type: themeType,
            background: {
                default: background,
            },
            primary: {
                main: primaryColor,
                contrastText: buttonTextColor
            },
            secondary: {
                main: primaryColor,
                contrastText: buttonTextColor,
            },
        },
        typography: {
            useNextVariants: true,
            fontFamily: fontFamily,
            fontSize: '14', // 14
        },
        overrides: {
            MuiPaper: {
                root: {
                    // Transparent allows change of background in one place.
                    backgroundColor: 'transparent',
                },
            },
            MuiExpansionPanelSummary: {
                content: {
                    marginBottom: '-0.2rem',
                    marginTop: '0rem',
                },
            },
            MuiExpansionPanelDetails: {
                root: {
                    paddingBottom: '0.3rem',
                    paddingTop: '0.1rem',
                },
            },
            // We don't want transparent dialogs.
            MuiDialog: {
                paper: {
                    background: background,
                    minWidth: '20rem',
                }
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
            MuiPopover: {
                paper: {
                    background,
                },
            },
            MuiTableRow: {
                root: {
                    height: '3rem', // 56px
                    verticalAlign: 'top',
                },
                head: {
                    height: '2rem', // 48px
                },
            },
            MuiTableCell: {
                root: {
                    paddingTop: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    paddingBottom: '0px',
                },
                head: {
                    paddingBottom: '1rem',
                },
            },
            MuiButton: {
                sizeSmall: {
                    fontSize: '0.8rem',
                },
            },
        },
    }
    return data
}

