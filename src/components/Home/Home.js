
"use client"

import React, { useEffect, useRef } from 'react'
import styles from './Home.module.css'
import Image from 'next/image'

const Home = () => {
  const imgRef = useRef()
  useEffect(() => {
    const handleScroll = () => {
      if (isElementPartiallyVisible(imgRef.current)) {
        console.log(1);
        imgRef.current.classList.add("homeImgAnim");

      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isElementPartiallyVisible = (element) => {
    if (typeof window !== 'undefined') {
      ;
      var rect = element.getBoundingClientRect();
      var windowHeight = (window.innerHeight || window.documentdocumentElement.clientHeight);
      var windowWidth = (window.innerWidth || window.documentdocumentElement.clientWidth);

      var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
      var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

      return (vertInView && horInView);
    }
  }

  return (
    <div className='container-fluid'>
      <h3 className={`text-center my-3 ${styles.homeHeading}`}>Welcome</h3>
      <p>
        Helping Businesses Grow with Innovative IT Solutions
        Welcome to Vision Techno Services! We specialize in providing comprehensive IT solutions that empower businesses to thrive. From custom software development to innovative tech solutions, we harness cutting-edge technologies to optimize processes, enhance productivity, and drive growth, enabling our clients to stay ahead in todays digital landscape.
      </p>
      <div className='row'>
        <div className='col-6 position-relative'>
          <div className={`${styles.headingText}`}>
            <h1>the Power</h1>
            <h3>Technology for your Business</h3>
          </div>
          <div className={`${styles.headerText2} position-absolute`}>
            <p>Unlock New Opportunities with Scalable and Secure Software Solutions,</p>
            <p>Get in touch with our Expert for same.</p>
          </div>
        </div>
        <div className='col-6'>
          <Image alt="" ref={imgRef} id="homeImg" className={`w-100 ${styles.homeImg}`} src="home.png"></Image>

        </div>

      </div>
    </div>
  )
}

export default Home
