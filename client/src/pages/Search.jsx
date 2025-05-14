import React from "react";

export const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen border-slate-200">
        <form className="flex flex-col gap-6">
          <div className="flex items-center flex-wrap gap-2">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              className="border rounded-lg p-3 w-full"
              type="text"
              placeholder="Search..."
              id="searchTerm"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold pr-2">Type:</label>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="all" className="w-5" />{" "}
              <span>Rent & Sale</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="forRent" className="w-5" />{" "}
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="forSale" className="w-5" />{" "}
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />{" "}
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold pr-2">Amenities:</label>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />{" "}
              <span>Parking</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" />{" "}
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label  className="font-semibold pr-2">Sort</label>
            <select className="border rounded-lg p-3" id="sort_order">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white text-center p-3 rounded-lg hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 mt-5 ">Listing Results</h1>
      </div>
    </div>
  );
};
