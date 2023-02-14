import react from 'react'
// outlet has  been used  for handle component
import {Navigate, Outlet} from 'react-router-dom'

const PrivateComponent = ()=>{
    const auth=localStorage.getItem('user')

   return (auth?  <Outlet/> : <Navigate to="/signup"/> 

   );
}
export default PrivateComponent;