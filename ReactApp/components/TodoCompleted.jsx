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

    return (
        <div className={`TodoStatCard border border-[#c1c4c9] rounded-md h-fit w-[26rem] py-10 px-5 flex flex-col hover:shadow-lg ${localStorage.getItem("TodoAppMode")==="light"?"hover:shadow-gray-200":"hover:shadow-gray-700"} max-[885px]:w-full max-[455px]:w-[20rem]`} style={{backgroundColor:CardBg,color:CardClr}} id='todos1'>
            <div className='flex justify-between max-[455px]:flex-col max-[455px]:items-center max-[455px]:space-y-3'>
                <div className='todosCompleted w-fit flex flex-col justify-center'>
                    <p className='text-6xl w-fit font-medium mx-auto'>{CTodos.length}/{props.todos.length}</p>
                    <p className='font-medium w-fit'>Todos Completed</p>
                </div>
                <div className='progressBar w-fit flex flex-col space-y-3 justify-center'>
                    <div className='border border-[#bfc1c5] w-[12.5rem] rounded-full'>
                        {/* 0-25%: Red (#EF4444) for early stages, indicating the need to start
                        26-50%: Orange (#F59E0B) to show moderate progress
                        51-75%: Yellow (#FBBF24) to reflect substantial progress
                        76-100%: Green (#10B981) to represent near or full completion */}
                        <div className={`bg-[#EF4444] rounded-full text-white text-center`} style={{
                            width: `${((Todos.length !== 0 && CTodos.length !== 0) ? (CTodos.length / props.todos.length) * 100 : 15)}%`
                        }} >{(!(props.todos.length === 0)) ? (CTodos.length / props.todos.length) * 100 : "0"}%</div>
                    </div>
                </div>
            </div>
            <div className="leftTodo font-medium mt-2 text-center">{props.todos.length - CTodos.length} todos left</div>
        </div>
    )
}

export default TodoCompleted