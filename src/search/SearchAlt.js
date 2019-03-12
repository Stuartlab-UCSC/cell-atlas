
import React from 'react'
import Grid from '@material-ui/core/Grid';
import MockUp from 'components/MockUp'
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from '@material-ui/icons/Search';
import SearchReactSelect from "search/SearchReactSelect";
import { themeData } from 'app/themeData'
import drawDemo from 'draw/images/demo.png'
import SmallButton from 'components/SmallButton'
//import SearchIcon from "@material-ui/core/SvgIcon/SvgIcon";

const geneList = [
    { label: 'ALK2' },
    { label: 'BRCA2' },
    { label: 'TP53' },
]
const geneModuleList = [
    { label: 'gene module containing ALK2' },
    { label: 'gene module containing BRCA2' },
    { label: 'gene module containing TP53' },
]
const cellTypeList = [
    { label: 'cell type 1' },
    { label: 'cell type 2' },
    { label: 'cell type 3' },
]

const Search = () => {
    const searchIconStyle = { marginTop: 10, float: 'right' }
    const expressionStr = ' Expression pattern'
    return (
        <React.Fragment>
        <Grid container spacing={16} >
            <MockUp />
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Search A
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <SearchIcon
                    style={searchIconStyle}
                />
            </Grid>
            <Grid item xs={11}>
                <SearchReactSelect
                    placeholder='gene'
                    list={geneList}
                    classes={{}}
                    theme={themeData}
                />
            </Grid>
            <Grid item xs={1}>
                <SearchIcon
                    style={searchIconStyle}
                />
            </Grid>
            <Grid item xs={11}>
                <SearchReactSelect
                    placeholder='gene module'
                    list={geneModuleList}
                    classes={{}}
                    theme={themeData}
                />
            </Grid>
            <Grid item xs={1}>
                <SearchIcon style={searchIconStyle} />
            </Grid>
            <Grid item xs={11}>
                <SearchReactSelect
                    placeholder='cell type'
                    list={cellTypeList}
                    classes={{}}
                    theme={themeData}
                />
            </Grid>
            <Grid item xs={1}>
                <SearchIcon style={{float: 'right'}} />
            </Grid>
            <Grid item xs={11}>
                <Typography>
                    {expressionStr}
                </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2} >
                <SmallButton
                    label='Upload a file'
                    action='upload'
                />
            </Grid>
            <Grid item xs={2}>
                <Typography>
                    or draw a pattern
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <img
                    src={drawDemo}
                    alt='drawDemo'
                    height={300}
                />
            </Grid>
        </Grid>
    </React.Fragment>
    )
}

export default Search
