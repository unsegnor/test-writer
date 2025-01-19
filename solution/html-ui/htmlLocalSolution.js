const fs = require('fs')
const path = require('path')
const os = require('os')
const { v4: uuidv4 } = require('uuid')

module.exports = async function () {
  const uniqueTestFolder = path.join(os.tmpdir(), uuidv4())
  const htmlFilePath = path.join(uniqueTestFolder, 'test-writer.html')
  //const htmlFilePath = path.join('test-folder', 'test-writer.html')

  // Create the unique test folder
  fs.mkdirSync(uniqueTestFolder, { recursive: true })

  // Copy the HTML file to the unique test folder
  fs.copyFileSync(path.join(__dirname, 'test-writer.html'), htmlFilePath)

  const url = `file://${htmlFilePath}`

  return Object.freeze({
    url,
    close: async () => {
      // Clean up the unique test folder
      fs.rmSync(uniqueTestFolder, { recursive: true, force: true })
    },
  })
}
