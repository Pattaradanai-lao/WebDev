import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

const initialState = {
  title: "labtop",
  description: "desc",
  price: 300,
  quantity: 1,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  // ทำให้สามารถใช้งาน getCategory ที่เป็น global state ได้ ใช้โชว category ที่มีตอนนี้
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  //เอา getProduct มาโชว
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  // สำหรับบันทึกค่าจากช่อง input
  const [form, setForm] = useState(initialState);
//   console.log(products);

  useEffect(() => {
    getCategory(token);
    getProduct(token, 20);
  }, []);

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // ป้องกัน refresh
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
    //   console.log(res);
      //อันนี้เพิ่มเอง ****
      getProduct(token, 20);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          เพิ่มข้อมูลสินค้า
        </h1>

        {/* Row 1: Title and Description */}
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className="text-gray-700 font-medium">ชื่อสินค้า</div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={handleOnChange}
              placeholder="กรุณากรอกชื่อสินค้า"
              name="title"
            />
          </div>
          <div className="flex-1">
            <div className="text-gray-700 font-medium">รายละเอียดสินค้า</div>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={handleOnChange}
              placeholder="กรุณากรอกรายละเอียด"
              name="description"
            />
          </div>
        </div>

        {/* Row 2: Price and Quantity */}
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className="text-gray-700 font-medium">ราคา</div>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.price}
              onChange={handleOnChange}
              placeholder="กรุณากรอกราคา"
              name="price"
            />
          </div>
          <div className="flex-1">
            <div className="text-gray-700 font-medium">จำนวน</div>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="กรุณากรอกจำนวน"
              name="quantity"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="text-gray-700 font-medium">หมวดหมู่</div>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              กรุณาเลือกหมวดหมู่
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

         {/* Upload file */}
         <Uploadfile form = {form} setForm={setForm} />


        <div className="flex justify-between items-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            เพิ่มสินค้า
          </button>
        </div>

        <hr />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัพเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
            //   console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{item.updatedAt}</td>
                  <td>
                    <p>แก้ไข</p>
                    <p>ลบ</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
