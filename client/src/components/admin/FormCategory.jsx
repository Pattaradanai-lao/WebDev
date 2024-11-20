import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  // JavaScript
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state)=>state.categories)
  const getCategory = useEcomStore((state)=>state.getCategory)
  

  useEffect(() => {
    getCategory(token);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token, name);
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} Success !!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    console.log(id);
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success(`Deleted ${res.data.name} success`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Category Management
      </h1>

      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-80 p-3 border border-gray-300 rounded-lg mb-4 text-lg"
            placeholder="Enter Category Name"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Category
          </button>
        </div>
      </form>

      <hr className="my-6 border-gray-300" />

      <ul className="space-y-4">
        {categories.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
          >
            <span className="text-lg font-semibold">{item.name}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
