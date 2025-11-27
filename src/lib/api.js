import axios from 'axios'
const API = (path)=>`http://localhost:4001${path}`
export async function fetchProducts(params={}){
  const res = await axios.get(API('/api/products'), { params })
  return res.data
}
export async function createCheckout(cart){
  const res = await axios.post(API('/api/checkout'), { cart })
  return res.data
}
