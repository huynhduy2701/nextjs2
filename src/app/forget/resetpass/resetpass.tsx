"use client"
import { useEffect, useState } from "react";
import './style.scss'
import { showErrorToast, showSuccessToast } from "@/app/erros/erros";
interface UserData {
    email: string;
    password: string;
    emailStore:string;
    oldPass:string
}

const ResetPass = () => {
    const [inputPass, setInputPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [emailStore,setEmailStore]=useState('');
    const [oldPassword, setOldPassword] = useState(""); 
    // const listUser = localStorage.getItem('listUser')
    // const NewlistUser = listUser ? JSON.parse(listUser) : '';
    const [listUser, setListUser] = useState<UserData[]>([]);
    useEffect(()=>{

        const getEmailCheck = localStorage.getItem('mailUser');
        const mailUser = getEmailCheck ? JSON.parse(getEmailCheck) : '';
        setEmailStore(mailUser.email);

        const listUserJson = localStorage.getItem('listUser');
        const userList = listUserJson ? JSON.parse(listUserJson) : [];
        setListUser(userList);
        const user = userList.find((user:UserData) => user.email === mailUser.email);
        if (user) {
          setOldPassword(user.password);
        }


    },[])
    const handleUpdate = () => {
        if(inputPass===""||confirmPass===""){
            showErrorToast("Vui lòng nhập password")
        }
        else if(inputPass.length <6){
            showErrorToast("Mật khẩu phải hơn 6 kí tự")

        }
        else if(inputPass!==confirmPass){
            showErrorToast("Mật khẩu chưa trùng khớp")

        }
        else if (oldPassword === inputPass) {
            showErrorToast("Bạn đang nhập mật khẩu cũ");
          } 
        else if (listUser.length > 0) {
            const updatedListUser = listUser.map(user => {
                if (user.email === emailStore) {
                    return {
                        ...user,//mai trả bài
                        password: inputPass // Cập nhật mật khẩu mới
                    };
                }
                return user;
            });
            localStorage.setItem('listUser', JSON.stringify(updatedListUser));
            console.log('Cập nhật mật khẩu thành công!');
            showSuccessToast("Cập nhật mật khẩu thành công")
            setTimeout(()=>{
                localStorage.removeItem("mailUser")
                window.location.href="/Login"
            },2000)
        }
     
    }

    return (
        <div className="resetPass">
            <div className="container">
                <div className="resetPass__wrap">
                    <div className="resetPass__formReset">
                        <div className="resetPass__formInput">
                            <label htmlFor="">Nhập mật khẩu mới</label>
                            <input type="text" placeholder="Nhập mật khẩu mới" onChange={(e) => setInputPass(e.target.value)} />
                            <input type="text" placeholder="Nhập lại mật khẩu mới" onChange={(e) => setConfirmPass(e.target.value)} />
                        </div>
                        <div className="resetPass__button">
                            <div className="resetPass__btnReset">
                                <button onClick={handleUpdate}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;
