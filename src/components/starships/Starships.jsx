import React from 'react'

import Fetch from '../../details/Fetch';
import Menu from '../Menu'
import Pagination from '../Pagination'

class Starships extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: null,
      widthImage: false,
      pages: null,
      currentPage: 1,
    }
  }

  async componentDidMount() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/starships/' + location.search)
    const images = 'https://starwars-visualguide.com/assets/img/starships/'
    const pages = Math.ceil(items.count / 10)

    this.setState({
      items: items.results,
      isLoading: true,
      images,
      pages,
    })
  }

  async componentDidUpdate() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/starships/' + location.search)
    const currentPage = location.search.match(/\d+/g)

    if (items.results[0].name === this.state.items[0].name) {
      return;
    }

    this.setState({
      items: items.results,
      currentPage,
    });
  }

  render() {
    const { items, isLoading, images, widthImage, pages, currentPage } = this.state

    return (
      <>
        <Pagination pages={pages} title='starships' currentPage={currentPage} />
        <Menu
          items={items}
          isLoading={isLoading}
          images={images}
          link='/starships/'
          widthImage={widthImage}
        />
      </>
    )
  }
}

export default Starships