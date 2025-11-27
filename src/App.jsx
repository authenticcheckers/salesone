import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Product from './routes/Product.jsx'
import Cart from './routes/Cart.jsx'
import Admin from './routes/Admin.jsx'
import { createCheckout } from './lib/api'

export default function App(){
  const [cart, setCart] = useState([])
  useEffect(()=>{
    const s = localStorage.getItem('rp_cart')
    if(s) setCart(JSON.parse(s))
  },[])
  useEffect(()=> localStorage.setItem('rp_cart', JSON.stringify(cart)),[cart])

  function addToCart(p){ setCart(c=>{
    const ex = c.find(x=>x.id===p.id)
    if(ex) return c.map(x=>x.id===p.id?{...x, qty:x.qty+1}:x)
    return [...c, {...p, qty:1}]
  })}

  async function checkout(){
    const session = await createCheckout(cart)
    if(session?.url) window.location.href = session.url
    else alert('Demo checkout created: ' + (session?.id||'no-id'))
  }

  return (<div className="min-h-screen">
    <header className="sticky top-0 z-40 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">RP</div>
          <div>
            <div className="text-lg font-bold">Retailer<span className="text-orange-500">Pro</span></div>
            <div className="text-xs text-gray-500">Enterprise demo — prices in ¢</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/admin" className="text-sm text-gray-600">Admin</Link>
          <button className="py-2 px-3 rounded-md border" onClick={()=>{const el=document.getElementById('cart-modal'); el.style.display='block'}}>
            Cart ({cart.reduce((s,i)=>s+i.qty,0)})
          </button>
        </nav>
      </div>
    </header>

    <main className="max-w-7xl mx-auto p-4">
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart} />} />
        <Route path='/product/:id' element={<Product addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} checkout={checkout} />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </main>

    <div id="cart-modal" style={{display:'none'}} className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={()=>{document.getElementById('cart-modal').style.display='none'}}></div>
      <div className="relative bg-white rounded-t-xl md:rounded-xl w-full md:w-3/4 max-w-2xl p-6">
        <h3 className="text-lg font-bold">Cart</h3>
        <div className="mt-4 space-y-3">
          {cart.length===0? <div className='text-gray-500'>Cart empty</div> : cart.map(i=>(
            <div key={i.id} className='flex items-center gap-3'>
              <img src={i.image} className='w-16 h-16 object-cover rounded' />
              <div className='flex-1'>
                <div className='font-semibold'>{i.name}</div>
                <div className='text-sm text-gray-500'>¢{i.price.toFixed(2)} × {i.qty}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-6 flex gap-3'>
          <button className='flex-1 bg-indigo-600 text-white py-2 rounded' onClick={checkout}>Checkout</button>
          <button className='px-4 py-2 border rounded' onClick={()=>{localStorage.removeItem('rp_cart'); setCart([])}}>Clear</button>
          <button className='px-4 py-2 text-sm text-gray-500' onClick={()=>{document.getElementById('cart-modal').style.display='none'}}>Close</button>
        </div>
      </div>
    </div>

    <footer className='mt-20 py-6'>
      <div className='max-w-7xl mx-auto text-center text-sm text-gray-600'>© {new Date().getFullYear()} Retailer Pro — Demo</div>
    </footer>
  </div>)
}
