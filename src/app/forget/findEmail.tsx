"use client"
import { useState ,MouseEvent } from 'react'
import './stylle.scss'
import { useRouter } from 'next/router'
import { showErrorToast, showSuccessToast } from '../erros/erros'
interface UserData{
    email :string
}
const FindEmail=()=>{

    const [email,setEmail]= useState("")
    const handleFindEmail= async(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const listUser = localStorage.getItem('listUser')
        const newListUser: UserData[] = listUser ? JSON.parse(listUser) : [];
        console.log(email);
        const respone = await fetch ('./config',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                subject: "Your subject here", // Define or initialize subject
                message: "Your message here"  // Define or initialize message
            })
        })
        if(email===""){
            showErrorToast("Vui lòng nhập email")
            return
        }
        else if (newListUser.length>0) {
            let isChecked= false;
            newListUser.forEach((e: UserData) => {
                if (e.email === email) {
                    isChecked = true;
                    console.log("Có tài khoản người dùng");
                }
            });
            if(!isChecked){
                console.log("Nhập sai email");
                showErrorToast("Nhập sai email")
                return
            }else{
                console.log("tìm thấy người dùng");
            //   try {
                
            //   } catch (error) {
            //     console.log(error);
            //   }
                // Tạo biến user
                // let user = {
                    //     email: email
                    // }
                    
                    const userData: UserData = {
                        email: email 
                    };
                    
                    // Đẩy user lên localStorage với tên 'mailUser'
                    localStorage.setItem('mailUser', JSON.stringify(userData));
                    
                    // Redirect tới trang nhập mã code
                    // router.push("/forget/inputCode");
                showSuccessToast("Tìm thấy người dùng")
                setTimeout(()=>{

                    window.location.href="/forget/inputCode"
                },2000)
            }
        }
    }
    return (
        <div>
            <div className="container--forget">
                <div className="forget__form">
                    <div className="forget__inputMail">
                        <label htmlFor="">Email</label>
                        <input type="text"
                         className={'email'}
                         onChange={(e)=>setEmail(e.target.value)}
                         placeholder="Nhập email để tìm kím người dùng" />
                    </div>
                    <div className="form__button">
                        <div className="form__btnFindEmail">
                            <button onClick={handleFindEmail}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FindEmail