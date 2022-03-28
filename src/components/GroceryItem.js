import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function groceryItem({groceryItem, editItem, deleteItem}) {
  
  const {id, title} = groceryItem;
  
  return (
    <article className='grocery-item'>
       <p className='title'>{title}</p>
        <div>
          <button onClick={()=>{editItem(id)}} className="edit-btn"><FaEdit /></button>
         <button onClick={()=>{deleteItem(id)}} className="edit-btn"><FaTrash /></button>
         </div>
   </article>
  )
};
