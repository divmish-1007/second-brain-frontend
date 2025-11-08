
type variants = "primary" | "secondary"
interface ButtonProps{
    variant: variants,
    size: "sm" | "md" | "lg",
    text: string,
    startIcon: any,
    endIcon:any,
    onClick: () => void     
}

const variantStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
}

const defaulStyle = "rounded-md flex"

const sizeStyle = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export const Button = (props:ButtonProps) => {
    return <button className={` ${variantStyles[props.variant]} ${defaulStyle} ${sizeStyle[props.size]}`}>
        {props.startIcon} {props.text} {props.endIcon}
    </button>
}