
// Home page.

import React from 'react';
import pancan12Png from 'home/images/pancan12.png'
import homeSvg from 'home/images/cell_atlas_graphic.svg'
import purpleCell from 'home/images/purpleCell.svg'

import About from 'home/About'

class WhatIs extends React.Component {

    // The 'What Is' widget.
    render() {
        return (
            <div
                className='home_section'
            >
                <h3>
                    What is the cell atlas?
                </h3>
                <p>
                    Cell Atlas is an interactive browser that allows biologists, who may not
                    have computational expertise, to richly explore the results of
                    high-throughput genomics experiments on thousands of cell samples.
                </p>
            </div>
        )
    }
}

const CreateMap = () => {
    
    // A placeholder for the create map widget.
    const create = null
    return create
}

// main page of CellAtlas
class Home extends React.Component {
    render() {
        return (
            <div id='homePage' className='pageBody'>
                <div
                    style={{
                        position: 'relative'
                    }}
                >
                    <WhatIs />
                        { CreateMap() }
                    <img
                        src={homeSvg}
                        height='200px'
                        alt='flow'
                    />
                    <img
                        src={pancan12Png}
                        height='80px'
                        style={{position: 'absolute', left: '515px', top: '170px'}}
                        alt='map'
                    />
                    <img
                        src={purpleCell}
                        height='300px'
                        style={{position: 'absolute', left: '125px', top: '20px'}}
                        alt='purpleCell'
                    />
                </div>
                <About />
            </div>
        )
    }
}

export default Home
