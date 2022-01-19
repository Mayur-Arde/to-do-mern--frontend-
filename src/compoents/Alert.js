import React,{useState, useEffect} from 'react'

const Alert = ({msg, type, removeAlert, text}) => {
  useEffect(() => {
    let timeout = setTimeout(()=>{
      removeAlert();
    },2000)
    // return timeout
    return () => {
      clearTimeout(timeout);
    }
  }, [text])
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
