
import React from 'react'
import Typography from '@material-ui/core/Typography'

const TrajSimPres = ({ onAnalyzeClick }) => {
    
        return (
            <div className='pageBody'>
                <Typography
                    variant='title'
                    style={{ marginBottom: '1rem' }}
                >
                    Analyze: Trajectory Similarity
                </Typography>
            </div>
        )
}

export default TrajSimPres
