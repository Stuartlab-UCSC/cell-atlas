
// Show the upload file formats available and their details, logic and state.

import { connect } from 'react-redux'

import UploadFormatPres from 'upload/UploadFormatPres'

const info = [
    {
        id: 'main',
        summaryText: 'Formats: Files should contain tab delimited rows.',
    },
    {
        id: 'featureMatrix',
        summaryText: 'featureMatrix',
        detailText:`
The most basic of feature formats; a full matrix with sample IDs across
the top and feature IDs in the first column. All positions in the
matrix must be populated. This is the most basic of the layout feature formats
where similarities and XY locations will be calculated for you.`,
        detailExample:
`feature   sample_1  sample_2   sample_3 ...
TP53      0.6423    0.7654     0.2345
NAS1      0.2345    0.6423     0.7654
BRCA1     0.7654    0.2345     0.6423
 ...`,
    },
    {
        id: 'fullSimilarity',
        summaryText: 'fullSimilarity',
        detailText:`
This contains similarity scores between all sample pairs as a full matrix which
will be used to calculate xy positions. This has sample IDs across the top and
in the first column with similarity scores as the values.`,
        detailExample:
`samples     sample_1  sample_2  sample_3 ...
sample_1    0.7654    0.6423    0.9524
sample_2    0.9524    0.7654    0.6423
sample_3    0.6423    0.9524    0.7654
...`,
    },
    {
        id: 'sparseSimilarity',
        summaryText: 'sparseSimilarity',
        detailText:`
This contains similarity scores between the top neighbor samples of each sample
as a sparse matrix which will be used to calculate xy positions. This has sample
IDs in the first two columns with the the similarity scores in the third
column.`,
        detailExample:
`sample_1    sample_2    0.9524
sample_1    sample_3    0.76543
sample_2    sample_4    0.6423
...`,
    },
    {
        id: 'xyPositions',
        summaryText: 'xyPositions',
        detailText:`
This is the most processed of the layout feature formats, containing the x and y
coordinates in two-dimensional space of each sample, as the the example where
the header line is optional.`,
        detailExample:
`#ID         x       y
sample_1    73.6    63.6
sample_2    63.6    23.8
sample_3    23.8    73.6
...`,
    },
    {
        id: 'metadata',
        summaryText: 'metadata',
        detailText:`
Metadata are properties of samples used to color the map. The metadata file
must be in TSV (tab-separated values) format with the metadata IDs across the
top and sample IDs in the first column.`,
        detailExample:
`sample      age   disease stage ...
sample_1    81    BRCA    IV
sample_2    96    COAD    III
sample_3    52    GBM     II
...`,
    },
    {
        id: 'trajectory',
        summaryText: 'trajectory',
        detailText:`
A description of the trajectory format.`,
        detailExample:
`Example of the trajectory format.`
    },
]

const mapStateToProps = (state) => {
    return {
        info,
        defaultExpanded: state['upload.formatShow'],
        classes: { main: 'main' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpandClick: ev => {
            dispatch({
                type: 'upload.formatShow.toggle',
                id: ev.target.closest('.summary').dataset.id,
            })
        },
        onMoreClick: ev => {
            console.log('more on dataset-id', ev.target.closest('.details').dataset.id)
        },
    }
}

const UploadFormat = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadFormatPres)

export default UploadFormat
