
// Home page.

import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import cirm from 'home/images/cirm.svg'
import czi from 'home/images/czi.svg'
import datasets from 'home/images/datasets1.svg'
import { About } from 'home/About'
import HomeAnalyze from 'home/HomeAnalyze'

const CirmButton = () => {
    const imgStyle = {
        height: '34px',
        margin: '-15px',
    }
    const buttonStyle = {
        position: 'absolute',
        top: '140px',
        left: '56px',
        backgroundColor: 'white',
    }
    const comp =
        <Button
            variant="extendedFab"
            aria-label="CIRM"
            className='button'
            href='http://cirm.ucsc.edu'
            target='_blank'
            style={buttonStyle}
        >
            <img
                src={cirm}
                alt='CIRM'
                style={imgStyle}
            />
        </Button>
 
    return comp
}

const CziButton = () => {
    const imgStyle = {
        height: '34px',
        margin: '-15px',
    }
    const buttonStyle = {
        position: 'absolute',
        top: '160px',
        left: '120px',
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
        top: '230px',
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
    const mainImageStyle = {
        position: 'absolute',
        top: 53, // datasets1: 53
        left: 50,  // datasets1: 50
        height: 300,  // datasets1: 300
    }
    const pageBodyStyle = {
        paddingLeft: '4rem',
        paddingRight: '4rem',
        paddingBottom: '4rem',
    }

    return (
        <div className='pageBody' style={pageBodyStyle}>
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
                    style={mainImageStyle}
                />
                <HomeAnalyze />
                <YourData />
            <CirmButton />
            <CziButton />
            </div>
            <About />
        </div>
    )
}

export default Home
