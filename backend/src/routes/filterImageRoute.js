import express from "express"
import { filterImageFromURL } from "../../util/util.js";

export const router = express.Router();

router.get("/", async (req,res) => {
    if(req.query.image_url) { 
        try {
            const url = new URL(req.query.image_url)
            const filteredImageURL = await filterImageFromURL(url);
            res.status(201).json({url: filteredImageURL});
        } catch {
            console.error("filterImage error", req);
            res.status(500).send("Invalid image URL.");
        }
    } else {
        console.error("filterImage error", req);
        res.status(500).send("Missing image_url query parameter.");
    }
});