import express from 'express';
import MyUserController from '../controllers/MyUserController';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';
const router = express.Router();




const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }

})


// /api/my/restaurant

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)
//evertime when user upload an image to this post requet multer will find the imageFile property in request body. Image i binary form. Then multer will store the image in memory and then add then it is gloin to add this file as an object to req
router.post("/",upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant)
router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse,MyRestaurantController.updateMyRestaurant)


export default router;