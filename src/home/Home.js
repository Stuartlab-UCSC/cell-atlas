
// Home page.

import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import czi from 'home/images/czi.png'
import datasets from 'home/images/datasets2.png'
import brackets from 'home/images/brackets.png'
import { About } from 'home/About'
import HomeAnalyze from 'home/HomeAnalyze'
const CziButton = () => {
    const imgStyle = {
        height: '34px',
        margin: '-15px',
    }
    const buttonStyle = {
        position: 'absolute',
        top: '160px',
        left: '130px',
        backgroundColor: 'white',
    }
    const comp =
        <Button
            variant="extendedFab"
            aria-label="CZI"
            className='button'
            href='https://www.chanzuckerberg.com'
            target='_blank'
            style={buttonStyle}
        >
            <img
                src={czi}
                alt='CZI'
                style={imgStyle}
            />
        </Button>
 
    return comp
}
const YourData = () => {
    const style = {
        position: 'absolute',
        top: '240px',
        left: '90px',
    }
    const comp =
        <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/upload'
            size='small'
            style={style}
        >
            Your Data
        </Button>

    return comp
}

const Home = () => {
    const bigTitleLeft = 285 // datasets1: 285
    const bigTitleStyle = {
        marginLeft: bigTitleLeft,
    }
    const smallTitleStyle = {
       marginLeft: bigTitleLeft + 5,
    }
    const topTitleStyle = {
        ...smallTitleStyle,
    }
    const bottomTitleStyle = {
        ...smallTitleStyle,
        marginTop: -5
    }
    const datasetsStyle = {
        position: 'absolute',
        top: 135,
        left: 73,
        height: 115,
    }
    const bracketsStyle = {
        position: 'absolute',
        top: 60,
        left: 200,
        height: 300,
    }
    const pageBodyStyle = {
        paddingLeft: '4rem',
        paddingRight: '4rem',
        paddingBottom: '4rem',
    }

    return (
        <div id='homePage' className='pageBody' style={pageBodyStyle}>
            <Typography variant='caption' style={topTitleStyle}>
                the UC Santa Cruz, Genomics Institute, Stuart Lab
            </Typography>
            <Typography variant='display1' style={bigTitleStyle}>
                CELL ATLAS
            </Typography>
            <Typography variant='caption' style={bottomTitleStyle}>
                browser is...
            </Typography>
            <div style={{ position: 'relative' }}>
                <img
                    src={datasets}
                    alt='datasets'
                    style={datasetsStyle}
                />
                <img
                    src={brackets}
                    alt='brackets'
                    style={bracketsStyle}
                />
                <HomeAnalyze />
                <YourData />
            <CziButton />
            </div>
            <About />
        </div>
    )
}

export default Home
