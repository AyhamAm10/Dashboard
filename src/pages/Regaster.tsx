import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {apiUrl} from '../content/axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../componants/Loading'
import Alert from '../componants/Alert'
const Regaster = () => {

    const [loaded , setLoaded] = useState(false)
    const [error , setError] = useState(null)
    const [alert , setAlert] = useState(false)
    const [data , setData] = useState({})
    const [err , setErr] = useState(null)
    const [isFirstRender, setIsFirstRender] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        let timeoutId;

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

    const handleChang = (e)=>{
        setData({...data , [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(data.password == data.password2){
            setLoaded(true)
            try {
                console.log(data)
                const res = await axios.post(`${apiUrl}/auth/register` , {
                    ferstName : data.ferstName,
                    lastName : data.lastName ,
                    email : data.email,
                    password : data.password
                },{
                    withCredentials: true
                })
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('f_name', res.data.f_name);
                localStorage.setItem('l_name', res.data.l_name);
                console.log(res)
                setLoaded(false)
                setErr(false)
                setError("login success ")
                navigate('/')
            } catch (error) {
                console.log(error)
                setError("Error: " + error.message)
                setErr(true)
            } finally{
                setLoaded(false)
            }
        }else{
            setErr(true)
            setError("Please enter a similar password.")
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
        <section className="bg-ofwhite dark:bg-gray-900 relative">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
                alt=""
                src={logo}
                className="absolute inset-0 h-full w-full object-cover"
            />
            </aside>

            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
                

                <h1 className="flex items-center flex-center mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to AyhamAM10 
                
                </h1>
                <form 
                action="#" 
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                    First Name
                    </label>

                    <input
                    type="text"
                    id="FirstName"
                    name="ferstName"
                    onChange={handleChang}
                    className="mt-1 px-3 py-2 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                    Last Name
                    </label>

                    <input
                    type="text"
                    id="LastName"
                    name="lastName"
                    onChange={handleChang}
                    className="mt-1 px-3 py-2 w-full rounded-md bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                    </label>

                    <input
                    type="email"
                    id="Email"
                    name="email"
                    onChange={handleChang}
                    className="mt-1 px-3 py-2 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                    Password
                    </label>

                    <input
                    type="password"
                    id="Password"
                    name="password"
                    onChange={handleChang}
                    className="mt-1 px-3 py-2 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                    Password Confirmation
                    </label>

                    <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password2"
                    onChange={handleChang}
                    className="mt-1 px-3 py-2 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>

                <div className="col-span-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 px-3 py-2 rounded-md  bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        I want to receive emails about events, product updates and company announcements.
                    </span>
                    </label>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium bg-green text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                    >
                    Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                    Already have an account?
                    <Link to={'/login'}>
                    <a href="#" className="text-gray-700 underline dark:text-gray-200">Log in</a>
                    </Link>.
                    </p>
                </div>
                </form>
            </div>
            </main>
           
        </div>
        <div className=' absolute  right-10 top-10'>
            {
                alert && <Alert error={err} msg={error}  />
            }
        </div>
        </section>
    </motion.div>
  )
}

export default Regaster