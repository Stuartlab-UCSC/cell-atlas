
// Cell Type Worksheet page data stub.

// Data server response.
const testData = {resource: {
    dataset_name: 'dataset 1',
    cluster_solution_name: 'solution 1',
    size_by: 'sensitivity',
    color_by: 'z_stat',
    clusters:
        'column	cluster	cell_count	bar_color	cell_type\n' +
        '0	2	2643	1\n' +
        '1	1	3322	1\n' +
        '2	3	13962	2	Ventricular CMs',
    genes:
        'row	gene\n' +
        '1	ALK\n' +
        '2	TP53\n' +
        '0	TNF',
    colors:
        'gene	0	1	2\n' +
        'ALK	.1	.2	.3\n' +
        'TP53	.4	.5	.6\n' +
        'TNF	.7	.8	.9',
    sizes:
        'gene	0	1	2\n' +
        'ALK	.11	.12	.13\n' +
        'TP53	.14	.15	.16\n' +
        'TNF	.17	.18	.19',
}}

export default testData
