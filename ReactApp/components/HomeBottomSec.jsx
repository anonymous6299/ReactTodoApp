import  { useContext, useEffect, useState } from 'react'
import Todo from './Todo'
import context from '../ContextAPI/ContextInit';
const HomeBottomSec = (props) => {
    const [Arr, setArr] = useState([]);
    const [Input, setInput] = useState("");
    const [Todos, setTodos] = useState([]);
    const [SearchResult, setSearchResult] = useState(null);
    const Context = useContext(context);
    const {HomeBtmFrmBdr} = Context;
    useEffect(() => {
        const todos = props.todos;
        setTodos(todos);
        const arr = todos.reverse();
        setArr(arr.slice(0,4));
    }, [props.todos])
    const onChange = (e) => {
        if (e.target.value==="") {
            setInput(e.target.value)
            setSearchResult(null)
        }
        else{
            setInput(e.target.value)
        }
    }
    const onClick = (e) => {
        e.preventDefault();
        const data = Todos.find((item)=>{
            return item.title===Input;
        })
        setSearchResult(data);
    }
    return (
        <div className="pr-10">
            <div className='flex w-full justify-between max-[394px]:flex-col'>
                <p className='text-2xl font-medium mx-10 max-[477px]:text-lg max-[434px]:mx-5'>Recently Added</p>
                <div className="search flex max-[394px]:m-5 ">
                    <input type="text" placeholder='Search By Title' className='bg-transparent border w-[18rem] h-9 max-[621px]:w-[9rem] max-[621px]:px-3 rounded-l-md px-6 focus:outline-none focus:border-2 border-r-0 max-[394px]:w-full' name='todo' value={Input} onChange={onChange} autoComplete='off' style={{borderColor:HomeBtmFrmBdr}}/>
                    <button className='border rounded-r-md px-2 disabled:opacity-60 opacity-80 hover:opacity-100' onClick={onClick} style={{borderColor:HomeBtmFrmBdr}} disabled={Input===""}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className={`w-full flex ${SearchResult?"justify-center":"justify-between space-x-6 max-[1148px]:space-x-3 ml-6 max-[1148px]:ml-3 max-[1025px]:ml-6 max-[940px]:flex-col max-[940px]:items-center max-[940px]:h-40 max-[940px]:space-y-3 overflow-y-scroll max-[940px]:space-x-0"} my-16 max-[940px]:my-4`}>
                {
                    SearchResult?<Todo props={{ item:SearchResult, bin: false }} />:
                    Arr.map((item,index)=>{
                        return <Todo key={index} props={{ item, bin: false }} />
                    })
                }
            </div>
        </div>
    )
}

export default HomeBottomSec