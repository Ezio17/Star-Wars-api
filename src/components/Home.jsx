import React from 'react'
import { Link } from 'react-router-dom'

import HomeDetails from './../details/HomeDetails'

const Home = () => {
  return (
    <div className="Home" >
      {HomeDetails.map(item => (
        <div className="Home__images" key={item.text}>
          <Link to={'/' + item.text + '?page=1'}>
            <img className="Home__image" src={item.img} alt={item.text} />
            <span className="Home__image-text">{item.text}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home