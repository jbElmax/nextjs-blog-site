'use client'
import { useState, FormEvent } from 'react';
import { useUser } from '../context/user.context';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignIn = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useUser();
    const {push} = useRouter();
    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirect to the dashboard or any other protected route upon successful login
                const userData =await response.json();
                loginUser(userData);
                push('/dashboard');
            } else {
                // Handle login failure, show error message to the user
                const data = await response.json();
                console.error(data);
                // Update your state to show an error message on the login form
            }
        } catch (error) {
            console.error('Error occurred while logging in', error);
            // Update your state to show an error message on the login form
        }

    }
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
                <button type="button" className="border-2 border-blue-500 mt-[20px] w-full px-2 py-3 rounded  text-gray-700 hover:bg-lime-50">Sign In w/ Google</button>

                <p className='text-gray-700 mt-[10px]'>Does not have an account yet?<span><Link href='/sign-up' className='text-blue-500 underline'> Register</Link></span></p>
            </div>

    
    )
}

export default SignIn;