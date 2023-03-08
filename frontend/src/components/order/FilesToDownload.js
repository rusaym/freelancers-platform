import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/styles'
import { List, ListItem, IconButton, Tooltip } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles((theme) => ({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '20px',
    borderColor: '#263238',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'grey',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  },
}))

const UploadFiles = (props) => {
  const classes = useStyles()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const handleDeleteButton = (file) => {
    props.setSelectedFiles(props.selectedFiles.filter((e) => e !== file))
  }

  useEffect(() => {
    props.setSelectedFiles(acceptedFiles)
  }, [acceptedFiles])

  const files = props.selectedFiles.map((file) => (
    <ListItem dense disablePadding divider>
      <Tooltip title='Удалить'>
        <IconButton color='secondary' onClick={() => handleDeleteButton(file)}>
          <HighlightOffIcon sx={{ color: 'darkred' }} />
        </IconButton>
      </Tooltip>
      {file.name}
    </ListItem>
  ))

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p>Для выбора файлов, перетащите их сюда или нажмите в эту область</p>
        <img
          alt=''
          src='/static/folder.png'
          {...props}
          style={{ height: 60 }}
        />
      </div>
      <aside style={{ marginTop: 15 }}>
        {acceptedFiles.length > 0 && <h4>Приложенные файлы:</h4>}
        <List sx={{ width: 'auto', bgcolor: 'background.paper' }}>{files}</List>
      </aside>
    </section>
  )
}

export default UploadFiles
