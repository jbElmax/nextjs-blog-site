import Link from "next/link";
import { FormEvent } from "react";
import Button from "../common-components/button/button.component";
import Input from "../common-components/input/input.component";
import Label from "../common-components/label/label.component";

interface SignInProps{
    onSubmitHandler:(e:FormEvent)=>void;
    email:string;
    onChangeHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    password:string;

}
const SignInForm:React.FC<SignInProps> = ({onSubmitHandler,email,onChangeHandler,password})=>{
    return(
        <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] mx-auto">
            <form className="" onSubmit={onSubmitHandler}>
                <h2 className="text-xl text-gray-700 text-center mb-[10px]">Sign In</h2>
                <Label htmlFor="email" cls="mt-[20px]" text="Email"/>
                <Input id="email" name="email" type="text" value={email} onChangeHandler={onChangeHandler} cls="w-full border-gray-300 mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
                <Label htmlFor="pass" cls="mt-[20px]" text="Password"/>
                <Input id="pass" name="password" type="password" value={password} onChangeHandler={onChangeHandler} cls="w-full border-gray-300 mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>      
                <Button type="submit" cls="mt-[30px] border-green-200 w-full bg-orange-400 text-white hover:bg-orange-500" label="Sign In"/>
            </form>
        
            <p className='text-gray-700 mt-[15px]'>Does not have an account yet?<span><Link href='/sign-up' className='text-blue-500 underline'> Register</Link></span></p>
        </div>
    )
}

export default SignInForm;