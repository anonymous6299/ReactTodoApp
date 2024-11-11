
const Toast = ({props}) => {
    return (
        <>
            <div className={`h-fit py-3 w-fit mx-40 rounded-md absolute -right-32 bottom-6 z-10 ${props.display?"block":"hidden"}`}
            style={{
                background:props.bg,
                border:`1px solid ${props.border}`,
                color:props.text
            }}>
                <div className="toastBody flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-12 rounded-full mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d={props.icon} />
                        </svg>
                    <div className=" mr-10">
                        <p className="text-xl font-bold">{props.heading}!</p>
                        <p>{props.desc}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -mt-10 mr-2 cursor-pointer" onClick={props.close}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Toast