interface InputProps{
    value:string;
    cls:string;
    id:string;
    onChangeHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type:string;
    name:string;
}

const Input:React.FC<InputProps> = ({id,name,type,value,onChangeHandler,cls}) =>{
    return(
        <input id={id} name={name} type={type} value={value} onChange={onChangeHandler} className={`px-2 py-2 border-2 rounded ${cls}`}/>
    )
}

export default Input;