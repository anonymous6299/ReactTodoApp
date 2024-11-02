import React from 'react'

const TodoCompleted = () => {
    return (
        <div className='todosCompleted bg-[#F9FAFB] border border-[#c1c4c9] text-[#212731] rounded-md h-fit w-[26rem] py-10 px-5 flex flex-col hover:shadow-lg'>
            <div className='flex justify-between'>
                <div className='todosCompleted w-fit flex flex-col justify-center'>
                    <p className='text-6xl w-fit font-medium mx-auto'>6/20</p>
                    <p className='font-medium w-fit'>Todos Completed</p>
                </div>
                <div className='progressBar w-fit flex flex-col space-y-3 justify-center'>
                    <div className='border border-[#bfc1c5] w-[12.5rem] rounded-full'>
                        {/* 0-25%: Red (#EF4444) for early stages, indicating the need to start
                        26-50%: Orange (#F59E0B) to show moderate progress
                        51-75%: Yellow (#FBBF24) to reflect substantial progress
                        76-100%: Green (#10B981) to represent near or full completion */}
                        <div className='bg-[#EF4444] rounded-full w-[30%] text-white text-center'>30%</div>
                    </div>
                </div>
            </div>
            <div className="leftTodo font-medium mt-2 text-center">14 todos left</div>
        </div>
    )
}

export default TodoCompleted