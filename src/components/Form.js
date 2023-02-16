import React, { useState, useEffect } from 'react'
const getTodosFromLS=()=>{
  const data = localStorage.getItem('Todos');
  if(data){
    return JSON.parse(data)
  }
  else{
    return []
  }
}
export const Form = () => {

    // todo value state
  const [todoValue, setTodoValue]=useState('');

  // todos array of objects
  const [todos, setTodos]=useState(getTodosFromLS());
  // console.log(todos);

  // form submit event
  const handleSubmit=(e)=>{
    e.preventDefault();

    // creating a ID for every todo
    const date = new Date();
    const time = date.getTime();

    // creating a todo object
    let todoObject={
      ID: time,
      TodoValue: todoValue,
      completed: false
    }
    // updating todos state
    setTodos([...todos, todoObject]);
    // clearing input field
    setTodoValue('');
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('Todos', JSON.stringify(todos));
    // we are updating todos in local storage whenever our todos state
    // is changing
  },[todos])  

  // delete a todo
  const handleDelete=(id)=>{
    // console.log(id);
    const filtered = todos.filter((todo)=>{
      return todo.ID !== id;
    })
    setTodos(filtered);
  }
// edit form
const [editForm,setEditForm]=useState(false);

// id state
const [id, setId]=useState();

// handle edit icon
const handleEdit=(todo, index)=>{
  setEditForm(true);
  setId(index);
  setTodoValue(todo.TodoValue);
}

// handle edit submit
const handleEditSubmit=(e)=>{
  e.preventDefault();
  let items = [...todos];
  let item = items[id];
  item.TodoValue = todoValue;
  // item.completed = false;
  items[id] = item;
  setTodos(items);
  setTodoValue('');
  setEditForm(false);
}

  return (
    <main>
    {/* form component */}
    {editForm===false&&(
      <form className="form" autoComplete='off' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="form--input"
          name='title'
          required
          onChange={(e)=>setTodoValue(e.target.value)} 
          value={todoValue}
        />
        <input
          type="text"
          placeholder="Price"
          className="form--input"
          name='price'
          required
          onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}
        />

        <button
          className="form--button"
        >
          Add
        </button>
      </form>
      )}
          {/* end of form component */}

          {/* edit form component */}
          {editForm===true&&(
            <div className="form">
              <form autoComplete="off" onSubmit={handleEditSubmit}>
                <div className="input-and-button">
                  <input type='text' placeholder="Add an Item" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  <div className='button edit'>
                    <button type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {/* end of edit form component */}

          {/* start of rendering todos if we have todos.length > 0 */}
          {todos.length>0&&(
            <div>
              {todos.map((individualTodo,index)=>(
                <div className='todo' key={individualTodo.ID}>

                  {/* checkbox and value div   */}
                  <div>
                    {editForm===false&&(
                        <input type='checkbox'/>
                    )}
                    <span>{individualTodo.TodoValue}</span>
                  </div>

                  {/* edit and delete icon div */}

                  {editForm===false&&(
                      <div className='edit-and-delete'>

                        <div style={{marginRight:7+'px'}}
                        onClick={()=>handleEdit(individualTodo,index)}>
                          edit
                        </div>
    
                        <div onClick={()=>handleDelete(individualTodo.ID)}>
                          trash
                        </div>
 
                      </div>
                  )}

                </div>
              ))}
              {/* just after map closing brackets */}

              {/* delete all todos */}
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button 
                onClick={()=>setTodos([])}
                className='delete-all'>DELETE ALL</button>
              </div>
              
            </div>
          )}
    </main>

  )
}