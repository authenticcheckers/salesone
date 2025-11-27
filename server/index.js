import express from 'express'
import productsRouter from './routes/products.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
app.use('/api/products', productsRouter)

app.post('/api/checkout', (req,res)=>{
  const { cart } = req.body
  const id = 'cs_test_' + Math.random().toString(36).slice(2,12)
  return res.json({ id, url: `https://checkout.demo/redirect/${id}` })
})

app.listen(4001, ()=>console.log('Mock API running on http://localhost:4001'))
