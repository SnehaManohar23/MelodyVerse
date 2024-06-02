import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Listings() {
  const [listings, setListings] = useState([]);
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const fetchListings = async () => {
        try {
          const { data } = await axios.get("http://localhost:4000/listings", {
            withCredentials: true,
          });
          setListings(data);
        } catch (error) {
          console.log("Error fetching listings:", error);
        }
      };
      fetchListings();
    }
  }, [cookies, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-6 text-center pt-6">MUSIC LISTINGS</h2>
      <div className="overflow-y-auto flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-gray-100 p-6 rounded-lg shadow">
              <LazyLoadImage
                src={listing.imageUrl ? `http://localhost:4000${listing.imageUrl}` : 'default-image-path'} // Use provided image URL or default
                alt="Album Cover"
                effect="blur"
                className="w-full h-64 object-fit:cover rounded"  // Updated line
              />

              <h3 className="text-xl font-bold">{listing.title}</h3>
              <p className="mt-2 break-words font-bold text-blue-800">{listing.artist}</p>
              <p className="mt-2 break-words font-bold text-red-700">{listing.genre}</p>
              <p className="mt-2 break-words text-justify">{listing.description}</p>
              <p className="mt-2 text-indigo-600 font-bold">${listing.price}</p>
              <p className="mt-2 text-sm text-gray-600">Posted by: {listing.user.username}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Link to="/create-listing" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Create a new listing</Link>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}

export default Listings;
