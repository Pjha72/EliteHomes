import React, { useState } from "react";
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
export default function CreateListing() {
  const [geoLocation, setGeoLocation] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bed: 1,
    bath: 1,
    parking: false,
    finished: false,
    address: "",
    description: "",
    offer: false,
    regular: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude:0,
    images: {},
  });
  const {
    type,
    name,
    bed,
    bath,
    parking,
    finished,
    address,
    description,
    offer,
    regular,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // For files
    if(e.target.files){
      setFormData((prevState) =>({
        ...prevState,
        images: e.target.files
      }))
    }
    // Text/Boolen/Number
    if(!e.target.files){
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id] : boolean ?? e.target.value,
      }));
    }
  }

  function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(discountedPrice >= regular){
      setLoading(false);
      toast.error("Discounted Price needs to be less than regular price")
      return;
    }
    if(images.length > 6){
      setLoading(false);
      toast.error("Maximum six images is allowed!!")
      return;
    }

    let geoLocationenabled = {};
    let location 
    if(geoLocationenabled){
      
    }
    
  }

  if(loading){
    return <Spinner />
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          maxLength="32"
          minLength="10"
          className="w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 hover:shadow-lg"
          placeholder="Name"
          required
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg mt-6 font-semibold">Beds</p>
            <input
              type="number"
              id="bed"
              value={bed}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focs:bg-white focus:border-slate-600 text-center"
            />
          </div>

          <div>
            <p className="text-lg mt-6 font-semibold">Bath</p>
            <input
              type="number"
              id="bath"
              value={bath}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focs:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>

        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Finished</p>
        <div className="flex">
          <button
            type="button"
            id="finished"
            value={true}
            onClick={onChange}
            className={`px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !finished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="finished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              finished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          className="w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2 hover:shadow-lg"
          placeholder="Address"
          required
        />
        {!geoLocation && (
          <div className="flex space-x-6 jusitfy-start mb-6">
            <div className="">
              <p className="text-lg mt-6 font-semibold">Latitude</p>
              <input type="number" id="latitude" value={latitude} onChange={onChange} required min="-90" max="90"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"/>
            </div>
            <div className="">
            <p className="text-lg mt-6 font-semibold">Longitude</p>
            <input type="number" id="latitude" value={longitude} onChange={onChange} required min="-180" max="180"
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"/>
          </div>
        </div>
        )}
        <p className="text-lg mt-6 font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          className="w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2 hover:shadow-lg"
          placeholder="Description"
          required
        />
        <p className="text-lg mt-6 font-semibold">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg mt-6 font-semibold">Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regular"
                value={regular}
                onChange={onChange}
                min="50"
                max="50000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {!offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg mt-6 font-semibold">Discounted Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="50000000"
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg mt-6 font-semibold">Image</p>
          <p className="text-gray-600">The first image will be the cover (max 6)</p>
          <div>
            <input type="file" id="image" onChange={onChange} accept=".jpg, .png,.jpeg" multiple required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>
        </div>
        <button type="submit" className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-900 active:shadow-lg transition duration-150 ease-in-out">Create Listing</button>
      </form>
    </main>
  );
}
