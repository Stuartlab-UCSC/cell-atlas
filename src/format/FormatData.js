
// The information for each of the file formats.

export const data = {
    cellXbranch: {
        summary: 'cellXbranch',
        detailText:`
CellXbranch is a full matrix of tab-separated values with sample IDs in 
the first column and branches in the remaining columns. more TBD.`,
        detailExample:
            `sample      branch1   branch2 ...
sample_1    0.56    NA
sample_2    NA    0.64
sample_3    NA    0.23
...`,
    },
    clusters: {
        summary: 'clusters',
        detailText:`
Clusters is a full matrix of tab-separated values with sample IDs in 
the first column and branches in the remaining columns. more TBD.`,
        detailExample:
            `TBD      branch1   branch2 ...
sample_1    0.56    NA
sample_2    NA    0.64
sample_3    NA    0.23
...`,
    },
    format: {
        summary: 'Formats: Files should contain tab delimited rows.',
    },
    featureMatrix: {
        summary: 'featureMatrix',
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
    fullSimilarity: {
        summary: 'fullSimilarity',
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
    geneMatrix: {
        summary: 'geneMatrix',
        detailText:`
A geneMatrix is a full matrix of tab-separated values containint sample IDs 
across the top and gene IDs in the first column. All positions in the
matrix must be populated.`,
        detailExample:
            `gene      sample_1  sample_2   sample_3 ...
TP53      0.6423    0.7654     0.2345
NAS1      0.2345    0.6423     0.7654
BRCA1     0.7654    0.2345     0.6423
 ...`,
    },
    geneMatrixTransposed: {
        summary: 'geneMatrixTransposed',
        detailText:`
geneMatrixTransposed is a matrix of tab-separated values containing genes in the
 first row and samples in the first column where TBD`,
        detailExample:
            `TBD      age   disease stage ...
sample_1    81    BRCA    IV
sample_2    96    COAD    III
sample_3    52    GBM     II
...`,
    },
    metadata: {
        summary: 'metadata',
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
    sparseSimilarity: {
        summary: 'sparseSimilarity',
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
    xyPositions: {
        summary: 'xyPositions',
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
    trajectory: {
        summary: 'trajectory',
        detailText:`
A description of the trajectory format.`,
        detailExample:
`Example of the trajectory format.`
    },
}
