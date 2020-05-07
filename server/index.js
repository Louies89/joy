const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare().then(() => {
  const server = express()
    
  server.get('/', (req, res) => {
    app.render(req, res, "/index");
    // return handle(req, res)
  })

  server.get('/page2', (req, res) => {
    // console.log('req',req.params,req.path)
    app.render(req, res, "/page2");
    // return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})