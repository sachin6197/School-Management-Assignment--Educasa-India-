const express = require("express");
const { body, query } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validate");
const { addSchool, listSchools } = require("../controllers/schoolController");

const router = express.Router();

router.post("/addSchool", [body("name").isString().trim().notEmpty().withMessage("name is required"), body("address").isString().trim().notEmpty().withMessage("address is required"), body("latitude").notEmpty().withMessage("latitude is required").isFloat({ min: -90, max: 90 }).withMessage("latitude must be a valid float between -90 and 90"), body("longitude").notEmpty().withMessage("longitude is required").isFloat({ min: -180, max: 180 }).withMessage("longitude must be a valid float between -180 and 180")], handleValidationErrors, addSchool);

router.get("/listSchools", [query("latitude").notEmpty().withMessage("latitude is required").isFloat({ min: -90, max: 90 }).withMessage("latitude must be a valid float between -90 and 90"), query("longitude").notEmpty().withMessage("longitude is required").isFloat({ min: -180, max: 180 }).withMessage("longitude must be a valid float between -180 and 180")], handleValidationErrors, listSchools);

module.exports = router;
