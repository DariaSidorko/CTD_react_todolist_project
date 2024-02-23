import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';


function TodoList({todoList, onRemoveTodo, disableTask, addRemoveFavorite}) {


  TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    disableTask: PropTypes.func.isRequired,
    addRemoveFavorite: PropTypes.func.isRequired,
  }


  return (
    <ul>
      {
    todoList.map((item) =>{
        return (
            <TodoListItem item={item} key={item.id} onRemoveTodo={onRemoveTodo} disableTask={disableTask} addRemoveFavorite={addRemoveFavorite}/>
        )
        }) 
      }
      </ul>
  )}

export default TodoList;