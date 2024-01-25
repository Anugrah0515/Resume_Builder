const mongoose = require('mongoose');
const { Schema } = mongoose;

const educationSchema = new Schema({
    qualification: {
        type: String,
        required: [true, 'Enter the degree.']
    }, 
    field: {
        type: String,
        required:[true, 'Enter the branch you pursued.']
    },
    university: {
        type: String,
        required: [true, 'Enter the name of the college']
    },
    gpa: {
        type: Number,
    }
});

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: [true, 'Enter atleast a small description to your project']
    }
})

const skillsSchema = new Schema({
    languages: {
        type: Array,
        minlength:1,
        required: [true, 'Enter atleast one language']
    },
    fields: {
        type: Array,
        minlength:1,
        required: [true, 'Enter atleast one field']
    },
    framework: {
        type: Array,
        minlength:1,
        required: [true, 'Enter atleast one framework']
    }
})

const docSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Enter the name of the candidate.']
    },
    email: {
        type: String,
        required: [true, 'Enter a valid email.']
    },
    telNum: {
        type: Number,
        required: [true, 'Enter a valid contact number'],
        length: 10
    },
    education: {
        type: [educationSchema],
        required: [true, 'Enter atleast one quaflication'],
        minlength: 1
    },
    achievements: {
        type: Array,
        required: [true, 'Enter atleast one Achievement'],
        minlength: 1
    },
    project: {
        type: [projectSchema],
        required: [true, 'Add alteast 1 project to the resume'],
        minlength: 1
    },
    skills: {
        type: [skillsSchema],
        required: [true, 'Enter your skills and interests'],
        length: 1
    }
});

const Doc = mongoose.model("Doc", docSchema);
module.exports = Doc;