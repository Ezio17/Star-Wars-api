import React from 'react'
import queryString from 'query-string'

import Fetch from '../../details/Fetch';
import Menu from '../Menu'
import Pagination from '../Pagination'

class Films extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: null,
      isLoading: false,
      images: null,
      widthImage: true,
      pages: null,
      currentPage: 1,
    }
  }

  async componentDidMount() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/films/' + location.search)
    const staticUrl = 'https://starwars-visualguide.com/assets/img/films/'
    const pages = Math.ceil(items.count / 10)
    const numberPage = queryString.parse(this.props.location.search)

    this.setState({
      items: items.results,
      isLoading: true,
      images: staticUrl,
      pages,
      currentPage: numberPage.page,
    })
  }

  async componentDidUpdate() {
    const { location } = this.props;
    const items = await Fetch('https://swapi.co/api/films/' + location.search)
    const numberPage = queryString.parse(location.search)

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
      pages > 10 ?
        <>
          <Pagination pages={pages} title='films' currentPage={currentPage} />
          <Menu
            items={items}
            isLoading={isLoading}
            images={images}
            link='/films/'
            widthImage={widthImage}
          />
        </>
        :
        <Menu
          items={items}
          isLoading={isLoading}
          images={images}
          link='/films/'
          widthImage={widthImage}
        />
    )
  }
}

export default Films