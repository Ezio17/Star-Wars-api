import React from 'react'

const Info = (props) => {
  return (
    <>
      <p className='Info__text'>
        <span
          className='Info__title'>{props.title}</span> {props.description}</p>
      <hr />
    </>
  )
}

export default Info