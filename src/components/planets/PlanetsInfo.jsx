import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../../details/Fetch';
import Info from '../Info'

class PlanetsInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
    }
  }

  async componentDidMount() {
    const items = await Fetch('https://swapi.co/api/planets/' + this.props.match.params.id)
    const images = 'https://starwars-visualguide.com/assets/img/planets/'

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
          <p className="Page"><Link to='/planets'>Planets</Link></p>
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
                  <Info title="Rotation period: " description={items.rotation_period} />
                  <Info title="Orbital period: " description={items.orbital_period} />
                  <Info title="Diameter: " description={items.diameter} />
                  <Info title="Climate: " description={items.climate} />
                  <Info title="Gravity: " description={items.gravity} />
                  <Info title="Surface water: " description={items.surface_water} />
                  <Info title="Terrain: " description={items.terrain} />
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

export default PlanetsInfo