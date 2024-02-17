import React from 'react';

import {useState} from 'react';
import InputWithLabel from './InputWithLabel';
import styles from "../TodoListItem.module.css" 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'


function AddTodoForm ({onAddTodo}) {


  AddTodoForm.propTypes = {
    id: PropTypes.string.isRequired,
    todoTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    comment: PropTypes.string
  }

  const [todoTitle, setTodoTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    e.preventDefault();
    let newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    onAddTodo({
      title: todoTitle, 
      dateDue: startDate.toString()  
    });
    setTodoTitle(' ');
    navigate('/')
  } 

  // title: todo.title,
  // dateCreated:todo.dateCreated,
  // dateDue: todo.dateDue,
  // done: 'false',

  //className={styles.datePicker}

  return (
    <div>
    <form onSubmit={handleAddTodo} className={styles.mainWrapperAddTask}>
    {/* <h1 className={styles.header}>Add Task</h1> */}
      <div className={styles.addTaskWrapper}>
        <InputWithLabel className={styles.inputForm} id={"todoTitle"} title={"title"} value={todoTitle} comment={"Add task"} handleChange = {handleTitleChange}>  </InputWithLabel>
        <div className={styles.datePicker}>
        <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} inline  minDate={new Date()} placeholderText="Select a day"/>
        </div>
         <div className={styles.buttonWrapper}>
          <div className={styles.buttonBackDone}> <Link to="/" className={styles.buttonBackLink}>back </Link></div>  
          <button className={styles.buttonBackDone} type='submit'> add</button>
        </div>
      </div>
    </form>
    
  </div>
  )
}

export default AddTodoForm;