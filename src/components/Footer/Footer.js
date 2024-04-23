import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div data-testid="footerId" className='bg-primary text-white text-center position-fixed w-100 bottom-0 '>
            &copy; right belongs to me
        </div>
    )
}

export default Footer
