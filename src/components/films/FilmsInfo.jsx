import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../../details/Fetch';
import Info from '../Info'

class FilmsInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
    }
  }

  async componentDidMount() {
    const items = await Fetch('https://swapi.co/api/films/' + this.props.match.params.id)
    const images = 'https://starwars-visualguide.com/assets/img/films/'

    this.setState({
      items,
      isLoading: true,
      images,
    })
  }

  render() {
    const { items, isLoading, images } = this.state

    return (
      <>
        <div className="Pages">
          <p className="Page"><Link to='/'>Home / </Link></p>
          <p className="Page"><Link to='/films'>Films</Link></p>
        </div>
        <>
          {isLoading ?
            <div>
              <h1 className='Info__Name'>{items.title}</h1>
              <div className='Info'>
                <img
                  alt={items.title}
                  src={images + items.url.match(/\d+/g).join('') + '.jpg'}
                  onError={(e) => {
                    e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                  }}
                  className='Info__image'
                />
                <div className="Info__wrapper">
                  <Info title="Title: " description={items.title} />
                  <Info title="Opening crawl: " description={items.opening_crawl} />
                  <Info title="Director: " description={items.director} />
                  <Info title="Producer: " description={items.producer} />
                  <Info title="Release date: " description={items.release_date} />
                  <Info title="Episode id: " description={items.episode_id} />
                </div>
              </div>
            </div>
            :
            <h1 className="red loading">Loading...</h1>
          }
        </>
      </>
    )
  }

}

export default FilmsInfo