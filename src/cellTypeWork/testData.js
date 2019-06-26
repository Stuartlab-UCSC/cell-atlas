
// Cell Type Worksheet page data stub.

// Data server response.
const testData = {
    dataset_name: 'dataset 1',
    cluster_solution_name: 'solution 1',
    size_by: 'sensitivity',
    color_by: 'z_stat',
    clusters:
        'column	cluster	cell_count	bar_color	cell_type\n' +
        '0	2	2643	1	Arterial CMs\n' +
        '1	1	3322	1\n' +
        '2	3	13962	2	Vascular Endothelial',
    genes:
        'row	gene\n' +
        '1	ALK\n' +
        '2	TP53\n' +
        '0	TNF',
    colors:
        'gene	3	1	2\n' +
        'ALK	-0.4	-0.3	-0.2\n' +
       'TP53	-0.1	0	0.4\n' +
        'TNF	0.3	0.2	0.1',
    sizes:
        'gene	3	1	2\n' +
        'ALK	0.1	0.2	0.3\n' +
        'TP53	0.4	0.5	0.6\n' +
        'TNF	0.7	0.8	0.9',
}

export default testData
