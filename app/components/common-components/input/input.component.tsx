interface InputProps{
    value:string | undefined;
    cls:string;
    id:string;
    onChangeHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type:string;
    name:string;
    placeholder?:string;
}

const Input:React.FC<InputProps> = ({id,name,type,value,onChangeHandler,cls,placeholder}) =>{
    return(
        <input id={id} name={name} type={type} value={value} onChange={onChangeHandler} className={`px-2 py-2 border-2 rounded ${cls}`} placeholder={placeholder}/>
    )
}

export default Input;