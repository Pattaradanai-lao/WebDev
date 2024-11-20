import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
// javascript
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value)
    //เอา ค่าที่ได้มาใส่ใน state โดยต้อง copy object ที่เป็นข้อมูลเดิมมาก่อนเลยใช้ ... เหมือน copy อันนี้
    // email: "",
    // password: "",
    // confirmPassword: "",
    // ทำให้ update แล้วข้อมูลเก่ายังคงอยู่

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    // ป้องกันการ refresh ไม่งั้นกด submit มันจะโชวว์ข้อมูลเสร็จแล้วรีเฟรสหายไปเลย
    e.preventDefault()
    //ก่อนส่งไปบอกหลังบ้าน
    if(form.password != form.confirmPassword) {
      return alert('Confirm Password is not match!!!')
    }
    console.log(form)

    //send to back
    try {
      const res = await axios.post('http://localhost:5002/api/register',form)

      console.log(res)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>

        Email
        <input className='border'
          onChange={handleOnChange}
          name='email'
          email='email'
        />

        Password
        <input className='border'
          onChange={handleOnChange}
          name='password'
          type='text'
        />

        Confirm Password
        <input className='border'
        onChange={handleOnChange}
          name='confirmPassword'
          type='text'
        />

        <button className='bg-blue-300 rounded-md'>Register</button>


      </form>
      </div>
  )
}

export default Register