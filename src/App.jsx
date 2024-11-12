import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import WebPEncoder from 'webp-encoder';
import { FileInput, StyledButton, Wrapper, Container } from './styles';
import { Download, Add, Upload } from 'grommet-icons'
import { Table, TableBody, TableHeader, TableCell, TableRow } from 'grommet'
import Cropper from './Cropper';
import './style.css'
import { addElementToATable } from './utils'


export default function App() {
  const data = new FormData()
  const [fileName, setFileName] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState()

  const [cropped, setCropped] = useState(null)

  const handleCrop = useCallback((blob) => {
    setCropped(URL.createObjectURL(blob))
  }, []);

  useEffect(() => () => URL.revokeObjectURL(cropped), [cropped]);

  const onUpload = ({ target }) => {
    const file = target.files[0]
    data.append('file', file)
    setFile(file)
    setFileName(file.name.split('.').slice(0,-1).join('.'))

  }

  const onConvert = () => {
    const img = document.getElementById('cropped')
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const convertedImage = WebPEncoder.encodeImageData(
      imageData.data,
      imageData.width,
      imageData.height,
      100
    )

    const F = new File([convertedImage], 'test.webp', {
      type: 'image/webp',
    });
    addElementToATable([img.width * img.height, F.size])
    setUrl(URL.createObjectURL(F));
  }

  const onDownload = () => {
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.webp`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setUrl('')
    setCropped(null)
    setFile(null)
  }

  return (
  <Container>
    <Wrapper>
      {!file ? (
        <StyledButton>
          <Add /> Add
          <FileInput type="file" onChange={onUpload} />
        </StyledButton>
      ) : (
        cropped &&
        (!url ? (
          <StyledButton onClick={onConvert}>
            <Upload /> Convert
          </StyledButton>
        ) : (
          <StyledButton onClick={onDownload}>
            <Download /> Download as {fileName}.webp
          </StyledButton>
        ))
      )}

      <Table style={{fontSize: 30}}>
        <TableHeader>
          <TableRow id="RowHead">
            <TableCell scope="col" border="bottom">
              <strong>Source image size</strong>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <strong>Webp image size</strong>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody id="TableBody">
          <TableRow id="RowBody"></TableRow>
        </TableBody>
      </Table>
    </Wrapper>
    {!url && file && <Cropper file={file} onCrop={handleCrop} />}
    {cropped && <img id="cropped" src={cropped} alt="cropped" />}
  </Container>
  );
}
