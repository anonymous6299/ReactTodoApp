import React, { useEffect,useState } from 'react'
import SideNav from './SideNav'
import Todo from './Todo'

const Todos = () => {
    const [Todos, setTodos] = useState([]);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
        }
    }, [])
    const DelTodo = (title) => {
        const newTodos = Todos.filter((item)=>{
            return item.title!==title;
        })
        setTodos(newTodos);
        localStorage.setItem("todo",JSON.stringify(newTodos));
    }
    return (
        <div className='flex'>
            <div><SideNav /></div>
            <div className='w-full'>
                <p className='text-center text-3xl my-20'>Your Todos</p>
                <div className='mx-20'>
                    {
                        Todos.length!==0?Todos.map((item,index)=>{
                            return <Todo key={index} props={{item,DelTodo}}/>
                        }):<p>No Todos Found.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todos