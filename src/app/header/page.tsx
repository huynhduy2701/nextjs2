"use client"
import "./style.scss";
import Image from "next/image";
import logo from "../../../public/assets/Copy-of-Copy-of-Programmics.png";
import { RiWhatsappFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import logoRes from "../../../public/assets/Programmics-1-removebg-preview.png"
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
// import './style/reponsive.scss'
import { usePathname } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
import { redirect, useRouter } from 'next/navigation'
import { showErrorToast, showSuccessToast } from "../erros/erros";
import { ToastContainer } from "react-toastify";
import './nav'
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { FaBell } from "react-icons/fa";
import { deleteCookie } from 'cookies-next';
interface User {
  firstName: string;

}
const NavBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropAbout, setDropAbout] = useState(false);
  const [dropShop, setDropShop] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [count, setCount] = useState("");

  const navRef = useRef(null);

  useEffect(() => {
  const checkIsLogin = localStorage.getItem('token');
    if (checkIsLogin) {
      setIsLogin(true);
      const userData = localStorage.getItem('listUser');
      if (userData) {
        const userList = JSON.parse(userData);
        if (userList.length > 0) {
          const { firstName } = userList[0];
          setFirstName(firstName);
        }
      }
    }
  }, []);

  // let d=0;
  // useEffect(() => {
  //   const product=localStorage.getItem('products');
  //   const products=product?JSON.parse(product):''
  //   if(products.length>0){
      
  //   }
  // }, [products]);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const toggleAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDropAbout(!dropAbout);
  };

  const toggleShop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDropShop(!dropShop);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  const handleLogut = () => {
    deleteCookie("logged");
    localStorage.removeItem('token');
    setIsLogin(false);
    showSuccessToast("Đăng Xuất Thành Công")
    setTimeout(() => {
      router.push('/Login', { scroll: false });
    }, 2000);
  }
  const items: MenuProps['items'] = [
    {
      label: (
        <a   rel="noopener noreferrer" href="#">
          Thông tin
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a onClick={handleLogut}  rel="noopener noreferrer">
          Đăng xuất
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '',
      key: '3',
      disabled: true,
    },
  ];

  return (
    <div>
     {isHome ? (
        <nav className={`sidebar`} >
        <div className="container">
          <div className="menu">
            <div className="menu__left">
              <div className="menu__logo menuNav">
                
                  <Image src={logo} alt="logo" className="logo1" />
                
              </div>
            </div>
            <div className="menu__center">
              <div className="menu__content">
                <ul className="menuNav">
                  <li>
                    <a href={'/'}>
                      Home
                    </a>
                  </li>
                  <li className="dropdown">
                    <a href={"/About"} className="navbarABout">
                      About
                      <span onClick={toggleAbout}>
                        <IoIosArrowDown />
                      </span>
                    </a>
                    {dropAbout && (
                      <ul className="dropdown-menu">
                        <li>
                          <a href="/ourteam">Our Team</a>
                        </li>
                        <li>
                          <a href="casestudy">Case Study</a>
                        </li>
                        <li>
                          <a href="mission">Mission</a>
                        </li>
                        <li>
                          <a href="whychooseProgrammics">Why choose Programics</a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <a href={"/pricingAndPlans"}>
                      Pricing And Plans
                    </a>
                  </li>
                  <li >
                    <a href={'/shop'}>
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href={'/contact'}>
                      Contacts
                    </a>
                  </li>
                </ul>


              </div>

            </div>
            <div className="menu__right menuNav">
              <div className="service">
                <a href={"/"}>
                  <div className="service__icon">
                    <RiWhatsappFill
                      className="service__iconSize"
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "#3b7eff",
                      }}
                    />{" "}
                    {/* Chỉnh sửa class của icon */}
                  </div>
                  <div className="service__question">
                    <h3>Have Any Questions?</h3>
                    <div className="service__number">
                      <p>+919859092222</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="search">
                <div className="search__column">
                  <div className="search__icon">
                    <CiSearch
                      className="search__customicon"
                      style={{ width: "26px", height: "33px", color: "white" }}
                    />
                  </div>
                </div>
              </div>

              <div className="isLoginOrSignup">
              <div className="bell">
                <FaBell/>
                    <span>0</span>
               </div>
                {
                  isLogin ? (
                    <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                  <span>Xin chào ,{firstName}  </span>
                      
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>

                  ) : (

                    <a href={'/Login'}>Đăng nhập</a>
                  )
                }
              </div>
              <div>
                <span className="nameUser">
                  {/* lấy ra firstName khi đăng nhập  ở đây*/}
                  {/* <span>{firstName}</span> */}
                </span>
              </div>

            </div>
          </div>
        </div>
      </nav>
      ):(

        <nav className={`sidebarTwo not-home `} ref={navRef}>
      {/* <nav className={`sidebar ${isHome ? 'absolute' : 'relative'}`}> */}
        <div className="container">
          <div className="menu">
            <div className="menu__left">
              <div className="menu__logo menuNav">
              

               

                  <Image src={logoRes} alt="logo" className="logo2" />
              
              </div>
            </div>
            <div className="menu__center">
              <div className="menu__content">
                <ul className="menuNav">
                  <li>
                    <a href={'/'}>
                      Home
                    </a>
                  </li>
                  <li className="dropdown">
                    <a href={"/About"} className="navbarABout">
                      About
                      <span onClick={toggleAbout}>
                        <IoIosArrowDown />
                      </span>
                    </a>
                    {dropAbout && (
                      <ul className="dropdown-menu">
                        <li>
                          <a href="/ourteam">Our Team</a>
                        </li>
                        <li>
                          <a href="casestudy">Case Study</a>
                        </li>
                        <li>
                          <a href="mission">Mission</a>
                        </li>
                        <li>
                          <a href="whychooseProgrammics">Why choose Programics</a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <a href={"/pricingAndPlans"}>
                      Pricing And Plans
                    </a>
                  </li>
                  <li >
                    <a href={'/shop'}>
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href={'/contact'}>
                      Contacts
                    </a>
                  </li>
                </ul>


              </div>

            </div>
            <div className="menu__right menuNav">
              <div className="service">
                <a href={"/"}>
                  <div className="service__icon">
                    <RiWhatsappFill
                      className="service__iconSize"
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "#3b7eff",
                      }}
                    />{" "}
                    {/* Chỉnh sửa class của icon */}
                  </div>
                  <div className="service__question">
                    <h3>Have Any Questions?</h3>
                    <div className="service__number">
                      <p>+919859092222</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="search">
                <div className="search__column">
                  <div className="search__icon">
                    <CiSearch
                      className="search__customicon"
                      style={{ width: "26px", height: "33px", color: "white" }}
                    />
                  </div>
                </div>
              </div>

              <div className="isLoginOrSignup">
               <div className="bell">
                <FaBell/>
                    <span>0</span>
               </div>
                {
                  isLogin ? (
                    
                    <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                    <span>Xin chào ,{firstName}  </span>
                        
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>

                  

                  ) : (

                    <a href={'/Login'}>Đăng nhập</a>
                  )
                }
              </div>
              <div>
                <span className="nameUser">
                  {/* lấy ra firstName khi đăng nhập  ở đây*/}
                </span>
                {/* <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                  <span>Xin chào ,{firstName}</span>
                      
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown> */}
              </div>

            </div>
          </div>
        </div>
      </nav>
      )}


      <div className="HeaderMenu">
        {/* menu-reponsive */}
        <div className="menuRespon">
          <div className="menuMobile">
            <div className="logoRes">
              <Image src={logoRes} alt="logo" />
            </div>
            <span className="buttonRes" >
              <FaBars onClick={() => toggleMenu()} />
            </span>
          </div>
        </div>
        {/* menu-lefl-reponsive */}
        <div className={`${menuOpen ? 'header__mobile-open' : ''}`}>
  {menuOpen && (
            <div className="menu__box header__mobile">
              <div className="menu__boxLogo">
                <a href="#">
                  <Image src={logoRes} alt="logo" />
                </a>
              </div>
              <hr />
              <div className="main__menu">
                <ul className="menu__main__2">
                  <li>
                    <a href="/">
                      Home
                    </a>
                  </li>
                  <li className="aboutmenu">
                    <a href="About"  >
                      About
                      <span onClick={toggleAbout}>
                        <IoIosArrowDown />
                      </span>
                    </a>
                    <ul className={`submenu__reponsive ${dropAbout ? 'submenu__reponsive-show' : ''}`}>
                      <li>
                        <a href="ourteam">Our Team</a>
                      </li>
                      <li>
                        <a href={'/casestudy'}>Case Study</a>
                      </li>
                      <li>
                        <a href={'/mission'}>Mission</a>
                      </li>
                      <li>
                        <a href="whychooseProgrammics">Why Choose Programmics</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="pricingAndPlans">
                      Pricing And Plans
                    </a>
                  </li>
                  <li className="btnShop">
                    <a href="shop"  >
                      Shop
                      <span onClick={toggleShop}>
                        <IoIosArrowDown />
                      </span>
                    </a>
                    <ul className={`submenu__shop ${dropShop ? 'submenu__shop-show' : ""}`}>
                      <li>Cart</li>
                    </ul>
                  </li>
                  <li>
                    <a href="/">Cart</a>
                  </li>
                  <li>
                    {
                      isLogin ? (
                        <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                        <span>Xin chào ,{firstName}</span>
                            
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>

                      ) : (

                        <a href={'/Login'}>Đăng nhập</a>
                      )
                    }
                  </li>
                </ul>
              </div>
              <div className="menu__boxSearch">
                <div className="searchForm">
                  <input type="text" placeholder="Search..." />
                  <button className="btnIconForm">
                    <IoIosSearch />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      <ToastContainer
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
      />

    </div>
  );
};
export default NavBar;
