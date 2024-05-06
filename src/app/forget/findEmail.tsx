"use client"
import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import './stylle.scss'
import { useRouter } from 'next/router'
import { showErrorToast, showSuccessToast } from '../erros/erros'
interface UserData{
    email :string,
    numberPhone:string
}
const FindEmail=()=>{

    const [email,setEmail]= useState("")
    const [numberPhone,setNumberPhone]=useState('')
    const [getValueForm,setGetValueForm]=useState('')
    const handleGetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setGetValueForm(e.target.value);
    };
    useEffect(()=>{
        const listUser = localStorage.getItem('listUser') 
    })
    const handleFindEmail= async(e:MouseEvent<HTMLButtonElement>)=>{
        console.log("So dien thoai : ",getValueForm)
        e.preventDefault();
         // Kiểm tra xem giá trị đầu vào chỉ chứa các chữ số hay không
    if (/^\d+$/.test(getValueForm)) {
        // Nếu chỉ chứa các chữ số, loại bỏ các số 0 ở đầu và thêm +84
        const phoneNumber = getValueForm.replace(/^0+/, '+84');
        setNumberPhone(phoneNumber);
        console.log("email : ", numberPhone);
    } else {
        // Nếu chứa kí tự không phải chữ số, coi nó là địa chỉ email
        setEmail(getValueForm);
        console.log("email : ", email);
    }
       
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
                    const userData: UserData = {
                        email: email ,
                        numberPhone:numberPhone
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