import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
function List({ todo, deleteItem, updateTodo }) {
  const { _id, task } = todo;
  // console.log(task);
  return (
    <article className="grocery-item">
      <p className="title">{task}</p>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => updateTodo(_id)} >
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => deleteItem(_id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  );
}

export default List;
