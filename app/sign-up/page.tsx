'use client'

import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { signUpUser } from "../utils/api";
import Label from "../components/common-components/label/label.component";
import Input from "../components/common-components/input/input.component";
import Button from "../components/common-components/button/button.component";
import Link from "next/link";


const defaultFormFields = {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUp = ()=>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {username,email,password,confirmPassword} = formFields;
    const {push} = useRouter();
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
            const response =await signUpUser(username,email,password);
            
            if(response.status === 200){
                alert("You successfully registered");
                push('/auth')
            }else{
                alert('Unable to register user this time.')
                resetFormFields();
                
            }
                
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
            <Label htmlFor="username" cls="mt-[20px]" text="Username"/>
            <Input onChangeHandler={onChangeHandler} id="username" name='username' value={username} type="text" cls="w-full border-gray-200 mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <Label htmlFor="email" cls="mt-[20px]" text="Email"/>
            <Input onChangeHandler={onChangeHandler} id="email" name='email' value={email} type="text" cls="w-full border-gray-200 mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <Label htmlFor="password" cls="mt-[20px]" text="Password"/>
            <Input onChangeHandler={onChangeHandler} id="password" name='password' value={password} type="password" cls="w-full border-gray-200 mt-[10px] mb-[5px] focus:outline-none focus:ring focus:ring-green-300"/>
            <Label htmlFor="confirmPassword" cls="mt-[25px]" text="Confirm Password"/>
            <Input onChangeHandler={onChangeHandler} id="confirmPassword" name='confirmPassword' value={confirmPassword} type="password" cls="w-full border-gray-200 mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>

            <Button type="submit" cls=" mt-[20px] bg-white w-full border-orange-500 text-gray-700 hover:bg-orange-400 hover:text-white" label="Register"/>
        </form>


        <Link href = "/auth" className="text-blue-500 flex mt-[15px] underline">                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
             </svg> Back to Login
        </Link>
    
    </div>
    )
}

export default SignUp;