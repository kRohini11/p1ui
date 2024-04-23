
import React, { useEffect, useState } from 'react'
import styles from './Toaster.module.css'
import { useDispatch } from 'react-redux'

const Toaster = ({ msg, bgcolor }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidth((val) => {
        if (val > 300) {
          clearInterval(intervalId)
          dispatch({
            type: "TOASTER",
            payload: { isShowToaster: false, message: "", bgcolor: "" }
          })
        }
        return val + 1
      })
    }, 20)
  }, [])
  return (
    <div style={{ background: bgcolor }} className={styles.toaster}>
      <span className='ms-2'> {msg}</span>
      <div style={{ width }}></div>
    </div>
  )
}

export default Toaster
