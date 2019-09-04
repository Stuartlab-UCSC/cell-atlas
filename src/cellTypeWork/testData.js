
// Cell Type Worksheet page data stub.

// Data server response.
const testData = {
    dataset_name: 'dataset 1',
    description: `asdlkfadflg1 alskjgaklkaslkflkasflk alsf alklakas ja;lksjd;lfg
aksldfj alksjlfk asdlkfadflg adlfkjg a lkjh;lkhja glskajsklf g aslkjf ag sakjg
gaslkgf klsjlkhjl ha lkj;lk slkfjal lkja;sfg lkjls alskjlfk aslkjlg sssss
aksldfj alksjlfk asdlkfadflg adlfkjg a lkjh;lkhja glskajsklf g aslkjf ag sakjg
gaslkgf klsjlkhjl ha lkj;lk slkfjal lkja;sfg lkjls alskjlfk aslkjlg sssss
aksldfj alksjlfk asdlkfadflg adlfkjg a lkjh;lkhja glskajsklf g aslkjf ag sakjg
gaslkgf klsjlkhjl ha lkj;lk slkfjal lkja;sfg lkjls alskjlfk aslkjlg sssss
aksldfj alksjlfk asdlkfadflg adlfkjg a lkjh;lkhja glskajsklf g aslkjf ag sakjg
gaslkgf klsjlkhjl ha lkj;lk slkfjal lkja;sfg lkjls alskjlfk aslkjlg sssss`,
    cluster_solution_name: 'solution 1',
    size_by: 'fold change vs next',
    color_by: 'log2',
    gene_table_url: 'localhost:5000',
    clusters:
        'column	cluster	cell_count	bar_color	hide_cell_type	cell_type\n' +
        '0	2	2643	0		Arterial CMs\n' +
        '2	3	13962	2		Vascular Endothelial\n' +
        '1	1	3322	1	x	Arterial CMs',
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
