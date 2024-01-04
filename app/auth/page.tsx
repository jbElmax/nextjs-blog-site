'use client'
import { useState, FormEvent } from 'react';
import { useUser } from '../context/user.context';
import { useRouter } from 'next/navigation';
import SignInForm from '../components/sign-in-form/sign-in-form.component';
import {parseJwt} from '../utils/helper'
import { signInUser } from '../utils/api';
const defaultField = {
    email:'',
    password:''
}

const SignIn = ()=>{

    const [formFields,setFormFields] = useState(defaultField);
    const {email,password} = formFields;
    const {loginUser} = useUser();
    const {push} = useRouter();

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;

        setFormFields({...formFields,[name]:value})
    }
    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();
        try {
            const response = await signInUser(email,password)
            
            if (response.status === 200) {

                const userData =await response.data;
                const decodedPayload = parseJwt(userData);

                const user = {
                    username:decodedPayload.userInfo.username,
                    isAdmin:decodedPayload.userInfo.isAdmin,
                    _id:decodedPayload.userInfo._id,
                    token:userData
                }

                loginUser(user);
                push('/dashboard');
            } else {

                const data = await response.data.json();
                

            }
        } catch (error) {
            console.error('Error occurred while logging in', error);

        }

    }
    return(

        <SignInForm email={email} onChangeHandler={onChangeHandler} password={password} onSubmitHandler={onSubmitHandler}/>
    
    )
}

export default SignIn;