import { useEffect, useState } from "react";
import context from "./ContextInit";

const ContextState = (props) => {
    const [Mode, setMode] = useState("light");
    const [DisplayLight, setDisplayLight] = useState(true);
    const [DisplayDark, setDisplayDark] = useState(false);
    const [CardBg, setCardBg] = useState("#F9FAFB");
    const [CardClr, setCardClr] = useState("#212731");
    const [TodoNavBdr, setTodoNavBdr] = useState("black");
    const [FormUI, setFormUI] = useState({bg:"#F9FAFB",text:"#1F2937",border:"#D1D5DB",FocBdr:"#B8BDC6"});
    const [SideNavUI, setSideNavUI] = useState({bg:"#374151",text:"white",btnbdr:"white"});
    const [HomeBtmFrmBdr, setHomeBtmFrmBdr] = useState("#212731");
    const [SideNavLft, setSideNavLft] = useState(0)
    const ToggleToDark = () => {
        document.body.style.backgroundColor = "#121212"
        document.body.style.color="#F3F4F6";
        setCardBg("#1A1A1A");
        setCardClr("#F3F4F6");
        setTodoNavBdr("white");
        setFormUI({
            bg:"#1E1E1E",
            text:"#E5E5E5",
            border:"#4A4A4A",
            FocBdr:"#B8BDC6"
        })
        setSideNavUI({
            bg:"#121212",text:"white",btnbdr:"white"
        })
        setHomeBtmFrmBdr("#F3F4F6")
    }
    const ToggleToLight = () => {
        document.body.style.backgroundColor = "#F3F4F6";
        document.body.style.color="black";
        setCardBg("#F9FAFB");
        setCardClr("#212731");
        setTodoNavBdr("black");
        setFormUI({
            bg:"#F9FAFB",
            text:"#1F2937",
            border:"#D1D5DB",
            FocBdr:"#B8BDC6"
        })
        setSideNavUI({bg:"#374151",text:"white",btnbdr:"white"});
        setHomeBtmFrmBdr("#212731")
    }
    const ToogleMode = () => {
        if (Mode === "light") {
            ToggleToDark();
            setDisplayLight(false);
            setDisplayDark(true);
            setMode("dark");
            localStorage.setItem("TodoAppMode", "dark");
        }
        else {
            ToggleToLight();
            setDisplayLight(true);
            setDisplayDark(false);
            setMode("light");
            localStorage.setItem("TodoAppMode", "light");
        }
    }
    useEffect(() => {
        if (!(localStorage.getItem("TodoAppMode"))) {
            localStorage.setItem("TodoAppMode", "light");
            setMode("TodoAppMode", "light");
        }
        else {
            if ((localStorage.getItem("TodoAppMode")) === "light") {
                ToggleToLight();
                setDisplayLight(true);
                setDisplayDark(false);
                setMode("light");
            }
            else {
                ToggleToDark();
                setDisplayLight(false);
                setDisplayDark(true);
                setMode("dark");
            }
        }
    }, [])
    window.addEventListener('resize',()=>{
        if (window.outerWidth<1025){
            setSideNavLft("-10rem")
        }
        else{
            setSideNavLft("0rem")
        }
    })
    
    return (
        <context.Provider value={
            {
                ToogleMode,
                DisplayLight,
                DisplayDark,
                CardBg,
                CardClr,
                TodoNavBdr,
                FormUI,
                SideNavUI,
                HomeBtmFrmBdr,
                SideNavLft,
                setSideNavLft
            }
        }>
            {props.children}
        </context.Provider>
    )
}

export default ContextState