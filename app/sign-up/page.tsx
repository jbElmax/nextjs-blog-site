'use client'
import Link from "next/link";
import { FormEvent, useState } from "react";

const defaultFormFields = {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUp = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {username,email,password,confirmPassword} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const onSubmitHandler = async (e:FormEvent)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Password did not match");
            return;
        }

        try{
            const response =await fetch('http://localhost:8000/auth/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,email, password }),
            })
            if(!response.ok){
                if(response.status === 400){
                    alert(await response.json());
                }else{
                    alert('Unable to register user this time.')
                }
                
                
                return;
            }
            resetFormFields();
            alert('User successfully sign-up.');

        }catch(error){
            console.log(error);
        }
    }

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;

        setFormFields({...formFields,[name]:value});

    }
    return(
        <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] mx-auto">
        <form className="" onSubmit={onSubmitHandler}>
            
            <h2 className="text-xl text-gray-700 text-center mb-[10px]">Register</h2>
            <label htmlFor="username" className="mt-[20px] text-gray-700 text-sm">Username</label>
            <input onChange={onChangeHandler} id="username" name='username' type="text" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="email" className="mt-[20px] text-gray-700 text-sm">Email</label>
            <input onChange={onChangeHandler} id="email" name='email' type="text" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="password" className="mt-[20px] text-gray-700 text-sm">Password</label>
            <input onChange={onChangeHandler} id="password" name='password' type="password" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[5px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="confirmPassword" className="mt-[25px] text-gray-700 text-sm">Confirm Password</label>
            <input onChange={onChangeHandler} id="confirmPassword" name='confirmPassword' type="password" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>

            <button type="submit" className=" mt-[20px] w-full px-2 py-3 rounded border-2 border-blue-500 text-gray-700 hover:bg-lime-50">Register</button>
        </form>


        <Link href = "/auth" className="text-blue-500 flex mt-[15px] underline">                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
             </svg> Back to Login
        </Link>
    
    </div>
    )
}

export default SignUp;