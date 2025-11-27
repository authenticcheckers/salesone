import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ axios.get('http://localhost:4001/api/products',{params:{per:20}}).then(r=>setProducts(r.data.products)) },[])
  return (<div>
    <h1 className='text-2xl font-bold mb-4'>Admin — Products</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {products.map(p=>(
        <div key={p.id} className='bg-white p-4 rounded flex gap-3 items-center'>
          <img src={p.image} className='w-20 h-20 object-cover rounded' />
          <div className='flex-1'>
            <div className='font-semibold'>{p.name}</div>
            <div className='text-sm text-gray-500'>¢{p.price.toFixed(2)} • Stock: {p.stock}</div>
          </div>
          <div>
            <button className='px-3 py-1 border rounded mr-2'>Edit</button>
            <button className='px-3 py-1 bg-red-600 text-white rounded'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>)
}
