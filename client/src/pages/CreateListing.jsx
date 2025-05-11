import React from "react";

export default function () {
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
                id="dicountedPrice"
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
            <p className="font-semibold">Images
            <span className="font-normal text-gray-500 ml-2"> (The first image will be the cover image)</span>
            </p>
            <div className="flex gap-4">
                <input className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="images/*" multiple/>
                <button className="p-3 text-green-600 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
        <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create List</button>
        </div>
      </form>
    </main>
  );
}
