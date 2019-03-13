import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../../details/Fetch';
import Info from '../Info'

class SpeciesInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
    }
  }

  async componentDidMount() {
    const items = await Fetch('https://swapi.co/api/species/' + this.props.match.params.id)
    const images = 'https://starwars-visualguide.com/assets/img/species/'

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
          <p className="Page"><Link to='/species'>Species</Link></p>
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
                  <Info title="Average height: " description={items.average_height} />
                  <Info title="Average lifespan: " description={items.average_lifespan} />
                  <Info title="Classification: " description={items.classification} />
                  <Info title="Designation: " description={items.designation} />
                  <Info title="Eye colors: " description={items.eye_colors} />
                  <Info title="Hair colors: " description={items.hair_colors} />
                  <Info title="Language: " description={items.language} />
                  <Info title="Skin colors: " description={items.skin_colors} />
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

export default SpeciesInfo