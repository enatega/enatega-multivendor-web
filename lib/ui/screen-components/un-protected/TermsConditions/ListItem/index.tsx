import React from 'react'

const ListItem = ({item}) => {

    console.log("item : ",item)
  return (
    <li className='py-2'>
      {item.text}
    </li>
  )
}

export default ListItem
