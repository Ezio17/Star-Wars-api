import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../../details/Fetch';
import Info from '../Info'

class StarshipsInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
    }
  }

  async componentDidMount() {
    const items = await Fetch('https://swapi.co/api/starships/' + this.props.match.params.id)
    const images = 'https://starwars-visualguide.com/assets/img/starships/'

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
          <p className="Page"><Link to='/starships'>Starships</Link></p>
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
                  <Info title="Model: " description={items.model} />
                  <Info title="Manufacturer: " description={items.manufacturer} />
                  <Info title="Cost_in_credits: " description={items.cost_in_credits} />
                  <Info title="MGLT: " description={items.MGLT} />
                  <Info title="Cargo capacity: " description={items.cargo_capacity} />
                  <Info title="Consumables: " description={items.consumables} />
                  <Info title="Crew: " description={items.crew} />
                  <Info title="Hyperdrive_rating: " description={items.hyperdrive_rating} />
                  <Info title="Length: " description={items.length} />
                  <Info title="Max atmosphering speed: " description={items.max_atmosphering_speed} />
                  <Info title="Passengers: " description={items.passengers} />
                  <Info title="Starship class: " description={items.starship_class} />
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

export default StarshipsInfo