export const downloadFile = (blob: Blob, name: string) => {
  const blobURL = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = blobURL
  link.download = name

  document.body.appendChild(link)

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  document.body.removeChild(link)
}
