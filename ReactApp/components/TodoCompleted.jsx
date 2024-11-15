import { useContext, useEffect, useState } from 'react'
import context from '../ContextAPI/ContextInit';

const TodoCompleted = (props) => {
    const [CTodos, setCTodos] = useState([]);
    const [Todos, setTodos] = useState([]);
    const Context = useContext(context);
    const {CardBg,CardClr} = Context;
    useEffect(() => {
        if (props.todos?.length !== 0) {
            setTodos(props.todos)
            const todos = props.todos;
            let arr = todos.filter((item) => {
                return item.completed === true;
            })
            setCTodos(arr);
        }
    }, [props.todos])
    const ColorConditionEarly = (Math.round((CTodos.length / props.todos.length) * 100))<=25||CTodos.length===0||props.todos.length===0
    const ColorConditionMod = (Math.round((CTodos.length / props.todos.length) * 100))>=26 && (Math.round((CTodos.length / props.todos.length) * 100))<=50 
    const ColorConditionSubs = (Math.round((CTodos.length / props.todos.length) * 100))>=51 && (Math.round((CTodos.length / props.todos.length) * 100))<=75 
    return (
        <div className={`TodoStatCard border border-[#c1c4c9] rounded-md h-fit w-[26rem] py-10 px-5 flex flex-col hover:shadow-lg ${localStorage.getItem("TodoAppMode")==="light"?"hover:shadow-gray-200":"hover:shadow-gray-700"} max-[885px]:w-full max-[455px]:w-[20rem]`} style={{backgroundColor:CardBg,color:CardClr}} id='todos1'>
            <div className='flex justify-between max-[455px]:flex-col max-[455px]:items-center max-[455px]:space-y-3'>
                <div className='todosCompleted w-fit flex flex-col justify-center'>
                    <p className='text-6xl w-fit font-medium mx-auto'>{CTodos.length}/{props.todos.length}</p>
                    <p className='font-medium w-fit'>Todos Completed</p>
                </div>
                <div className='progressBar w-fit flex flex-col space-y-3 justify-center'>
                    <div className='border border-[#bfc1c5] w-[12.5rem] rounded-full'>
                        <div className={`${ColorConditionEarly?"bg-[#EF4444]":ColorConditionMod?"bg-[#F59E0B]":ColorConditionSubs?"bg-[#FBBF24]":"bg-[#10B981]"} rounded-full text-white text-center`} style={{
                            width: `${((Todos.length !== 0 && CTodos.length !== 0) ? (CTodos.length / props.todos.length) * 100 : 15)}%`
                        }} >{(!(props.todos.length === 0)) ? Math.round((CTodos.length / props.todos.length) * 100) : "0"}%</div>
                    </div>
                </div>
            </div>
            <div className="leftTodo font-medium mt-2 text-center">{props.todos.length - CTodos.length} todos left</div>
        </div>
    )
}

export default TodoCompleted