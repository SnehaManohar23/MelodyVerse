

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function CreateListing() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    artist: "",
    genre: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/create-listing",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (data) {
        navigate("/");
      }
    } catch (ex) {
      console.log(ex);
      generateError("Failed to create listing");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist</label>
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg hover:bg-indigo-700">Submit</button>
      </form>
      <div className="mt-4 flex justify-between">
        <Link to="/" className="text-indigo-600 hover:underline">Back to Listings</Link>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Logout</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateListing;
