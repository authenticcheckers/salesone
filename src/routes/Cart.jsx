import React from 'react'

export default function Cart({ cart, setCart, checkout }){
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0)
  function update(id,qty){ setCart(c=> c.map(i=>i.id===id?{...i,qty}:i)) }
  return (<div className='max-w-3xl mx-auto bg-white p-6 rounded'>
    <h2 className='text-xl font-bold'>Your Cart</h2>
    <div className='mt-4 space-y-3'>
      {cart.length===0? <div className='text-gray-500'>Empty</div> : cart.map(i=>(
        <div key={i.id} className='flex items-center gap-3'>
          <img src={i.image} className='w-16 h-16 object-cover rounded' />
          <div className='flex-1'>
            <div className='font-semibold'>{i.name}</div>
            <div className='text-sm text-gray-500'>¢{i.price.toFixed(2)}</div>
            <input type='number' min='1' value={i.qty} onChange={e=>update(i.id,Number(e.target.value))} className='w-20 mt-2 border rounded px-2 py-1' />
          </div>
        </div>
      ))}
    </div>
    <div className='mt-6 flex justify-between items-center'>
      <div className='text-lg font-bold'>Subtotal: ¢{subtotal.toFixed(2)}</div>
      <div className='flex gap-2'>
        <button className='px-4 py-2 border rounded' onClick={()=>{localStorage.removeItem('rp_cart'); setCart([])}}>Clear</button>
        <button className='px-6 py-2 bg-indigo-600 text-white rounded' onClick={checkout}>Checkout</button>
      </div>
    </div>
  </div>)
}
