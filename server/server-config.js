import * as dotenv from 'dotenv'
import express from 'express'
import https from 'node:https'
import fs from 'node:fs'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

export default app
