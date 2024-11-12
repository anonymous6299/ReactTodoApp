import { useContext, useEffect, useState } from 'react'
import context from '../ContextAPI/ContextIniit';

const TodoStat = (props) => {
    const Context=useContext(context)
    const {CardBg,CardClr} = Context;
    const [HPriTodos, setHPriTodos] = useState([]);
    const [MPriTodos, setMPriTodos] = useState([]);
    const [LPriTodos, setLPriTodos] = useState([]);
    const [CTodos, setCTodos] = useState([]);
    useEffect(() => {
        const todos = props.todos;
        let arr = todos.filter((item) => {
            return item.priority.includes("h");
        })
        setHPriTodos(arr);
        arr = todos.filter((item) => {
            return item.priority.includes("m");
        })
        setMPriTodos(arr);
        arr = todos.filter((item) => {
            return item.priority.includes("l");
        })
        setLPriTodos(arr);
        arr = todos.filter((item) => {
            return item.completed === true;
        })
        setCTodos(arr);
    }, [props.todos])

    return (
        <div className='TodoStatCard border border-[#c1c4c9] rounded-lg h-fit w-[26rem] py-10 px-8 flex justify-between hover:shadow-lg' id='todos2' style={{backgroundColor:CardBg,color:CardClr}}>
            <div className='todosAdded w-fit flex flex-col justify-center'>
                <p className='text-6xl w-fit font-medium mx-auto'>{props.todos.length}</p>
                <p className='font-medium w-fit'>Todos Added</p>
            </div>
            <div className='priorityTodo w-fit flex flex-col space-y-3 justify-center'>
                <div className='flex space-x-3'>
                    <div className='high'>
                        <p className='text-xl font-medium'>{HPriTodos.length}</p>
                        <p>High Priority</p>
                    </div>
                    <div className='medium'>
                        <p className='text-xl font-medium'>{MPriTodos.length}</p>
                        <p>Medium Priority</p>
                    </div>
                </div>
                <div className='flex space-x-3'>
                    <div className='low'>
                        <p className='text-xl font-medium'>{LPriTodos.length}</p>
                        <p>Low Priority</p>
                    </div>
                    <div className='Completed'>
                        <p className='text-xl font-medium'>{CTodos.length}</p>
                        <p>Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoStat