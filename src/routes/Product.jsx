import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Product({ addToCart }){
  const { id } = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{
    axios.get('http://localhost:4001/api/products/'+id).then(r=>setP(r.data))
  },[id])
  if(!p) return <div className='p-6'>Loading...</div>
  return (<div className='grid md:grid-cols-3 gap-6'>
    <div className='md:col-span-2 bg-white rounded p-4'>
      <img src={p.image} className='w-full h-96 object-cover rounded' />
      <div className='mt-4 grid grid-cols-3 gap-2'>
        {p.images.map((src,i)=>(<img key={i} src={src} className='h-20 object-cover rounded'/>))}
      </div>
    </div>
    <aside className='bg-white rounded p-4'>
      <h1 className='text-2xl font-bold'>{p.name}</h1>
      <div className='text-gray-600 mt-2'>{p.category} • {p.rating} ⭐</div>
      <div className='mt-4 text-2xl font-extrabold'>¢{p.price.toFixed(2)}</div>
      <div className='mt-4 text-sm text-gray-700'>{p.description}</div>
      <div className='mt-6 flex gap-3'>
        <button className='flex-1 bg-indigo-600 text-white py-2 rounded' onClick={()=>addToCart(p)}>Add to Cart</button>
        <button className='px-4 py-2 border rounded' onClick={()=>alert('Buy now demo')}>Buy now</button>
      </div>
    </aside>
  </div>)
}
