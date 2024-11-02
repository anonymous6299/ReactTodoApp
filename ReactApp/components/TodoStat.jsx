import React from 'react'

const TodoStat = () => {
    return (
        <div className='todos bg-[#F9FAFB] border border-[#c1c4c9] text-[#212731] rounded-lg h-fit w-[26rem] py-10 px-8 flex justify-between hover:shadow-lg'>
            <div className='todosAdded w-fit flex flex-col justify-center'>
                <p className='text-6xl w-fit font-medium mx-auto'>20</p>
                <p className='font-medium w-fit'>Todos Added</p>
            </div>
            <div className='priorityTodo w-fit flex flex-col space-y-3 justify-center'>
                <div className='flex space-x-3'>
                    <div className='high'>
                        <p className='text-xl font-medium'>10</p>
                        <p>High Priority</p>
                    </div>
                    <div className='medium'>
                        <p className='text-xl font-medium'>10</p>
                        <p>Medium Priority</p>
                    </div>
                </div>
                <div className='flex space-x-3'>
                    <div className='low'>
                        <p className='text-xl font-medium'>10</p>
                        <p>Low Priority</p>
                    </div>
                    <div className='Completed'>
                        <p className='text-xl font-medium'>10</p>
                        <p>Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoStat