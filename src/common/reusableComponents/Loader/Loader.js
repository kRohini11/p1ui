import React from 'react'
import Image from 'next/image'
import styles from './Loader.module.css'

const Loader = () => {
    return (
        <div>
            <div className={styles.mask}></div>
            <Image width={300} height={300} src="/loader.gif" alt="Loading..."></Image>
        </div>
    )
}

export default Loader
