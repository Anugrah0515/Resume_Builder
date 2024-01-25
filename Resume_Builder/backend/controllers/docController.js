const { execSync } = require('child_process');
const fs = require('fs');
const Doc = require('../models/docSchema');
const { validationResult } = require('express-validator');

exports.createDoc = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({message: "Request Error..."});
        return;
    }   
    const latexTemplate = "\\documentclass{article}\n\\begin{document}\nHello, \\VAR{name}! Your age is \\VAR{email} years.\n\\end{document}";

    let modifiedLatex = latexTemplate;
    for (const [key, value] of Object.entries(req.body)) {
        const regex = new RegExp(`\\\\VAR{${key}}`, 'g');
        modifiedLatex = modifiedLatex.replace(regex, value);
    }
    // code to save the file
    const outputFilePath = './output.tex';
    fs.writeFileSync(outputFilePath, modifiedLatex, 'utf-8');
    try {
        execSync(`pdflatex ${outputFilePath}`, { stdio: 'inherit' });
        console.log('PDF successfully generated: output.pdf');
    } catch (error) {
        console.error('Error compiling LaTeX to PDF:', error.message);
    }
    // code to download the file
    const pdfFilePath = './output.tex';
    res.download(pdfFilePath, 'output.pdf', (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error sending file');
        } else {
            // fs.unlinkSync(outputFilePath);
            // fs.unlinkSync(pdfFilePath);
            console.log('delete the files');
        }
    });
    
}

exports.saveDoc = async (req, res) => {
    // save the pdf file in mongo db
    
}