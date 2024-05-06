"use client"
import { useEffect, useState } from "react";
import './style.scss'
import { showErrorToast, showSuccessToast } from "@/app/erros/erros";
interface UserData {
    email: string;
    emailStore: string;
    phone: string; // Thêm trường phone
    oldPass: string;
}

const ResetPass = () => {
    const [inputPass, setInputPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [emailStore, setEmailStore] = useState('');
    const [oldPassword, setOldPassword] = useState("");
    const [listUser, setListUser] = useState<UserData[]>([]);

    useEffect(() => {
        const getEmailCheck = localStorage.getItem('infoInputUser');
        const userData = getEmailCheck ? JSON.parse(getEmailCheck) : null;

        if (userData) {
            setEmailStore(userData.email);
            const listUserJson = localStorage.getItem('listUser');
            const userList = listUserJson ? JSON.parse(listUserJson) : [];
            setListUser(userList);
            const user = userList.find((user: UserData) => {
                // Kiểm tra nếu userData chứa trường phone, tìm kiếm bằng phone, ngược lại tìm kiếm bằng email
                return userData.phone ? user.phone === userData.phone : user.email === userData.email;
            });
            if (user) {
                setOldPassword(user.password);
            }
        }
    }, []);

    const handleUpdate = () => {
        if (inputPass === "" || confirmPass === "") {
            showErrorToast("Vui lòng nhập password");
        } else if (inputPass.length < 6) {
            showErrorToast("Mật khẩu phải hơn 6 kí tự");
        } else if (inputPass !== confirmPass) {
            showErrorToast("Mật khẩu chưa trùng khớp");
        } else if (oldPassword === inputPass) {
            showErrorToast("Bạn đang nhập mật khẩu cũ");
        } else if (listUser.length > 0) {
            const updatedListUser = listUser.map(user => {
                if ((user.email === emailStore && !user.phone) || (user.phone === emailStore && user.phone)) {
                    return {
                        ...user,
                        password: inputPass
                    };
                }
                return user;
            });
             // Cập nhật danh sách người dùng trong localStorage
            localStorage.setItem('listUser', JSON.stringify(updatedListUser));

            // Cập nhật danh sách người dùng trong state
            setListUser(updatedListUser);

            showSuccessToast("Cập nhật mật khẩu thành công");
            setTimeout(() => {
                localStorage.removeItem("infoInputUser");
                window.location.href = "/Login";
            }, 2000);
        }
    };

    return (
        <div className="resetPass">
            <div className="container">
                <div className="resetPass__wrap">
                    <div className="resetPass__formReset">
                        <div className="resetPass__formInput">
                            <label htmlFor="">Nhập mật khẩu mới</label>
                            <input type="password" placeholder="Nhập mật khẩu mới" value={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                            <input type="password" placeholder="Nhập lại mật khẩu mới" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
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
    );
};

export default ResetPass;
