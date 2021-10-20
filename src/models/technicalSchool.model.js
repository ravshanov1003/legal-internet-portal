const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    type: { type: Number, required: true, enum: [1, 2] }, // 1 school , 2 University
    mainImage: {
        _id: {
            required: true,
            type: String
        },
        path: {
            required: true,
            type: String
        }
    },
    additional: {
        type: String,
        trim: true,
        required: true
    },
    conveniences: [{
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            _id: {
                required: true,
                type: String
            },
            path: {
                required: true,
                type: String
            }
        }
    }],
    images: [{
        _id: {
            required: true,
            type: String
        },
        path: {
            required: true,
            type: String
        }
    }],
    videos: [{
        _id: {
            required: true,
            type: String
        },
        path: {
            required: true,
            type: String
        }
    }],
    lang: { type: String, required: true, enum: ['uz', 'ru', 'cy'] },
    address: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    phones: [{
        phone: { type: String, required: true },
        rank: { type: Number, enum: [0, 1], required: true }
    }],
    site: {
        required: true,
        type: String,
        trim: true
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        telegram: String
    },
    map: {
        type: String,
        trim: true,
        required: true
    },
    director: {
        type: String,
        trim: true,
        required: true
    },
    leaders: {
        required: true,
        type: Number
    },
    teachers: {
        required: true,
        type: Number
    },
    workers: {
        type: Number
    },
    otherWorkers: {
        type: Number
    },
    students: {
        required: true,
        type: Number
    },
    about: {
        required: true,
        type: String
    }

}, { timestamps: true, collection: 'technical-schools' })

schema.pre('remove', async(next) => {
    await this.model('technical-school-faculties').deleteMany({ technicalSchool: this._id })
    next();
})
module.exports = { TSModel: model('TechnicalSchool', schema) }