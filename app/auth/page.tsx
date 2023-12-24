'use client'
import { useState, FormEvent } from 'react';
import { useUser } from '../context/user.context';
import { useRouter } from 'next/navigation';
import SignInForm from '../components/sign-in-form/sign-in-form.component';
import {parseJwt} from '../utils/helper'

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

                const userData =await response.json();
                const decodedPayload = parseJwt(userData);

                const user = {
                    username:decodedPayload.userInfo.username,
                    isAdmin:decodedPayload.userInfo.isAdmin,
                    _id:decodedPayload.userInfo._id
                }

                loginUser(user);
                push('/dashboard');
            } else {

                const data = await response.json();
                console.error(data);

            }
        } catch (error) {
            console.error('Error occurred while logging in', error);

        }

    }
    return(

        <SignInForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmitHandler={onSubmitHandler}/>
    
    )
}

export default SignIn;