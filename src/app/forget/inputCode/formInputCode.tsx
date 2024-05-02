'use client'
import { useState } from 'react'
import './style.scss'
import { useRouter } from 'next/navigation'
const FormInputCode =()=>{
    const [inputCode,setInputCode]= useState('')
    // const router = useRouter();
    const handleInputCode =()=>{
        if(!inputCode){
            console.log("chưa nhập mã");
        }else{
            console.log("nhập mã thành công");
            window.location.href="/forget/resetpass"
        }
    }
    return (
        <div className='formInputCode'>
            <div className='container'>
                <div className='formInputCode__wrapp'>
                   <div className='formInputCode__formInput'>
                         <label htmlFor=""> nhập code</label>
                        <input type="text" className='inputCode'
                        onChange={(e)=>setInputCode(e.target.value)} placeholder='Vui lòng nhập mã code ' />
                   </div>
                   <div className='formInputCode__button'>
                        <div className='formInputCode__btnInputCode'>
                            <button onClick={handleInputCode}>Submit</button>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    )
}
export default  FormInputCode