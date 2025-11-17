import type { ReactElement } from "react"


interface ButtonProps {
    variant: "primary" | "secondary",
    title: string,
    startIcon?: string | ReactElement,
    onClick?: () => void,
    fullWidth?: boolean,
    loading?: boolean
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-500"
}

const defaulStyle = "rounded-md flex items-center font-light px-4 py-2"



export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={` ${variantStyles[props.variant]} ${defaulStyle} ${props.fullWidth ? "w-full flex justify-center" : ""} ${props.loading? "opacity-45" : ""}`} disabled={props.loading}>
        <div className="pr-2">
            {props.startIcon}
        </div>
            {props.title}
           
        

    </button>
}            