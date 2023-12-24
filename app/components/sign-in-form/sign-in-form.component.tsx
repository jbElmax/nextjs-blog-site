import Link from "next/link";
import { FormEvent } from "react";

interface SignInProps{
    onSubmitHandler:(e:FormEvent)=>void;
    email:string;
    setEmail:React.Dispatch<React.SetStateAction<string>>;
    password:string;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
}
const SignInForm:React.FC<SignInProps> = ({onSubmitHandler,email,setEmail,password,setPassword})=>{
    return(
        <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] mx-auto">
        <form className="" onSubmit={onSubmitHandler}>
            <h2 className="text-xl text-gray-700 text-center mb-[10px]">Sign In</h2>
            <label htmlFor="email" className="mt-[20px] text-gray-700 text-sm">Email</label>
            <input id="email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full px-2 py-2 border-2 border-gray-300 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="pass" className="mt-[20px] text-gray-700 text-sm">Password</label>
            <input id="pass" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-2 py-2 border-2 border-gray-300 rounded mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <button type="submit" className="border mt-[20px] w-full px-2 py-3 rounded bg-blue-500 text-white hover:bg-blue-600">Sign In</button>
        </form>
        {/* <button type="button" className="border-2 border-blue-500 mt-[20px] w-full px-2 py-3 rounded  text-gray-700 hover:bg-lime-50">Sign In w/ Google</button> */}

        <p className='text-gray-700 mt-[10px]'>Does not have an account yet?<span><Link href='/sign-up' className='text-blue-500 underline'> Register</Link></span></p>
    </div>
    )
}

export default SignInForm;