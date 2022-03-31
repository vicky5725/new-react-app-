import React,{ useState , useEffect }from 'react';



const LOCAL_STORAGE = 'todoApp.todo'
function Todos({ todos , index ,completeTodo , deleteTodos}) {
  return(
  <div>
    {todos.text}
    <Checkbox/>
    <div>
        <button className="btn"onClick={() => deleteTodos(index) }>Delete</button>
    </div>
  </div>
  )
}
function TodoForm({addTodos}) {
  const [value , setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return ;
    addTodos(value);
   setValue('');
}
  return(
    <form onSubmit ={handleSubmit}>
      <input type ='text' className ="input" value ={value} onChange={e => setValue(e.target.value)} placeholder ="Add Todo"/>
    </form>
  )
}
function Checkbox() {
  const [chkValue, setChkValue] = useState(false);
return (
    <div className="txt">
      <input type="checkbox" checked={chkValue}/>
       <input type="button" value="Done" onClick={()=>setChkValue(!chkValue)} />
    </div>
  );
}

 function App() {
   const [todo,setTodo] =useState([]);
   useEffect(() => {
       const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
       if(storedTodo) setTodo(storedTodo)
    }, [])

   useEffect(() => {
       localStorage.setItem(LOCAL_STORAGE,JSON.stringify(todo))
   },[todo])


   const addTodos = text => {
     const newTodo = [...todo,{ text }]
     setTodo(newTodo);
  };
  const completeTodo = index => {
    const newTodo = [...todo];
    newTodo[index].Complete = true;
    setTodo(newTodo);
  }
   const deleteTodos = index => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  }
    return (
     <div>
       <div>
         {todo.map((todos,index)  => (
           <Todos key ={index} index = {index} todos={todos} completeTodo={completeTodo}
           deleteTodos = {deleteTodos} />      
              ))}
          <TodoForm addTodos = {addTodos} />

       </div>
     </div>
    )

}
export default App
