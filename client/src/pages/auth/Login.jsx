import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("user from zustand", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // ป้องกันการ refresh ไม่งั้นกด submit มันจะโชวว์ข้อมูลเสร็จแล้วรีเฟรสหายไปเลย
    e.preventDefault();
    //send to back
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      console.log("role", role);

      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <span className="block text-sm font-medium text-gray-700">Email</span>
            <input
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              onChange={handleOnChange}
              name="email"
              type="email"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Password</span>
            <input
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              onChange={handleOnChange}
              name="password"
              type="text"
            />
          </div>
          <button className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
