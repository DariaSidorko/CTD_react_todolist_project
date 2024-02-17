import React from 'react';
import TodoListItem from './TodoListItem';



function TodoList({todoList, onRemoveTodo, disableTask, addRemoveFavorite}) {

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