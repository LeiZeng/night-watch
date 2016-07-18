import fs from 'fs'
import path from 'path'
import child_process from 'child_process'

let resultList = []

export const getList = () => resultList
export const updateList = callback =>  {
  fs.readdir(path.join(__dirname, '../public'), (err, files) => {
    if (err) {
      return callback(resultList)
    }
    resultList = files.map(filename => ({
      name: filename,
      link: filename
    }))
    callback(resultList)
  })
}
export const createNewLog = (info, callback) => {
  child_process.exec([
    'touch',
    path.join(__dirname, '../public', info.filename)
  ].join(' '), (error, stdout, stderr) => updateList(callback))
}
