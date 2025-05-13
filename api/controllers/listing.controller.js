import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

 export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
 }

  export const deleteListing = async (req, res, next) => {
      const listingId = Listing.findById(req.params.id);

      if (!listingId) {
          return res.status(404).json({ message: "Listing not found" });
      }

      if (req.user._id !== listingId.userId) {
          return next(errorHandler(403,"You are not allowed to delete this listing"));
      }
      try {
          await Listing.findByIdAndDelete(req.params.id);
          return res.status(200).json({ message: "Listing deleted successfully" });
      } catch (error) {
          next(error);
      }
    }

    export const updateListing = async (req, res, next) => {
        const listingId = Listing.findById(req.params._id);
    
        if (!listingId) {
            return next(errorHandler("Listing not found"));
        }
    
        if (req.user._id !== listingId.userId) {
            return next(errorHandler(403,"You are not allowed to update this listing"));
        }
        try {
            const updatedListing = await Listing.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json(updatedListing);
        } catch (error) {
            next(error);
        }
    }