"use client"
import { useState } from "react";

interface UserData {
    email: string;
    password: string;
}

const ResetPass = () => {
    const [inputPass, setInputPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    const handleUpdate = () => {
        const getEmailCheck = localStorage.getItem('mailUser');
        const mailUser = getEmailCheck ? JSON.parse(getEmailCheck) : '';

        // Lấy danh sách người dùng từ local storage
        const listUserString = localStorage.getItem('listUser');
        const userList: UserData[] = listUserString ? JSON.parse(listUserString) : [];

        // Tìm kiếm email trong danh sách người dùng
        const userToUpdate = userList.find(user => user.email === mailUser);
        console.log(userToUpdate);
        // console.log(object);
        if (userToUpdate) {
            // Nếu tìm thấy email trong danh sách người dùng, kiểm tra mật khẩu
            if (inputPass === confirmPass) {
                // Nếu mật khẩu nhập lại khớp, cập nhật mật khẩu cho tài khoản đó
                userToUpdate.password = inputPass;

                // Lưu lại danh sách người dùng đã được cập nhật vào local storage
                localStorage.setItem('listUser', JSON.stringify(userList));

                // Thực hiện các hành động khác sau khi cập nhật mật khẩu thành công
                // Ví dụ: hiển thị thông báo, chuyển hướng trang, vv.
                console.log('Mật khẩu đã được cập nhật thành công!');
            } else {
                // Xử lý trường hợp mật khẩu nhập lại không khớp
                console.log('Mật khẩu nhập lại không khớp!');
            }
        } else {
            // Xử lý trường hợp không tìm thấy email trong danh sách người dùng
            console.log('Email không tồn tại trong hệ thống!');
        }
    }

    return (
        <div className="resetPass">
            <div className="container">
                <div className="resetPass__wrap">
                    <div className="resetPass__formReset">
                        <div className="resetPass__formInput">
                            <label htmlFor="">Nhập mật khẩu mới</label>
                            <input type="password" placeholder="Nhập mật khẩu mới" onChange={(e) => setInputPass(e.target.value)} />
                            <input type="password" placeholder="Nhập lại mật khẩu mới" onChange={(e) => setConfirmPass(e.target.value)} />
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
