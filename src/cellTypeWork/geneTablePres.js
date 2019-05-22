
import React from 'react';
import TextField from '@material-ui/core/TextField'

import DataTable from 'components/DataTable'

const Cluster = ({ cluster, onChange, onKeyPress }) => {
    return (
        <TextField
            label='Show genes for cluster'
            default={cluster}
            onChange={onChange}
            onKeyPress={onKeyPress}
            style={{
                width: '12rem',
                marginTop: '1rem',
                marginLeft: '1rem',
                zIndex: 1000,
            }}
        />
    )
}

const Table = ({props}) => {
    const { columns, data, header, showTable } = props
    if (!showTable) {
        return (null)
    }
    return (
        <div style={{marginTop: -60 }} >
            <DataTable
                header={header}
                data={data}
                columns={columns}
            />
        </div>
    )
}

const Presentation = (props) => {
    const { cluster, show, onClusterChange, onClusterKeyPress } = props
    if (!show) {
        return (null)
    }
    return (
        <React.Fragment>
            <Cluster
                cluster={cluster}
                onChange={onClusterChange}
                onKeyPress={onClusterKeyPress}
            />
        <Table props={props} />
        </React.Fragment>
    )
}

export default Presentation
