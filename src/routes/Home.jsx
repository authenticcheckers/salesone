import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home({ addToCart }){
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [per, setPer] = useState(24)
  const [q, setQ] = useState('')

  useEffect(()=>{
    let alive = true
    axios.get('http://localhost:4001/api/products',{params:{page, per, q}}).then(r=>{ if(alive) setProducts(r.data.products) })
    return ()=> alive=false
  },[page,per,q])

  return (<div>
    <div className='flex items-center gap-4 mb-4'>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search products' className='flex-1 p-2 border rounded' />
      <select value={per} onChange={e=>setPer(Number(e.target.value))} className='p-2 border rounded'>
        <option value={12}>12</option><option value={24}>24</option><option value={48}>48</option>
      </select>
    </div>

    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {products.map(p=> (
        <motion.div key={p.id} className='bg-white rounded-lg p-3' whileHover={{ scale:1.02 }}>
          <Link to={'/product/'+p.id}>
            <img src={p.image} className='w-full h-40 object-cover rounded' loading='lazy' />
          </Link>
          <div className='mt-2'>
            <div className='text-sm font-semibold leading-tight'>{p.name}</div>
            <div className='text-xs text-gray-500'>{p.category}</div>
            <div className='mt-2 flex items-center justify-between'>
              <div className='text-lg'>¢{p.price.toFixed(2)}</div>
              <button className='px-3 py-1 bg-indigo-600 text-white rounded' onClick={()=>addToCart(p)}>Add</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className='mt-6 flex justify-between items-center'>
      <button className='px-4 py-2 border rounded' onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
      <div>Page {page}</div>
      <button className='px-4 py-2 border rounded' onClick={()=>setPage(p=>p+1)}>Next</button>
    </div>
  </div>)
}
