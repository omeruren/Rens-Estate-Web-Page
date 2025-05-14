import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListingCard } from "../components/ListingCard";
export const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();
  console.log(listings)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const term = searchParams.get("searchTerm");
        const type = searchParams.get("type");
        const parking = searchParams.get("parking");
        const furnished = searchParams.get("furnished");
        const offer = searchParams.get("offer");
        const sort = searchParams.get("sort");
        const order = searchParams.get("order");

        if (term || type || parking || furnished || offer || sort || order) {
            setSideBarData({
                searchTerm: term || "asc",
                type: type || "all",
                parking: parking === "true" ? true : false,
                furnished: furnished === "true" ? true : false,
                offer: offer === "true" ? true : false,
                sort: sort || "created_at",
                order: order || "desc",
            });
                
        }

        const fetchListings = async () => {
            setLoading(true)
            const searchQuery = searchParams.toString();
            const res = await fetch(`/api/listing/get/?${searchQuery}`);
            const data = await res.json();
            setLoading(false)
            setListings(data);
        }

        fetchListings();

    } , [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'forRent' || e.target.id === 'forSale'){
        setSideBarData({
          ...sideBarData,
          type: e.target.id,
        })
    }

    if (e.target.id === 'searchTerm') {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }
      if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
        setSideBarData({
          ...sideBarData,
          [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
        });
      }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split("_")[0] || "created_at";
        const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({
        ...sideBarData,
        sort: sort,
        order: order,
      });
    }
     
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set("searchTerm", sideBarData.searchTerm);
        searchParams.set("type", sideBarData.type);
        searchParams.set("parking", sideBarData.parking);
        searchParams.set("furnished", sideBarData.furnished);
        searchParams.set("offer", sideBarData.offer);
        searchParams.set("sort", sideBarData.sort);
        searchParams.set("order", sideBarData.order);
        const searchQuery = searchParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen border-slate-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center flex-wrap gap-2">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              className="border rounded-lg p-3 w-full"
              type="text"
              placeholder="Search..."
              id="searchTerm"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold pr-2">Type:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />{" "}
              <span>Rent & Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="forRent"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "forRent"}
              />{" "}
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="forSale"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "forSale"}
              />{" "}
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.offer}
              />{" "}
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center ">
            <label className="font-semibold pr-2">Amenities:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.parking}
              />{" "}
              <span>Parking</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />{" "}
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold pr-2">Sort</label>
            <select
              className="border rounded-lg p-3"
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white text-center p-3 rounded-lg hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold border-b p-3 mt-5 ">
          Listing Results
        </h1>
        <div className="p-4 flex flex-wrap gap-4">
            {!loading && listings.length === 0  &&(
                <p className="text-2xl font-semibold ">No Listing Found</p>
            )}
            {loading && (
                <p className=" text-center text-2xl font-semibold w-full ">Loading...</p>
            )}
            {!loading && listings && listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
      </div> 
    </div>
  );
};
