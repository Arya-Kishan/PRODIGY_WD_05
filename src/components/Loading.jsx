import React from 'react'
import w1 from '../assets/w1.png'
import w2 from '../assets/w2.png'
import './Loading.scss'

export default function Loading() {
  return (
    <div className='loading'>
      {/* <img id='loading1' style={{width:"100px"}} src={w1} alt="" /> */}
      <img id='loading2' style={{width:"100px"}} src={w2} alt="" />
    </div>
  )
}
