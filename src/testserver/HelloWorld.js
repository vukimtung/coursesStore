const express = require('express')
const app = express()
const port = 3000

app.get('/test', (_req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Test on http://localhost:${port}/test`)
})
