import React from 'react'
import queryString from 'query-string'

import Fetch from '../../details/Fetch';
import Menu from '../Menu'
import Pagination from '../Pagination'


class Character extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: false,
      images: [],
      widthImage: true,
      pages: null,
      currentPage: 1,
      value: '',
    }


    this.handleChange = (event) => {
      this.setState({
        value: event.target.value
      });
    }
  }

  async componentDidMount() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/people/' + location.search)
    const images = 'https://starwars-visualguide.com/assets/img/characters/'
    const pages = Math.ceil(items.count / 10)
    const numberPage = queryString.parse(this.props.location.search)

    this.setState({
      items: items.results,
      isLoading: true,
      images,
      pages,
      currentPage: numberPage.page,
    })
  }

  async componentDidUpdate() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/people/' + location.search)
    const numberPage = queryString.parse(this.props.location.search)

    if (items.results[0].name === this.state.items[0].name) {
      return;
    }

    this.setState({
      items: items.results,
      currentPage: numberPage.page,
    });
  }

  render() {
    const { items, isLoading, images, widthImage, pages, currentPage } = this.state

    return (
      <>
        <Pagination pages={pages} title='people' currentPage={currentPage} />
        <Menu
          items={items}
          isLoading={isLoading}
          images={images}
          link='/people/'
          widthImage={widthImage}
        />
      </>
    )
  }
}

export default Character