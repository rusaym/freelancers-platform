import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/styles'
import { List, ListItem, IconButton, Tooltip } from '@material-ui/core'
import axios from 'axios'
import { useParams } from 'react-router'
import path from 'path'

const useStyles = makeStyles((theme) => ({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    borderWidth: '1px',
    borderRadius: '20px',
    borderColor: '#263238',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'grey',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  },
}))

const UploadFiles = (props) => {
  const classes = useStyles()
  const { id } = useParams()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const handleDeleteButton = (file) => {
    props.setSelectedFiles(props.selectedFiles.filter((e) => e !== file))
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      props.setSelectedFiles(acceptedFiles)
    }
  }, [acceptedFiles])

  const files = props.selectedFiles.map((file) => (
    <>
      {props.mode !== 'view' ? (
        <ListItem dense disablePadding divider>
          <Tooltip title='Удалить'>
            <IconButton
              color='secondary'
              onClick={() => handleDeleteButton(file)}
            >
              <img src='/icons/delete.png' height='25px' width='25px' />
            </IconButton>
          </Tooltip>
          {file.name}
        </ListItem>
      ) : (
        <ListItem dense disablePadding divider>
          <Tooltip title='Скачать'>
            <IconButton
              color='secondary'
              onClick={() => {
                console.log(file)
                const url = `/api/orders/files/download?filepath=${encodeURIComponent(
                  path.join(id, file.name)
                )}`

                axios({
                  url: url,
                  method: 'GET',
                  responseType: 'blob',
                }).then((response) => {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  )
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download', file.name)
                  document.body.appendChild(link)
                  link.click()
                })
              }}
            >
              <img src='/icons/download.png' height='25px' width='25px' />
            </IconButton>
          </Tooltip>
          {file.name}
        </ListItem>
      )}
    </>
  ))

  return (
    <section>
      {props.mode !== 'view' && (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p>
            Для импорта файлов, перетащите их сюда или нажмите в эту область
          </p>
          <img alt='' src='/icons/upload_cloud.png' style={{ height: 50 }} />
        </div>
      )}
      {props.selectedFiles.length > 0 && (
        <aside style={{ marginTop: props.mode !== 'view' ? 15 : 0 }}>
          <h4>Приложенные файлы:</h4>
          <List sx={{ width: 'auto', bgcolor: 'background.paper' }}>
            {files}
          </List>
        </aside>
      )}
    </section>
  )
}

export default UploadFiles
