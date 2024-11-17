import { useContext, useEffect, useState } from 'react'
import Todo from './Todo'
import context from '../ContextAPI/ContextInit';
import Toast from './Toast';
const HomeBottomSec = (props) => {
    const [Arr, setArr] = useState([]);
    const [Input, setInput] = useState("");
    const [Todos, setTodos] = useState([]);
    const [SearchResult, setSearchResult] = useState(null);
    const Context = useContext(context);
    const { HomeBtmFrmBdr } = Context;
    const [CompletedTodos, setCompletedTodos] = useState([]);
    const [HPriorityTodos, setHPriorityTodos] = useState([]);
    const [LPriorityTodos, setLPriorityTodos] = useState([]);
    const [MPriorityTodos, setMPriorityTodos] = useState([]);
    const [Display, setDisplay] = useState(false);
    const [Heading, setHeading] = useState("");
    const [Desc, setDesc] = useState("")
    useEffect(() => {
        const todos = props.todos;
        setTodos(todos);
        const arr = todos.reverse();
        setArr(arr.slice(0, 4));
    }, [props.todos])
    const onChange = (e) => {
        if (e.target.value === "") {
            setInput(e.target.value)
            setSearchResult(null)
        }
        else {
            setInput(e.target.value)
        }
    }
    const onClick = (e) => {
        e.preventDefault();
        const data = Todos.find((item) => {
            return item.title === Input;
        })
        setSearchResult(data);
    }
    const MarkAsComplete = (id) => {
        const arr = Todos;
        const todo = Todos.find((item) => {
            return item.id === id;
        })
        const ind = arr.indexOf(todo);
        todo.completed = true
        arr[ind] = todo;
        setTodos(arr);
        setCompletedTodos([...CompletedTodos, todo])
        if (todo.priority === "h") {
            const arr = HPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setHPriorityTodos(arr);
        }
        else if (todo.priority === "m") {
            const arr = MPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setMPriorityTodos(arr);
        }
        else {
            const arr = LPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setLPriorityTodos(arr);
        }
        localStorage.setItem("todo", JSON.stringify(arr));
        setHeading("Completed");
        setDesc("Todo marked as completed.");
        setDisplay(true);
    }
    const CloseToast = () => {
        setDisplay(false);
    }
    return (
        <div className="pr-10">
            <div className='flex w-full justify-between max-[394px]:flex-col'>
                <p className='text-2xl font-medium mx-10 max-[477px]:text-lg max-[434px]:mx-5'>Recently Added</p>
                <div className="search flex max-[394px]:m-5 ">
                    <input type="text" placeholder='Search By Title' className='bg-transparent border w-[18rem] h-9 max-[621px]:w-[9rem] max-[621px]:px-3 rounded-l-md px-6 focus:outline-none focus:border-2 border-r-0 max-[394px]:w-full' name='todo' value={Input} onChange={onChange} autoComplete='off' style={{ borderColor: HomeBtmFrmBdr }} />
                    <button className='border rounded-r-md px-2 disabled:opacity-60 opacity-80 hover:opacity-100' onClick={onClick} style={{ borderColor: HomeBtmFrmBdr }} disabled={Input === ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className={`w-full flex ${SearchResult ? "justify-center" : "justify-between space-x-6 max-[1148px]:space-x-3 ml-6 max-[1148px]:ml-3 max-[1025px]:ml-6 max-[940px]:flex-col max-[940px]:items-center max-[940px]:h-40 max-[940px]:space-y-3 overflow-y-scroll max-[940px]:space-x-0"} my-16 max-[940px]:my-4`}>
                {
                    SearchResult ? <Todo props={{ item: SearchResult, bin: false }} /> :
                        Arr.map((item, index) => {
                            return <Todo key={index} props={{ item, bin: false, MarkAsComplete }} />
                        })
                }
            </div>
            <Toast props={{
                icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                heading: Heading,
                desc: Desc,
                bg: localStorage.getItem("TodoAppMode") === "light" ? "#D1FAE5" : "#10B981",
                border: "#10B981",
                text: localStorage.getItem("TodoAppMode") === "light" ? "#052e16" : "#F8FAFC",
                display: Display,
                close: CloseToast
            }} />
        </div>
    )
}

export default HomeBottomSec