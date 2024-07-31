'use client'
import { z } from 'zod';
import React, { useState } from 'react'
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Alert from '../components/Alert';
import { Respond } from '../components/Interface';

const schema = z.object({
  username: z.string().email(),
  password: z.string().min(6, { message: "Password must contain at least 6 characters" })
});

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [signupStatus, setSignupStatus] = useState('off');

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {

    //console.log(data);
    setSignupStatus('wait');

    const response = await fetch(`https://yuchen-react-proj.azurewebsites.net/signup/?username=${data.username}&password=${data.password}`);
    const res: Respond = await response.json();

    //console.log(res.status, res.message);
    if (res.status == 'error') {
      setSignupStatus('invalid');
    }
    else {
      setSignupStatus('success');
      setTimeout(() => {
        router.push('/api/auth/signin');
      }, 3000);
    }

  }

  return (
    <div className='flex justify-center'>
      <div className="flex flex-col items-center mt-6">

        <h1 className='p-4 font-bold text-xl'>Create an Account</h1>

        <label className="input input-bordered flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input {...register('username')} type="text" className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input {...register('password')} type="password" className="grow" placeholder="password" />
        </label>

        <button className="btn btn-primary mt-5 mb-5" onClick={handleSubmit(onSubmit)}>Primary</button>

        {errors.username && <Alert message={errors.username.message!}/>}

        {errors.password && <Alert message={errors.password.message!}/>}

        {signupStatus == 'wait' && <Alert message='Checking username'/>}

        {signupStatus == 'invalid' && <Alert message='Username already exists'/>}

        {signupStatus == 'success' && <Alert message='User created successfully, redirecting to the login page'/>}

      </div>
    </div>
  )
}

export default SignUpPage
