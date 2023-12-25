interface LabelProps{
    htmlFor:string;
    cls:string;
    text:string;
}
const Label:React.FC<LabelProps> = ({htmlFor,text,cls})=>{
    return(
        <label htmlFor={htmlFor} className={`text-gray-700 text-sm ${cls}`}>{text}</label>
    )
}

export default Label;