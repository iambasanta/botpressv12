import React, { useEffect, useState } from 'react'

import { read, utils } from 'xlsx'

/**
 * This is an example on how you may export multiple components from your view
 * If your module offers custom Skills, you would export your skill components here
 */
export { Example1 } from './example1'
export { Example2 } from './example2'

/**
 * This file is the full view of your module. It automatically includes heavy dependencies, like react-bootstrap
 * If you want to display an interface for your module, export your principal view as "default"
 */

const MyMainView = (props) => {
  const [name, setName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch().then((result) => {
      setName(result)
    })
  }, [])

  async function fetch() {
    const result = await props.bp.axios.get('mod/custom-module/foo')
    return result.data.name
  }

  function changeHandler(event) {
    setSelectedFile(event.target.files[0])
  }

  function acceptAndView(event) {
    event.preventDefault()

    if (!selectedFile) {
      console.error('No files selected')
    }

    const file = selectedFile
    const reader = new FileReader()

    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result)
      const workbook = read(data, { type: 'array' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 })
      setTransactions(jsonData)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div>
      <p>Name: {name}</p>
      <form enctype="multipart/form-data">
        <input type="file" name="file" onChange={changeHandler} />
        <br />
        <button onClick={acceptAndView}>Upload and view</button>
      </form>

      <div>
        <h3>Transaction history</h3>
        <table>
          <thead>
            <tr>{transactions.length > 0 && transactions[0].map((header, index) => <th key={index}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {transactions.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((column, columnIndex) => (
                  <td key={columnIndex}>{column}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyMainView
