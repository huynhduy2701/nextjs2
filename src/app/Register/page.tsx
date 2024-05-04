'use client'
import CarouselNav from "@/components/carousel";
import Link from 'next/link';
import '../Login/style.scss';
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../erros/erros";
import { ToastContainer } from "react-toastify";
import { redirect, useRouter } from 'next/navigation'
import { message } from "antd";
import TitlePage from "@/components/titlepage";
import './style.scss'

interface UserData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    // useEffect(()=>{
    //     const checkToken = localStorage.getItem("token");
    //       console.log("kt",checkToken);
    //       if(checkToken){
    //         router.push("/", { scroll: false })
    //       }else{
    //         window.location.href="/Register"
    
    //       }
          
    //   },[])
    const handleRegister = async () => {
        const rolePhone = /^0\d{9}[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]*$/
        const roleName = /^[a-zA-Z\s]{4,}$/
        const roleGmail = /^[\w.]+@gmail\.com$/
        const regexMatKhau = /^\S{6,}$/;
        const newErrors = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        type Validation = {
            field?: string;
            test: (value: string, values?: Record<string, string>) => boolean;
            message: string;
        };

        const validations: Validation[] = [
            {
                field: 'firstName',
                test: value => value === '',
                message: 'không được để trống'
            },
            {
                field: 'firstName',
                test: value => !roleName.test(value),
                message: 'Ho phải chứa chỉ chữ cái, phải hơn 3 ký tự.'
            },
            {
                field: 'lastName',
                test: value => !roleName.test(value),
                message: 'Ten phải chứa chỉ chữ cái, phải hơn 3 ký tự.'
            },
            {
                field: 'phone',
                test: value => !rolePhone.test(value),
                message: 'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0..'
            },
            {
                field: 'email',
                test: value => !roleGmail.test(value),
                message: "Email phải là một địa chỉ Gmail hợp lệ 'vd:abc@gmail.com'."
            },
            {
                field: 'password',
                test: value => !regexMatKhau.test(value),
                message: 'Mật khẩu phải có ít nhất 6 ký tự và không được chứa khoảng trắng.'
            },
            {
                test: (value, values) => values! && values.password !== values.confirmPassword,
                message: 'Mật khẩu không trùng khớp.'
            }
        ];

        const values: Record<string, string> = { lastName, firstName, phone, email, password, confirmPassword };

        for (let i = 0; i < validations.length; i++) {
            const validation = validations[i];
            if (validation.field) {
                const field = validation.field as keyof UserData;
                if (validation.test(values[field], values)) {
                    // showErrorToast(validation.message);
                    newErrors[field] = validation.message;
                }
            } else {
                if (validation.test('', values)) {
                    // showErrorToast(validation.message);
                    newErrors.confirmPassword = validation.message;
                }
            }
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            const listUser = localStorage.getItem('listUser');
            const newListUser = listUser ? JSON.parse(listUser) : [];

            if (newListUser.length > 0) {
                let isCheked = false;
                newListUser.forEach((user: any) => {
                    if (user.email === email) {
                        isCheked = true;
                    }
                })

                if (isCheked) {
                    console.log("email đã tồn tại");
                    showErrorToast("Email đã tồn tại");
                    return;
                }

                const user = {
                    email: email,
                    lastName: lastName,
                    firstName: firstName,
                    phone: phone,
                    password: password,
                }
                newListUser.push(user);
                localStorage.setItem('listUser', JSON.stringify(newListUser));
                console.log("đăng kí thành công :", user);
                showSuccessToast("Đăng kí thành công");
                setTimeout(() => {
                    router.push('/Login', { scroll: false });
                }, 2000);
            } else {
                const user = {
                    email: email,
                    lastName: lastName,
                    firstName: firstName,
                    phone: phone,
                    password: password,
                }
                newListUser.push(user);
                localStorage.setItem('listUser', JSON.stringify(newListUser));
                console.log("đăng kí thành công :", user);
                showSuccessToast("Đăng kí thành công");
            }
        }
    };
 

    return (
        <div>
            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
            <TitlePage message={"Register"}/>
            <div className="containerLogin">
                <div className='formLogin'>
                    <div className='cardLogin'>
                        <div className='cardBox'>
                            <div className='cardHeader'>
                                <h1>Đăng kí</h1>
                            </div>
                            <div className='cardBody'>
                            <label htmlFor="">First Name</label>
                                <input
                                    type="text"
                                    placeholder='first Name'
                                    className={`firstName ${errors.firstName ? 'inputError' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="errorMessage">{errors.firstName}</div>}

                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder='last Name' className={'lastName'} onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName && <div className="errorMessage">{errors.lastName}</div>}

                                <label htmlFor="">Phone</label>
                                <input type="text" placeholder='phone' className={'phone'} onChange={(e) => setPhone(e.target.value)} />
                                {errors.phone && <div className="errorMessage">{errors.phone}</div>}

                                <label htmlFor="">Email</label>
                                <input type="text" placeholder='gmail' className={'email'} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <div className="errorMessage">{errors.email}</div>}

                                <label htmlFor="">Password</label>
                                <input type="text" placeholder='password' className={'password'} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <div className="errorMessage">{errors.password}</div>}

                                <label htmlFor="">Confirm password</label>
                                <input type="text" placeholder='confirm password' className={'confirmPassword'} onChange={(e) => setConfirmPassword(e.target.value)} />

                                {errors.confirmPassword && <div className="errorMessage">{errors.confirmPassword}</div>}
                                
                            </div>
                            <div className='CardFooter'>
                                <div className='btnRegister'>
                                    <button className='' onClick={handleRegister}>Đăng kí</button>
                                </div>
                                <br />
                                <a href={'/Login'}>
                                    Có tài khoản
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

