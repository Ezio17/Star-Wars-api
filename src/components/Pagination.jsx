import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = (props) => {

  const countPages = []

  for (let i = 1; i <= props.pages; i++) {
    countPages.push(i);
  }

  return (
    <div className="Pagination">
      {countPages.map((number, index) =>
        <Link
          to={'/' + props.title + '?page=' + number}
          key={number}
        >
          <button
            className={+props.currentPage === index + 1 ? 'Pagination__text Pagination__active-page' : 'Pagination__text'}
          >{number}</button>
        </Link>
      )}
    </div>
  )
}

export default Pagination