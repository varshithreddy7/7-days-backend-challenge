import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const createShortUrl = async(req, res, next)=>{
  try{
    const { originalUrl } = req.body;
    if(!originalUrl){
      return res.status(400).json({
        success: false,
        message: "Original URL is required!"
      });
    }

    let existingUrl = await Url.findOne({originalUrl});
    if(existingUrl){
      return res.status(200).json({
        success: true,
        data:existingUrl
      });
    }

    const shortCode = nanoid(7);
    const newUrl = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      success: true,
      data: newUrl
    });
  }catch(error){
    next(error);
  }
};

export const redirectUrl = async(req, res, next)=>{
  try{
    const {shortCode} = req.params;
    const urlDoc = await Url.findOneAndUpdate(
      {shortCode},
      {$inc: {clicks: 1}},
      {new: true}
    );
    
    if(!urlDoc){
      return res.status(404).json({
        success: false,
        message: 'Short URL not found!',
      });
    }

    return res.redirect(302, urlDoc.originalUrl);
    
  }catch(error){
    next(error);
  }
};

export const getAllUrls = async(req, res, next)=>{
  try{
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [urls, total] = await Promise.all([
      Url.find().sort({createdAt: -1}).skip(skip).limit(limit).lean(),
      Url.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: urls,
      pagination:{
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    });
    
  }catch(error){
    next(error);
  }
};
