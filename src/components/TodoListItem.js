import React from 'react';
import styles from "../TodoListItem.module.css" ;
import "../TodoListItem.module.css";
import PropTypes from 'prop-types';

import { TfiLayoutWidthFull } from "react-icons/tfi";
// import { TfiClose } from "@react-icons/tfi";


import { TfiClose, TfiLayoutPlaceholder, TfiCheckBox, TfiClipboard, TfiHeart } from "react-icons/tfi";
import { TbHeartFilled } from "react-icons/tb";


function TodoListItem({item, onRemoveTodo, disableTask, addRemoveFavorite}) {


  TodoListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    disableTask: PropTypes.func.isRequired,
    addRemoveFavorite: PropTypes.func.isRequired,
  }


  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const checkedStatus = item.done === "true" ? true : false;

  const handleChange = () => {
    checkedStatus = item.done === "true" ? true : false;
  } 

  const d = new Date();


  return (
    <li className={styles.ListItem}>
      <i className={styles.checkedStatus} checked = { checkedStatus } onChange={() => handleChange}   type="checkbox"  onClick={(e) => disableTask(item)} >
      <TfiLayoutWidthFull className={checkedStatus === false ? styles.showNotDone : styles.hide }/>
      <TfiCheckBox className={checkedStatus === true ? styles.showDone : styles.hide }/>
      </i>
      <div className={styles.taskDateWrapper}>

        <span className={(item.done === "true" ? styles.taskIsDone : styles.taskNotDone )} style={{ textAlign: 'left' }}> {item.title} </span>

        <span className={(item.done === "true" ? styles.dateDueDone : styles.dateDueNotDone )} > 
        <TfiClipboard className={styles.dueIcone} /> {weekdays[item.dateDue.getDay()]+ ', ' + months[item.dateDue.getMonth()] + ", " + item.dateDue.getDate()} 
          <span className={(item.dateDue < d && item.done !== "true") ?  styles.pastDueNotice : styles.hide }> - expired!</span> </span>

      </div>
      {/* className={styles.favoritesBtn} */}
      <button className={(item.favorite === "true" ? styles.favoriteAddedButton : styles.favoriteRemovedButton )}  onClick={() => addRemoveFavorite(item)}> 
        <TfiHeart className={(item.favorite === "true" ? styles.hide : item.done === "true"? styles.favoriteButtonOff : styles.favoriteRemovedButton )} 
        /><TbHeartFilled className={(item.favorite === "true" ? item.done === "true"? styles.favoriteButtonFilledOff : styles.favoriteAddedButton : styles.hide )}/> 
      </button>
      <button className={(item.done === "true" ? styles.taskIsDoneButton : styles.taskNotDoneButton )}  onClick={() => onRemoveTodo(item.id)}> <TfiClose className={styles.deleteBtn} /></button>
    </li>
  );
}

export default TodoListItem;