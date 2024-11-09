import { useEffect,useState } from 'react'
import TodoStat from './TodoStat'
import TodoCompleted from './TodoCompleted'
import HomeBottomSec from './HomeBottomSec'

const Home = () => {
    const [Todos, setTodos] = useState([]);
    const [HPriorityTodos, setHPriorityTodos] = useState([]);
    const [MPriorityTodos, setMPriorityTodos] = useState([]);
    const [LPriorityTodos, setLPriorityTodos] = useState([]);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
        }
    }, [])
    
    return (
        <>
            <p className='mt-8 mx-10 text-3xl font-semibold text-[#1F2937]'>Good Morning</p>
            <div className='dashboard mt-16 px-10 flex justify-center w-[86vw] space-x-20'>
                <TodoStat todos={Todos}/>
                <TodoCompleted todos={Todos}/>
            </div>
            <hr className='mt-20 mb-10 mx-10 border-[#212731] opacity-20' />
            <HomeBottomSec todos={Todos}/>
        </>
    )
}

export default Home