function buildMap(rows) {
  return rows.reduce((accum, { dataIndex }) => {
    accum[dataIndex] = true;
    return accum;
  }, {});
}

function getCollatorComparator() {
  if (!!Intl) {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return collator.compare;
  }

  const fallbackComparator = (a, b) => a.localeCompare(b);
  return fallbackComparator;
}

function sortCompare(order) {
  return (a, b) => {
    if (a.data === null) a.data = '';
    if (b.data === null) b.data = '';
    return (
      (typeof a.data.localeCompare === 'function' ? a.data.localeCompare(b.data) : a.data - b.data) *
      (order === 'asc' ? -1 : 1)
    );
  };
}

function createCSVDownload(columns, data, options) {
  const replaceDoubleQuoteInString = columnData =>
    typeof columnData === 'string' && options.downloadOptions.quotes
      // eslint-disable-next-line
      ? columnData.replace(/\"/g, '""')
      : columnData;

  const quote = options.downloadOptions.quotes ? '"' : ''
  const CSVHead =
    columns
      .reduce(
        (soFar, column) =>
          column.download
            ? soFar + quote + replaceDoubleQuoteInString(column.name) + quote + options.downloadOptions.separator
            : soFar,
        '',
      )
      .slice(0, -1) + '\r\n';

  const CSVBody = data
    .reduce(
      (soFar, row) =>
        soFar +
        quote +
        row.data
          .filter((field, index) => columns[index].download)
          .map(columnData => replaceDoubleQuoteInString(columnData))
          .join(quote + options.downloadOptions.separator + quote)
          + quote + '\r\n',
      [],
    )
    .trim();

  const csv = `${CSVHead}${CSVBody}`;
  const blob = new Blob([csv], { type: 'text/csv' });

  /* taken from react-csv */
  if (navigator && navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, options.downloadOptions.filename);
  } else {
    const dataURI = `data:text/csv;charset=utf-8,${csv}`;

    const URL = window.URL || window.webkitURL;
    const downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.setAttribute('href', downloadURI);
    link.setAttribute('download', options.downloadOptions.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export { buildMap, getCollatorComparator, sortCompare, createCSVDownload };
