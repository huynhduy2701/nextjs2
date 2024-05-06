"use client"
import { useState, MouseEvent, ChangeEvent, useEffect, useRef } from 'react';
import './stylle.scss'
import { showErrorToast, showSuccessToast } from '../erros/erros'
import { ConfirmationResult,getAuth,signInWithPhoneNumber, } from 'firebase/auth';
import {app} from './firebase'
import { useRouter } from 'next/router';
interface UserData{
    email :string,
    phone:string
}
const FindEmail=()=>{

    const [email,setEmail]= useState("")
    const [numberPhone,setNumberPhone]=useState('')
    const [getValueForm,setGetValueForm]=useState('')
    const [otp,setOtp]=useState('')
 
    const handleGetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setGetValueForm(e.target.value);
    };
   
    useEffect(()=>{
        const listUser = localStorage.getItem('listUser') 
            // Kiểm tra xem giá trị đầu vào chỉ chứa các chữ số hay không
    if (/^\d+$/.test(getValueForm)) {
        // Nếu chỉ chứa các chữ số, loại bỏ các số 0 ở đầu và thêm +84
        // const phoneNumber = getValueForm.replace(/^0+/, '+84');
        const phoneNumber = getValueForm;

        setNumberPhone(phoneNumber);
        console.log("số điện thoại : ", numberPhone);
    } else {
        // Nếu chứa kí tự không phải chữ số, coi nó là địa chỉ email
        setEmail(getValueForm);
        console.log("email : ", email);
    }
    })
   
    const handleFindEmail= async(e:MouseEvent<HTMLButtonElement>)=>{
        // console.log("So dien thoai : ",getValueForm)
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
        if(getValueForm===""){
            showErrorToast("Vui lòng nhập email hoặc số điện thoại")
            return
        }
        else if (newListUser.length>0) {
            let isChecked= false;
            newListUser.forEach((e: UserData) => {
                if (e.email === email || e.phone === numberPhone) {
                    isChecked = true;
                    console.log("Tìm thấy tài khoản người dùng");
                }
            });
            if(!isChecked){
                console.log("Nhập sai email hoặc số điện thoai");
                showErrorToast("Nhập sai email hoặc số điện thoai")
                return
            }else{
                console.log("tìm thấy người dùng");
                    const userData: UserData = {
                        email: email ,
                        phone:numberPhone
                    };
                    
                    // Đẩy user lên localStorage với tên 'mailUser'
                    localStorage.setItem('infoInputUser', JSON.stringify(userData));
                    
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
                        <label htmlFor="">Email or PhoneNumber</label>
                        <input type="text"
                         className={'email'}
                         onChange={(handleGetValue)}
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