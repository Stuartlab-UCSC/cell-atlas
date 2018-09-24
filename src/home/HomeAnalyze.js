
// Home page analyze buttons.

import React from 'react';
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import trajSim from 'home/images/trajSim.svg'
import typePsych from 'home/images/typePsych.svg'
import moleSim from 'home/images/moleSim2.svg'

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
            zIndex: 1,
        },
        label: 'Cell Type Psychic',
        labelStyle: {
            top: '160px',
            left: '0px',
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
            left: '330px',
            height: '130px',
            position: 'absolute',
        },
        label: 'Trajectory Similarity',
        labelStyle: {
            top: '125px',
            left: '90px',
            position: 'absolute',
        },
    },
    {
        img: moleSim,
        key: 'moleSim',
        linkTo: '/analyze/moleSim',
        height: '200px',
        style: {
            top: '205px',
            left: '650px',
            position: 'absolute',
            zIndex: 1,
        },
        label: 'Molecular Similarity',
        labelStyle: {
            top: '205px',
            left: '35px',
            position: 'absolute',
        },
    },
]

const HomeAnalyze = () => {
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
                        <div className='imageSrc' >
                            <img
                                src={img.img}
                                alt={img.key}
                                height={img.height}
                            />
                            <Typography
                                component='div'
                                variant='subheading'
                                className='imageTitle'
                                style={img.labelStyle}
                            >
                                {img.label}
                            </Typography>
                        </div>
                    </ButtonBase>
                </div>
            ))}
        </React.Fragment>

    return comp
}
/*
                        <span className='imageBackdrop' />
                            <Typography
                                component="span"
                                variant="subheading"
                                color="inherit"
                                className={classes.imageTitle}
                            >

*/
/*
    // example for analysis tool buttons from:
    //      https://material-ui.com/demos/buttons/
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


export default HomeAnalyze
