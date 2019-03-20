import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../../details/Fetch';
import Info from '../Info'

class CharacterInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
    }
  }

  async componentDidMount() {
    const items = await Fetch('https://swapi.co/api/people/' + this.props.match.params.id)
    const images = 'https://starwars-visualguide.com/assets/img/characters/'

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
          <p className="Page"><Link to='/people'>Character</Link></p>
        </div>
        <>
          {isLoading ?
            <div>
              <h1 className='Info__Name'>{items.name}</h1>
              <div className='Info'>
                <img
                  alt={items.name}
                  src={images + items.url.match(/\d+/g).join('') + '.jpg'}
                  onError={(e) => {
                    e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                  }}
                  className='Info__image'
                />
                <div className="Info__wrapper">
                  <Info title="Name: " description={items.name} />
                  <Info title="Gender: " description={items.gender} />
                  <Info title="Hair color: " description={items.hair_color} />
                  <Info title="Skin color: " description={items.skin_color} />
                  <Info title="Eye color: " description={items.eye_color} />
                  <Info title="Birth year: " description={items.birth_year} />
                  <Info title="Height: " description={items.height} />
                </div>
              </div>
            </div>
            :
            <h1 className="loading">Loading...</h1>
          }
        </>
      </>
    )
  }
}

export default CharacterInfo