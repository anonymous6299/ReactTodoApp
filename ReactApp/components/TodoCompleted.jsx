import  { useEffect, useState } from 'react'

const TodoCompleted = (props) => {
    const [CTodos, setCTodos] = useState([]);
    useEffect(() => {
        const todos = props.todos;
        let arr = todos.filter((item)=>{
            return item.completed===true;
        })
        setCTodos(arr);
    }, [])
    
    return (
        <div className='todosCompleted bg-[#F9FAFB] border border-[#c1c4c9] text-[#212731] rounded-md h-fit w-[26rem] py-10 px-5 flex flex-col hover:shadow-lg'>
            <div className='flex justify-between'>
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
                        <div className={`bg-[#EF4444] rounded-full w-[${(!(props.todos.length===0)&&CTodos.length!==0)?(CTodos.length/props.todos.length)*100:12}%] text-white text-center`}>{(!(props.todos.length===0))?(CTodos.length/props.todos.length)*100:"0"}%</div>
                    </div>
                </div>
            </div>
            <div className="leftTodo font-medium mt-2 text-center">{props.todos.length-CTodos.length} todos left</div>
        </div>
    )
}

export default TodoCompleted