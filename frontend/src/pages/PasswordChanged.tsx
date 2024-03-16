import {useNavigate} from "react-router-dom";
import { useEffect } from 'react'


export default function PasswordChanged() {
    const nav = useNavigate();
    useEffect(()=>{ 
            setTimeout(()=> nav('/sign-in'),4000);
            
    },[])

   
    return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-24 my-12">
        {/** Password Changed Confirmation Text */}
       
        
        <div className="text-2xl md:text-4xl lg:6xl font-bold text-center text-black">
            Your Password was Successfully Changed!
        </div>
      
        <div className="text-error text-xl">
        Redirecting you to the sign in page in 3 seconds...
        </div>  
    </div>
    );

}





