const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    photo: {
        required: true,
        type: String
    },
    dean: {
        required: true,
        type: String,
        trim: true
    },
    time: {
        required: true,
        type: String,
        trim: true
    },
    phone: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    professors: {
        required: true,
        type: Number
    },
    phd: {
        required: true,
        type: Number
    },
    dsc: {
        required: true,
        type: Number
    },
    teachers: {
        required: true,
        type: Number
    },
    bachelor: {
        required: true,
        type: Number
    },
    magistracy: {
        required: true,
        type: Number
    },
    doctoral: {
        required: true,
        type: Number
    },
    students: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String,
        trim: true
    },
    technicalSchool: {
        type: Schema.Types.ObjectId,
        ref: 'TechnicalSchool',
        required: true
    }
}, { timestamps: true, collection: 'technical-school-faculties' })

module.exports = { TSFModel: model('TechnicalSchoolFaculty', schema) }