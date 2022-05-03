import { Request, Response, NextFunction } from "express";
import { body,validationResult } from "express-validator";

export const validateEmail = [
    body("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .withMessage("Invalid e-mail format"),
    (req: Request, res: Response, next : NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];