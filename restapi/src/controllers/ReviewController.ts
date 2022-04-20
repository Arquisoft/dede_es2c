import { RequestHandler } from "express";
import { reviewModel } from "../model/Review";


/************* CREAR UNA REVIEW ************/

export const addReview: RequestHandler = async (req, res) => {

  const review = new reviewModel(req.body);
  try {
        const reviewSaved = await review.save();
        res.json(reviewSaved);
    } catch (error) {
        res.status(412).json({ message: "Can't register that review, is not valid" }); // Como ya pongo required = true no hace falta hacer comprobaciones extras
    }
};

/************* OBTENER REVIEWS *************/

export const getReviewsByProduct: RequestHandler = async (req, res) => {
    try{
        const reviews = await reviewModel.find({
         productCode: req.params.codigo,
        });
        return res.json(reviews);
    } catch (err){
        return res.status(404).json({message: "There was a problem getting a review"});
  };
}


export const getReviewByUserAndProduct: RequestHandler = async (req, res) => {
  try {
      const review = await reviewModel.findOne({  // Tiene que cumplir LAS DOS CARACTERÍSTICAS
        productCode: req.params.codigo,
        userEmail: req.params.email,
        });
        if (review) {
            return res.json(review);
        } else {
            return res.status(412).json();
        }
    } catch (err){
        return res.status(404).json({message: "There was a problem getting a review"});
    };
};


/************* ELIMINAR REVIEW ************/

export const deleteReviewByUserAndProduct: RequestHandler = async (req, res) => {
    try {
        const review = await reviewModel.deleteOne({  // Tiene que cumplir LAS DOS CARACTERÍSTICAS
            productCode: req.params.codigo,
            userEmail: req.params.email,
        });
        if (review.deletedCount == 1) {
            return res.json("Rating deleted");
        }
        else {
            return res.status(412).json({ message: "The operation didn't succed "});
        }
    } catch (err){
        return res.status(404).json({message: "There was a problem deleting a review"});
    };
  };
  