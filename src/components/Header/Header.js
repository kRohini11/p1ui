import React from 'react'
import styles from "./Header.module.css"


const Header = () => {
    return (
        <div data-testid="headingDir" className={`bg-primary text-center text-white ${styles.header}`}>
           End to End Application
        </div>
    )
}

export default Header
