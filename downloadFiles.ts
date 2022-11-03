import downloadFile from "./downloadFile"

const downloadFiles = async (paths: string[]) => {
  for (const [index, path] of paths.entries()) {
    await downloadFile(path, index)
  }
}

export default downloadFiles