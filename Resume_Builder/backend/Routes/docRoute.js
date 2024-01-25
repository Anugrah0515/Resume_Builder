const express = require("express");
const { body } = require("express-validator");
const { createDoc, downloadDoc } = require("../controllers/docController");
const router = express.Router();
const app = express();
app.use(express.json());

router
    .route('/downloaddoc')
    .post(
        [
            body('name', 'Enter the name').exists(),
            body('email', 'Enter the email').exists().isEmail(),
            body('telNum', 'Enter the contact details').exists().isLength(10),
            body('education', 'Enter the education details').exists(),
            body('achievements', 'Enter the achievements').exists(),
            body('project', 'Enter the projects').exists(),
            body('skills', 'Enter the skills').exists()
        ],
        createDoc,
        // downloadDoc
    );

module.exports = router