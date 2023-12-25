import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    type:"button"|"submit"|"reset";
    cls:string;
    label:string
}
const Button:React.FC<ButtonProps> = ({type,cls,label,...otherProps})=>{
    return(
        <button type={type} className={`border px-2 py-3 rounded ${cls}`} {...otherProps}>{label}</button>
    )
}

export default Button;