import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'

import { getList, updateList, createNewLog } from './results'

const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  updateList(renderHomePage(res))
})
app.post('/', bodyParser.urlencoded({ extended: false }), (req, res) => {
  const timestamp = new Date().getTime()
  const filename = req.body && req.body.filename
  if (!filename) {
    return res.redirect('/')
  }
  createNewLog({
    filename: filename,
    value: timestamp
  }, renderHomePage(res))
})

const renderHomePage = res => resultList => res.render('index', { title: 'Night Watch', list: resultList })
const server = http.createServer(app)
server.listen(3000, () => console.log('server start at 3000'))
