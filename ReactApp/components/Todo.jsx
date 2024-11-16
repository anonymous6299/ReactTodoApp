import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import context from "../ContextAPI/ContextInit";
const Todo = ({ props }) => {
    const Context = useContext(context);
    const { TodoCardUI } = Context;
    const navigate = useNavigate();
    const onClickHandler = (route) => {
        if (!props.bin) {
            navigate(route)
        }
    }
    if (props.item.completed) {
        return (
            <>
                <div className={`border w-80 rounded-xl px-4 py-4 hover:shadow-lg ${localStorage.getItem("TodoAppMode") === "light" ? "hover:shadow-gray-200" : "hover:shadow-gray-700"}`}
                    style={{
                        backgroundColor: TodoCardUI.completed.color,
                        borderColor: TodoCardUI.completed.border,
                        color: TodoCardUI.completed.text
                    }}>
                    <div className="flex justify-between">
                        <div className='deadline'>
                            <p className={`text-2xl font-bold ${props.bin ? "" : "hover:underline"} hover:cursor-pointer w-fit text-red-600`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.deadlineDay}, {props.item.deadlineDate}</p>
                            <p className={`text-2xl font-bold ${TodoCardUI.completed.color === "#bbf7d0" ? "hidden" : "block"}`}>{props.item.deadlineTime} {props.item.deadlineTime.slice(0, 2) > 12 ? "PM" : "AM"}</p>
                        </div>
                        <div className="completeBtn flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-2 text-white bg-green-600 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                    </div>
                    <div className={`flex w-full justify-between items-center ${TodoCardUI.completed.color === "#bbf7d0" ? "mt-8" : ""}`}>
                        <div>
                            <p className={`text-lg font-medium ${props.bin ? "" : "hover:underline"} hover:cursor-pointer`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.title}</p>
                            <p className={`text-sm`}>{props.item.desc}</p>
                        </div>
                        <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.DelTodo ? "block" : "hidden"}`} onClick={() => { props.DelTodo(props.item.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
            </>
        )

    }
    else if (props.item.priority === "h" && (!(props.item.completed))) {
        return (
            <>
                <div className={`border w-80 rounded-xl px-4 py-4 hover:shadow-lg ${localStorage.getItem("TodoAppMode") === "light" ? "hover:shadow-gray-200" : "hover:shadow-gray-700"}`}
                    style={{
                        backgroundColor: TodoCardUI.high.color,
                        borderColor: TodoCardUI.high.border,
                        color: TodoCardUI.high.text
                    }}>
                    <div className="flex justify-between">
                        <div className='deadline'>
                            <p className={`text-2xl font-bold ${props.bin ? "" : "hover:underline"} hover:cursor-pointer w-fit text-red-600`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.deadlineDay}, {props.item.deadlineDate}</p>
                            <p className={`text-2xl font-bold ${TodoCardUI.high.color === "#bbf7d0" ? "hidden" : "block"}`}>{props.item.deadlineTime} {props.item.deadlineTime.slice(0, 2) > 12 ? "PM" : "AM"}</p>
                        </div>
                        <div className={`completeBtn flex ${props.bin ? "hidden" : "block"}`}>
                            <input type="checkbox" name={`checkinput-${props.item.id}`} className={`w-10 h-5 mt-2 ${(!(props.item.completed)) ? "block" : "hidden"} cursor-pointer`} onClick={() => { props.MarkAsComplete(props.item.id) }} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 mt-2 text-white bg-green-600 rounded-full ${((props.item.completed)) ? "block" : "hidden"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                    </div>
                    <div className={`flex w-full justify-between items-center ${TodoCardUI.high.color === "#bbf7d0" ? "mt-8" : ""}`}>
                        <div>
                            <p className={`text-lg font-medium ${props.bin ? "" : "hover:underline"} hover:cursor-pointer`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.title}</p>
                            <p className={`text-sm`}>{props.item.desc}</p>
                        </div>
                        <div className="options flex space-x-4">
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.DelTodo ? "block" : "hidden"}`} onClick={() => { props.DelTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.RestoreTodo ? "block" : "hidden"}`} onClick={() => { props.RestoreTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )


    }
    else if (props.item.priority === "m" && (!(props.item.completed))) {
        return (
            <>
                <div className={`border w-80 rounded-xl px-4 py-4 hover:shadow-lg ${localStorage.getItem("TodoAppMode") === "light" ? "hover:shadow-gray-200" : "hover:shadow-gray-700"}`}
                    style={{
                        backgroundColor: TodoCardUI.med.color,
                        borderColor: TodoCardUI.med.border,
                        color: TodoCardUI.med.text
                    }}>
                    <div className="flex justify-between">
                        <div className='deadline'>
                            <p className={`text-2xl font-bold ${props.bin ? "" : "hover:underline"} hover:cursor-pointer w-fit text-red-600`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.deadlineDay}, {props.item.deadlineDate}</p>
                            <p className={`text-2xl font-bold ${TodoCardUI.med.color === "#bbf7d0" ? "hidden" : "block"}`}>{props.item.deadlineTime} {props.item.deadlineTime.slice(0, 2) > 12 ? "PM" : "AM"}</p>
                        </div>
                        <div className={`completeBtn flex ${props.bin ? "hidden" : "block"}`}>
                            <input type="checkbox" name={`checkinput-${props.item.id}`} className={`w-10 h-5 mt-2 ${(!(props.item.completed)) ? "block" : "hidden"} cursor-pointer`} onClick={() => { props.MarkAsComplete(props.item.id) }} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 mt-2 text-white bg-green-600 rounded-full ${((props.item.completed)) ? "block" : "hidden"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                    </div>
                    <div className={`flex w-full justify-between items-center ${TodoCardUI.med.color === "#bbf7d0" ? "mt-8" : ""}`}>
                        <div>
                            <p className={`text-lg font-medium ${props.bin ? "" : "hover:underline"} hover:cursor-pointer`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.title}</p>
                            <p className={`text-sm`}>{props.item.desc}</p>
                        </div>
                        <div className="options flex space-x-4">
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.DelTodo ? "block" : "hidden"}`} onClick={() => { props.DelTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.RestoreTodo ? "block" : "hidden"}`} onClick={() => { props.RestoreTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )


    }
    else {
        return (
            <>
                <div className={`border w-80 rounded-xl px-4 py-4 hover:shadow-lg ${localStorage.getItem("TodoAppMode") === "light" ? "hover:shadow-gray-200" : "hover:shadow-gray-700"}`}
                    style={{
                        backgroundColor: TodoCardUI.low.color,
                        borderColor: TodoCardUI.low.border,
                        color: TodoCardUI.low.text
                    }}>
                    <div className="flex justify-between">
                        <div className='deadline'>
                            <p className={`text-2xl font-bold ${props.bin ? "" : "hover:underline"} hover:cursor-pointer w-fit text-red-600`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.deadlineDay}, {props.item.deadlineDate}</p>
                            <p className={`text-2xl font-bold ${TodoCardUI.low.color === "#bbf7d0" ? "hidden" : "block"}`}>{props.item.deadlineTime} {props.item.deadlineTime.slice(0, 2) > 12 ? "PM" : "AM"}</p>
                        </div>
                        <div className={`completeBtn flex ${props.bin ? "hidden" : "block"}`}>
                            <input type="checkbox" name={`checkinput-${props.item.id}`} className={`w-10 h-5 mt-2 ${(!(props.item.completed)) ? "block" : "hidden"} cursor-pointer`} onClick={() => { props.MarkAsComplete(props.item.id) }} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 mt-2 text-white bg-green-600 rounded-full ${((props.item.completed)) ? "block" : "hidden"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                    </div>
                    <div className={`flex w-full justify-between items-center ${TodoCardUI.low.color === "#bbf7d0" ? "mt-8" : ""}`}>
                        <div>
                            <p className={`text-lg font-medium ${props.bin ? "" : "hover:underline"} hover:cursor-pointer`} onClick={() => { onClickHandler(`/UpdTodo/${props.item.id}`) }}>{props.item.title}</p>
                            <p className={`text-sm`}>{props.item.desc}</p>
                        </div>
                        <div className="options flex space-x-4">
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.DelTodo ? "block" : "hidden"}`} onClick={() => { props.DelTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            <div className={`border ${localStorage.getItem("TodoAppMode") === "light" ? "border-black" : "border-white"} rounded-full p-1 hover:cursor-pointer ${props.RestoreTodo ? "block" : "hidden"}`} onClick={() => { props.RestoreTodo(props.item.id) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:size-7 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )


    }
}

export default Todo