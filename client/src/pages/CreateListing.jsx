import { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    images: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
        const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, images: formData.images.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images");
        setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

    const handleRemoveImage = (index) => {
       
        setFormData({
 
            ...formData,
            images: formData.images.filter((_, i) => i !== index), 
        })
    }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            id="name"
            placeholder="Name"
            minLength={10}
            maxLength={80}
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            id="description"
            placeholder="Description"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            id="location"
            placeholder="Location"
            minLength={10}
            maxLength={100}
            required
          />

          <div className=" flex gap-4">
            <div className="flex gap-4">
              <input className="w-5" type="checkbox" id="forSale" />
              <span>For Sale</span>
            </div>
            <div className="flex gap-4">
              <input className="w-5" type="checkbox" id="forRent" />
              <span>For Rent</span>
            </div>
            <div className="flex gap-4">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Paring Spot</span>
            </div>
            <div className="flex gap-4">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-4">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 ">
            <div className="flex items-center gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min={1}
                max={5}
                required
              />
              <p>Bed Rooms</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min={1}
                max={5}
                required
              />
              <p>Bath Rooms</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min={1}
                max={5}
                required
              />
              <div className=" flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="discountedPrice"
                min={1}
                max={5}
                required
              />
              <div className=" flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover image ( Max 6 )
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-600 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80"
                disabled={uploading}
           >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-500">{imageUploadError && imageUploadError}</p>

          {formData.images.length > 0 &&
            formData.images.map((url,index) => (
              <div key={url} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg"> 
                <img
                  className="w-20 h-20 object-contain rounded-lg"
                  src={url}
                  alt="Listing Image"
                />
                <button type="button" onClick={()=>handleRemoveImage(index)} className=" p-3 text-red-500 hover:opacity-65">Delete </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create List
          </button>
        </div>
      </form>
    </main>
  );
}
