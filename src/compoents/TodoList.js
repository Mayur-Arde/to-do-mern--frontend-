import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';
import axios from 'axios';

function TodoList() {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/todo/api/')
      .then((res) => {
        setTodo(res.data);
      })
      .catch((error) => console.log(error));
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      // Alert
      showAlert(true, 'Enter any value', 'danger');
    } else if (text && isEditing) {
      const newTask = {
        task: text,
      };
      axios
        .patch(`http://localhost:5000/todo/api/${editID}`, newTask)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
        setIsEditing(false);
        setEditID(null);
        setText('');
        showAlert(true, 'item has been edited', 'success')
    } else {
      const newTask = {
        task: text,
      };
      axios
        .post('http://localhost:5000/todo/api', newTask)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));

      setText('');
      showAlert(true, 'item has been added', 'success');
    }
  };

  // console.log(text)

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const deleteItem = (id) => {
    setTodo(todo.filter((todo) => todo._id !== id));
    axios
      .delete(`http://localhost:5000/todo/api/${id}`)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    showAlert(true, 'Deleted Task', 'danger');
  };

  const updateTodo = (id, task) => {
    const specificItem = todo.find((todo) => todo._id === id);
    setText(specificItem.task);
    setIsEditing(true);
    setEditID(id);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} text={text} />}

        <h3>To Do App (MERN)</h3>
        <div className="form-control">
          <input
            type="text"
            value={text}
            className="grocery"
            placeholder="Eg: Learn React"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {todo.length > 0 && (
        <div className="grocery-container">
          {todo.map((item) => {
            return (
              <div className="grocery-list">
                <List
                  todo={item}
                  deleteItem={deleteItem}
                  updateTodo={updateTodo}
                  key={item._id}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default TodoList;
