import Resizer from 'react-image-file-resizer'

export const resizeImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      50,
      50,
      'PNG',
      100,
      0,
      (uri) => {
        resolve(uri as File)
      },
      'file',
    )
  })
