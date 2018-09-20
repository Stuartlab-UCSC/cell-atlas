
// Home page.

import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import cirm from 'home/images/cirm.svg'
import czi from 'home/images/czi.svg'
import datasets from 'home/images/datasets1.svg'
import trajSim from 'home/images/trajSim.svg'
import typePsych from 'home/images/typePsych.svg'
import molecularSim from 'home/images/molecularSim.svg'
import { About } from 'home/About'

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
            left: '350px',
            height: '130px',
            position: 'absolute',
        },
    },
    {
        img: molecularSim,
        key: 'molecularSim',
        linkTo: '/analyze/molecularSim',
        height: '200px',
        style: {
            top: '200px',
            left: '650px',
            position: 'absolute',
        },
    },
]

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

const AnalysisButton = () => {
    const buttonStyle = {
        borderRadius: '20px',
        borderWidth: '20px',
        borderStyle: 'solid',
        borderColor: 'white',
        zIndex: 1,
    }
    /*
    const focusVisibleStyle = {
        borderColor: 'grey',
        zIndex: 2,
    }
    */
    const comp =
        <React.Fragment>
            {images.map(img => (
                <div style={img.style} key={img.key}>
                    <ButtonBase
                        focusRipple
                        focusVisibleClassName='focusVisible'
                        style={buttonStyle}
                        component={Link}
                        to={img.linkTo}
                        key={img.key}
                    >
                        <span className='imageSrc'>
                            <img
                                src={img.img}
                                alt={img.key}
                                height={img.height}
                            />
                        </span>
                        <span className='imageBackdrop' />
                        <span className='imageButton'>
                        </span>
                    </ButtonBase>
                </div>
            ))}
        </React.Fragment>

    return comp
}

/*
    // for analysis tool buttons
    // https://material-ui.com/demos/buttons/
    <div className={classes.root}>
      {images.map(image => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
*/

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
        top: 55, // datasets1: 55
        left: 50,  // datasets1: 50
        height: 300,  // datasets1: 300
    }

    return (
        <div className='pageBody'>
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
                {AnalysisButton()}
                <YourData />
            <CirmButton />
            <CziButton />
            </div>
            <About />
        </div>
    )
}

export default Home
