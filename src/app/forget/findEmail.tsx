"use client"
import { useState } from 'react'
import './stylle.scss'
import { useRouter } from 'next/router'
interface UserData{
    email :string
}
const FindEmail=()=>{
    const [email,setEmail]= useState("")
    const handleFindEmail=()=>{
        const listUser = localStorage.getItem('listUser')
        const newListUser: UserData[] = listUser ? JSON.parse(listUser) : [];
        console.log(email);
        if (newListUser.length>0) {
            let isChecked= false;
            newListUser.forEach((e: UserData) => {
                if (e.email === email) {
                    isChecked = true;
                    console.log("Có tài khoản người dùng");
                }
            });
            if(!isChecked){
                console.log("Nhập sai email");
                return
            }else{
                console.log("tìm thấy người dùng");
                
                // Tạo biến user
                let user = {
                    email: email
                }

                // Đẩy user lên localStorage với tên 'mailUser'
                localStorage.setItem('mailUser', JSON.stringify(user));

                // Redirect tới trang nhập mã code
                // router.push("/forget/inputCode");
                window.location.href="/forget/inputCode"
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
                            <button onClick={()=>{handleFindEmail()}}>Tìm người dùng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FindEmail