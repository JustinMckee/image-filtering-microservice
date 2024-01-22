import express from "express"
import { filterImageFromURL, deleteLocalFiles } from "../../util/util.js";
import imagesService from "../services/imagesService.js";
import uploadImage from "../middleware/uploadImageToS3Middleware.js";

export const router = express.Router();

router.get("/filteredImage/", async (req,res) => {
    const {image_url} = req.query;
    if(image_url) { 
        try {
            const url = new URL(image_url);
            const filteredImageURL = await filterImageFromURL(url);

            res.sendFile(filteredImageURL, {}, async (err) => {
                if(err){
                    console.error('Error sending file', err);
                    next(err);
                } else {
                    await deleteLocalFiles([filteredImageURL]);
                    return res.status(201);
                }
            });
        } catch(e) {
            console.error("filterImage error");
            res.status(500).send("Image Filtering Error.");
            return next(e)
        }
    } else {
        res.status(422).send("Missing image_url query parameter.");
    }
});

router.get("/getImages/", async (req, res) => {
    const {user} = req.query;
    let images;
    if(user) {
        images = await imagesService.findImagesByUser(user);
    } else {
        images = await imagesService.findAll();
    }
    res.status(200).send(images);
});

router.post("/postImage", uploadImage.single('file') ,async(req,res) => {
    if(req.file) {
        res.status(201).json({url: req.file.location});
    } else {
        console.error("S3 upload failed", req);
        res.status(422).send("Image upload failed.");
    }
});