
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    TextField, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import UploadHelp from 'cellTypeSheet/sheetUploadHelp'

const Input = (props) => {
    const { autoFocus, label, title, value, onChange } = props
    return (
        <Grid item xs={6} >
            <TextField
                autoFocus={autoFocus}
                defaultValue={value}
                label={label}
                margin='dense'
                title={title}
                fullWidth
                onChange={onChange}
            />
        </Grid>
    )
}

const Content = ({props}) => {
    const { method, dataset, description, group, name, onMethodChange,
        onDatasetChange, onDescriptionChange, onGroupChange, onInfoClick,
        onNameChange } = props
    return (
        <DialogContent>
            <Grid container spacing={16}>
                <Grid item xs={12} >
                    <Button
                        variant='outlined'
                        component='span'
                        size='small'
                        color='primary'
                        onClick={onInfoClick}
                    >
                        <InfoIcon style={{marginRight: '0.5rem'}} />
                        Data Required
                    </Button>
                </Grid>
                <Input
                    autoFocus={true}
                    value={name}
                    label='Worksheet name*'
                    title='Name of the new worksheet'
                    onChange={onNameChange}
                />
                <Input
                    value={group}
                    label='Access Group'
                    title={'Optional, so others in the group may read ' +
                        'your worksheet'}
                    onChange={onGroupChange}
                />
                <Input
                    value={method}
                    label='Clustering method'
                    title={'The method used for the clustering, Louvain, etc.'}
                    onChange={onMethodChange}
                />
                <Input
                    value={dataset}
                    label='Dataset'
                    title={'Dataset that was clustered'}
                    onChange={onDatasetChange}
                />

            </Grid>
            <TextField
                id='celltypework-upload-input'
                defaultValue={description}
                label='Description'
                margin='dense'
                multiline
                rows={7}
                fullWidth
                title='A description of this clustering'
                onChange={onDescriptionChange}
            />
            <UploadHelp />
        </DialogContent>
    )
}

const UploadPres = (props) => {
    const { buttonEnabled, open, onClose, onFileChange } = props
    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                Upload Worksheet Data
            </DialogTitle>
            <Content props={props} />
            <DialogActions>
                <Typography variant='caption' style={{float: 'left'}}>
                    * required field
                </Typography>
                <Button color="primary" onClick={onClose}>
                    Cancel
                </Button>
                <input
                    disabled={!buttonEnabled}
                    id='upload_file_input'
                    type='file'
                    style={{display: 'none'}}
                    onChange={onFileChange}
                />
                <label htmlFor='upload_file_input' >
                    <Button
                        disabled={!buttonEnabled}
                        variant='contained'
                        component='span'
                        size='small'
                        color='primary'
                    >
                        Select File
                    </Button>
                </label>
            </DialogActions>
        </Dialog>
    )
}

export default UploadPres
