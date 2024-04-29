import React, { useEffect,useState } from 'react'
import styles from './Menu.module.css'
import configuration from './configuration.json'
import Link from 'next/link'
import { Cookies } from '@/common/api/Cookies'
import { appStore } from '@/redux/store/appStore'
import { Modal } from '@/common/reusableComponents/Modal'
import { useRouter } from 'next/navigation'


export const Menu = () => {
    const {data,menuItems}=configuration
    const [isShowModal, setIsShowModal] = useState(false)
    const [isMobileView, setIsMobileView] = useState(document?.body?.offsetWidth < 700);
    const [left, setLeft] = useState(-150)
    // const [selMenuItem, setSelMenuItem] = useState(location?.pathname?.slice(1) || 'home')
    const [selMenuItem, setSelMenuItem] = useState()
    let timeOutId;
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            setSelMenuItem(location?.pathname?.slice(1) || 'home')
        },500)
    })

    window.addEventListener('resize', () => {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
            const deviceWidth = document?.body?.offsetWidth;
            setIsMobileView(deviceWidth < 700)
        }, 100)
    })

    const handleMobileMenu = () => {
        setLeft(left === -150 ? 0 : -150)
    }
    const handleMenuItem = (menuItem) => {
        console.log(menuItem)
        setSelMenuItem(menuItem)
    }
    const handleLogout = () => {
        setIsShowModal(true)

    }
    return (
        <>
            {isMobileView && <button onClick={handleMobileMenu} className={styles.mobileMenuBtn}><span></span><span></span><span></span></button>}
            <ul data-testid="menu-test-id" style={{ left: left }} className={`px-0 py-0 mx-0 my-0 ${isMobileView ? styles.mobileMenu : styles.menu}`}>
                {
                    menuItems?.map(({ id, text, link }, ind) => {
                        return <li className={id === selMenuItem ? styles.active : ""} onClick={() => handleMenuItem(id)} key={`li_${ind}`}><Link href={link}>{text}</Link></li>
                    })
                }
                <li className="text-white cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul >
            {isShowModal && <Modal text="Are u sure..." isShowOk={true} fnOK={() => {
                Cookies.clearCookie();
                appStore.dispatch({ type: "LOGOUT" })
                router.push('/login')
            }} fnClose={() => setIsShowModal(false)} />}

        </>
    )
}


