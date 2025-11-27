import express from 'express'
import fs from 'fs'
const router = express.Router()
const data = JSON.parse(fs.readFileSync(new URL('../../data/products.json', import.meta.url)))

router.get('/', (req,res)=>{
  let { page=1, per=24, q='' } = req.query
  page = Number(page); per = Number(per)
  let items = data.slice()
  if(q) items = items.filter(p=> p.name.toLowerCase().includes(String(q).toLowerCase()) || (p.description && p.description.toLowerCase().includes(String(q).toLowerCase())))
  const total = items.length
  const start = (page-1)*per
  const products = items.slice(start, start+per)
  res.json({ products, total, page, per })
})

router.get('/:id', (req,res)=>{
  const id = Number(req.params.id)
  const p = data.find(x=>x.id===id)
  if(!p) return res.status(404).json({error:'Not found'})
  p.images = p.images || [p.image]
  p.reviews = [{user:'Ama',rating:5,comment:'Excellent!'}, {user:'Kojo',rating:4,comment:'Good value'}]
  res.json(p)
})

export default router
