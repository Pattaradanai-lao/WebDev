import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = () => {

  const [count, setCount] = useState(3)
  const [redirect, setRedirect] = useState(false)

  useEffect(()=> {
    const interval = setInterval(() => {
        setCount((currentCount) => {
            if(currentCount === 1) {
                clearInterval(interval)
                setRedirect(true)
            }
            return currentCount - 1
        })
    }, 1000)
    return ()=> clearInterval(interval)
  }, [])

  if(redirect){
    return <Navigate to={'/'} />
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 text-lg font-semibold text-center text-white bg-red-500 rounded-md shadow-md">
        No Permission, Redirect in {count}
      </div>
    </div>
  )
}

export default LoadingToRedirect