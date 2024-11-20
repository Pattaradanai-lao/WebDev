import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { all } from "axios";

const Uploadfile = ({ form, setForm }) => {
  // JavaScript
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    //code
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])

        // validate หลังจากเข้าถึงในแต่ละรูปภาพก็เอาแต่ละรูปภาพไปเก็บไว้ในตัวแปร file
        // แล้วก็ทำการเช็คแต่ละตัวว่า file type เริ่มต้นด้วย image ไหม (เพราะเราจะอนุญาติให้อัปโหลดรูปเท่านั้น)
        // ถ้าไม่ใช่ก็ให้ขึ้นแจ้งเตือนว่าไม่สามารถอัปโหลดได้
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is cannot upload !`);
          continue;
        }

        //Image Resizer เพื่อลดขนาดของภาพให้ได้ขนาดที่เรากำหนดไว้
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint back
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload image Success !!!");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
    console.log(e.target.files);
  };

  console.log(form);

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        console.log(res);
        const fillterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        console.log("fillterImage", fillterImages);
        setForm({
          ...form,
          images: fillterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {/*image*/}
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-105" src={item.url} />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-md"
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div>
        <input onChange={handleOnChange} type="file" name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
