import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ items, isLoading, images, link, widthImage }) => {
  return (
    <div>
      {isLoading ?
        <>
          <p className="Home__page"><Link to='/'>Home</Link></p>
          <div className="Table">
            {items.map((item, index) =>
              <Link to={link + items[index].url.match(/\d+/g)} key={index}>
                <div className={widthImage ? "Table__block" : "Table__block-small"}>
                  <img
                    alt={item.name || item.title}
                    src={images + item.url.match(/\d+/g).join('') + '.jpg'}
                    onError={(e) => {
                      e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                    }}
                    className={widthImage ? "Table__image" : "Table__image-small"}
                  />
                  <div className="Table__block-text">
                    <p
                      className="Table__text"
                    >{item.name || item.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </>
        :
        <h1 className="loading">Loading...</h1>
      }
    </div>
  )
}

export default Menu