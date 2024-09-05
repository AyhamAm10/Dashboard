import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../content/axios'
import Loading from '../components/Loading'
import Alert from '../components/Alert'

const Login = () => {
    const [loaded , setLoaded] = useState<boolean>(false)
    const [error , setError] = useState<string | null>(null)
    const [alert , setAlert] = useState< boolean>(false)
    const [data , setData] = useState<any>({})
    const [err , setErr] = useState<boolean | null>(null)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        let timeoutId:any;
        if (!isFirstRender && error) {
        setAlert(true);
        timeoutId = setTimeout(() => {
            setAlert(false);
        }, 20000);
        }

        if (isFirstRender) {
        setIsFirstRender(false);
        }
        return () => clearTimeout(timeoutId);
    }, [error, isFirstRender]);

    const handleChang = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data , [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        setLoaded(true)
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, data,{
                withCredentials:true
            })
            console.log(res)
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('f_name', res.data.f_name);
            localStorage.setItem('l_name', res.data.l_name);
            setLoaded(false)
            setErr(false)
            setError("login success ")
            navigate('/')
        } catch (error:any) {
            console.log(error)
            setError("Error: " + error.message)
            setErr(true)

        } finally{
            setLoaded(false)
        }
    }

  return (
    <motion.div 
    initial={{y:'-110vh' , opacity:0}}
    animate={{y:0 , opacity:1}}
    transition={{
      type: "spring",
      stiffness: 100 ,
      duration: 0.2
    }}
    >
       {!loaded ? <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
            inventore quaerat mollitia?
            </p>

            <form action="#" onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Sign in to your account</p>

            <div>
                <label htmlFor="email" className="sr-only">Email</label>

                <div className="relative">
                <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    name='email'
                    onChange={handleChang}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                    </svg>
                </span>
                </div>
            </div>

            <div>
                <label htmlFor="password" className="sr-only">Password</label>

                <div className="relative">
                <input
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    name='password'
                    onChange={handleChang}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    </svg>
                </span>
                </div>
            </div>

            <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium bg-green  "
            >
                Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
                No account?
                <Link to={'/regaster'}>
                <a className="underline" href="">Sign up</a>
                </Link>

            </p>
            </form>
        </div>
        </div>
        :
        <div className=' h-screen'>
        <Loading />
        </div>
    }
    {
        alert && <Alert msg={error} error={err} />
    }
    </motion.div>
  )
}

export default Login