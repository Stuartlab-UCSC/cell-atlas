
// Home page.

import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import datasets from 'home/images/datasets.svg'
import homeMain from 'home/images/homeMain.svg'
import trajSim from 'home/images/trajSim.svg'
import typePsych from 'home/images/typePsych.svg'
import molecularSim from 'home/images/molecularSim.svg'
import { About } from 'home/About'
//import logo from 'app/images/logo.svg'

const images = [
    {
        img: typePsych,
        key: 'typePsych',
        linkTo: '/analyze/typePsych',
        height: '165px',
        style: {
            top: '0px',
            left: '700px',
            height: '130px',
            position: 'absolute',
        },
    },
    {
        img: trajSim,
        key: 'trajSim',
        linkTo: '/analyze/trajSim',
        height: '130px',
        style: {
            top: '100px',
            left: '380px',
            height: '130px',
            position: 'absolute',
        },
    },
    {
        img: molecularSim,
        key: 'molecularSim',
        linkTo: '/analyze/molecularSim',
        height: '160px',
        style: {
            top: '200px',
            left: '650px',
            position: 'absolute',
        },
    },
]

const AnalysisButton = () => {
    const buttonStyle = {
        borderRadius: '20px',
        borderWidth: '20px',
        borderStyle: 'solid',
        borderColor: 'white',
        zIndex: 1,
    }
    const comp =
        <React.Fragment>
            {images.map(img => (
                <div style={img.style} key={img.key}>
                    <ButtonBase
                        focusRipple
                        style={buttonStyle}
                        component={Link}
                        to={img.linkTo}
                        key={img.key}
                    >
                        <img
                            src={img.img}
                            alt={img.key}
                            height={img.height}
                        />
                        <span />
                    </ButtonBase>
                </div>
            ))}
        </React.Fragment>

    return comp
}

const YourData = () => {
    const style = {
        position: 'absolute',
        top: '270px',
        left: '70px',
    }
    const comp =
        <Button
            variant='contained'
            component={Link}
            color='primary'
            to='/upload'
            style={style}
        >
            Your Data
        </Button>

    return comp
}

const Home = () => {
    
    const smallTitleStyle = {
        marginLeft: '205px',
    }
    const bigTitleStyle = {
        marginLeft: '200px',
    }
    const mainImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '400px',
    }

    return (
        <div className='pageBody'>
            <Typography variant='caption' style={smallTitleStyle}>
                the UC Santa Cruz, Genomics Institute, Stuart Lab
            </Typography>
            <Typography variant='display1' style={bigTitleStyle}>
                CELL ATLAS
            </Typography>
            <Typography variant='caption' style={smallTitleStyle}>
                browser is...
            </Typography>
            <div style={{ position: 'relative' }}>
                <img
                    src={datasets}
                    alt='datasets'
                    style={mainImageStyle}
                />
                {AnalysisButton()}
                <YourData />
            </div>
            <About />
        </div>
    )
}

export default Home
