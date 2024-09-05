import React, { Suspense, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

const AuthProvider:React.FC<React.ReactNode> = ({children}) => {
  const [isFirstFetsh,setIsFirstFetsh]=useState(true)
//   const dispatch = useDispatch()

//   const loading = useSelector(state => state.user.loading)
//   loading  &&  dispatch(getUser())
//  const status = useSelector(state => state.user.status)
//  const auth = useSelector(state => state.user.auth)
 if((status === 'failure')&& !auth &&isFirstFetsh){
  axiosConfig.get('api/auth/token',{withCredentials:true}).then(res =>{
    const {accessToken}=res.data.data
    localStorage.setItem('accessToken',accessToken)
    // dispatch(getUser())
  }).catch(err => console.log(err))
  setIsFirstFetsh(false)
 }
  const PageContent = useMemo(() => {
    return !auth ? (
      <div className="App flex">
      <Routes>
         <Route  path='/login' element={<Account />}/>
         <Route path='/forgetPassword/:tokenId' element={<ForgetPassword/>}/>
         <Route path="*" element={<Account/>}/>
         
      
       </Routes>
       <ToastContainer/>
      </div>
    ) : (
      children
    );
  }, [auth]);


  return  status === 'loading'? <div className="loading_auth"> <span className="loader_auth"></span> </div> 
  :PageContent
};

export default AuthProvider;