import React from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "./TodoListItem.module.css"
import styles from "./TodoListItem.module.css" 
import { TfiPlus, TfiHeart } from "react-icons/tfi";


// const useSemiPersistentState = () => {
//   const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);
//   return [todoList, setTodoList]
// }

function App() {


 const [todoList, setTodoList] = React.useState([]);

 const [isLoading, setIsLoading] =  React.useState(true);

 const [favoritesBtnStatus, setFavoritesBtnStatus]  = React.useState(false);

 const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

 const d = new Date();
 const date = d.getDate(); 
 const weekday = weekdays[d.getDay()];
 const month = months[d.getMonth()];

  const addTodo = (newTodo) => {
    if (newTodo.title)
    postData(newTodo)
  }

  const removeTodo = (id) => {
    removeData(id);
    setTodoList(todoList.filter((list) => list.id !== id))
  }

  const disableTask = (task) => {
    updateTaskStatusData(task);
  }

  const addRemoveFavorite = (item) => {
    updateFavoriteData(item);
   
  }

  const filterFavorites = () => {
    console.log("HERE")
    console.log(favoritesBtnStatus)
    if (favoritesBtnStatus === false) {
    setTodoList(todoList.filter((list) => list.favorite === "true"));
    setFavoritesBtnStatus(true);
    }
    else {
    fetchData();
    setFavoritesBtnStatus(false);
    }
    console.log("AFTER")
    console.log(favoritesBtnStatus)
  }


  // FETCH DATA
  const fetchData = async() => {

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`}
    }
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
    try {

    const response = await
       fetch(url, options);

       if (!response.ok) {
         const message = `Error: ${response.status}`;
         throw new Error(message);
       }
       const data = await response.json();
       


       const todos = data.records.map((todo) => {

          const newTodo =  {
              id: todo.id,
              title: todo.fields.title,
              dateDue: new Date(todo.fields.dateDue),
              done: todo.fields.done,
              favorite: todo.fields.favorite
          }

          return newTodo

      });

      todos.sort((a, b) => a.dateDue - b.dateDue);

      setTodoList(todos);

      setIsLoading(false)

      } catch (error) {
          console.log(error.message)
      }

  }

  // POST DATA
    const postData = async (todo) => {
      const airtableData = {
              fields: {
                title: todo.title,
                dateCreated: d.toString(),
                dateDue: todo.dateDue,
                done: 'false',
                favorite: 'false'
              },
            };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`

      try {
    
        const response = await fetch(url, options);
    
        if (!response.ok) {
          const message = `Error has ocurred:
                                 ${response.status}`;
          throw new Error(message);
        }
    
        fetchData();

        const dataResponse = await response.json();

        return dataResponse;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    };


    // UPDATE DATA
    const updateTaskStatusData = async (task) => {
      
      const airtableData = {
        fields: {
          done: task.done === "false" ? "true" : "false",
        },
      };

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${task.id}`

      try {
    
        const response = await fetch(url, options);
    
        if (!response.ok) {
          const message = `Error has ocurred:
                                 ${response.status}`;
          throw new Error(message);
        }
    
        fetchData();

        const dataResponse = await response.json();

        return dataResponse;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }


    const updateFavoriteData = async (item) => {
      const airtableData = {
        fields: {
          favorite: item.favorite === "false" ? "true" : "false",
        },
      };

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${item.id}`

      try {
    
        const response = await fetch(url, options);
    
        if (!response.ok) {
          const message = `Error has ocurred:
                                 ${response.status}`;
          throw new Error(message);
        }
    
        fetchData();

        const dataResponse = await response.json();

        return dataResponse;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }


    // REMOVE DATA
    const removeData = async (id) => {

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      }

      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`

      try {
    
        const response = await fetch(url, options);
        if (!response.ok) {
          const message = `Error has ocurred:
                                 ${response.status}`;
          throw new Error(message);
        }
    
        fetchData();

        const dataResponse = await response.json();

        return dataResponse;
      } catch (error) {
        console.log(error.message);
        return null;
      }
    };


    React.useEffect(() => {
      fetchData();
    },[]);

  // React.useEffect(() => {
  //   if(isLoading === false) {
  //   localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  //   } 
  // }, [todoList, isLoading]);


  // React.useEffect(() => {
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({data:{todoList: JSON.parse(localStorage.getItem("savedTodoList")) || []}})
  //     }, 2000)
  //   }).then((result) => {
  //     setTodoList(result.data.todoList)
  //     setIsLoading(false)
  //   })
    
  // }, []);
   
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/add" element={
        <React.Fragment>
            <AddTodoForm  onAddTodo={addTodo}/>
        </React.Fragment>
      }></Route>
      <Route path="/" element={
        <React.Fragment>  
          <div className={styles.mainWrapper} >
            <div className={styles.subheading}>
              <div className={styles.headingWrapper}>
                <h1 className={styles.header}>My Day</h1>
                <p>{weekday}, {month} {date}</p>
              </div>
              <div className={styles.addBtnWrapper}>
                <TfiHeart className={favoritesBtnStatus === true ? styles.favoritesBtnTrue : styles.favoritesBtn} onClick={() => filterFavorites()}/>
                <Link to="/add" ><TfiPlus  className={styles.addBtn} /></Link>
              </div>
            </div>
            <div className={styles.todosWrapper}>
              {isLoading ? <p>Loading...</p> :  <TodoList todoList = {todoList} onRemoveTodo={removeTodo} disableTask={disableTask} addRemoveFavorite={addRemoveFavorite} />}
            </div>
          </div>
        </React.Fragment>}>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;