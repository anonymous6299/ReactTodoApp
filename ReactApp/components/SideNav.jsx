import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import context from "../ContextAPI/ContextInit";
const SideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const Context = useContext(context);
    const { SideNavUI, SideNavLft , setSideNavLft} = Context;
    return (
        <>
            <div className={`flex flex-col w-fit h-[100vh] px-8 py-10 justify-between z-20 relative max-[1368px]:px-4 ${localStorage.getItem("TodoAppMode") === "dark" ? "border border-l-0 border-t-0 border-b-0" : "border-0"} max-[1025px]:absolute transition-all `} style={{ backgroundColor: SideNavUI.bg, color: SideNavUI.text, left: SideNavLft }} id="SideNav">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-10 mx-auto hidden max-[1025px]:block" onClick={()=>{setSideNavLft("-10rem")}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <button className={`h-28 w-32 flex flex-col items-center max-[1140px]:h-20 max-[1140px]:w-28 justify-center hover:border-2 ${location.pathname === "/" ? "border-2 " : "opacity-50 border-0"}`} onClick={() => { navigate("/") }} style={{ borderColor: SideNavUI.btnbdr }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    <p>Home</p>
                </button>
                <button className={`h-28 w-32 flex flex-col items-center max-[1140px]:h-20 max-[1140px]:w-28 justify-center hover:border-2 ${location.pathname === "/AllTodos" ? "opacity-100 border-2" : "opacity-50"}`} onClick={() => { navigate("/AllTodos") }} style={{ borderColor: SideNavUI.btnbdr }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    <p>Todos</p>
                </button>
                <button className={`h-28 w-32 flex flex-col items-center max-[1140px]:h-20 max-[1140px]:w-28 justify-center hover:border-2 ${location.pathname === "/addTodo" ? "opacity-100 border-2" : "opacity-50"}`} onClick={() => { navigate("/addTodo") }} style={{ borderColor: SideNavUI.btnbdr }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p>Add</p>
                </button>
                <button className={`h-28 w-32 flex flex-col items-center max-[1140px]:h-20 max-[1140px]:w-28 justify-center ${location.pathname === "/bin" ? "opacity-100 border-2" : "opacity-50 hover:border-2"}`} onClick={() => { navigate("/bin") }} style={{ borderColor: SideNavUI.btnbdr }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    <p>Bin</p>
                </button>
            </div>
        </>
    )
}

export default SideNav