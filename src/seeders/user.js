const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/user.model');
require('dotenv').config();

const users = [{
    username: 'diyorbek',
    email: 'ravshanov1003@gmail.com',
    fullNme: 'Diyorbek Ravshanov',
    password: 'diyorbek',
    userType: 'admin'
}];

module.exports = async function() {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

        await Promise.all(users.map(async user => user.password = await bcrypt.hash(user.password, salt)));

        await UserModel.collection.drop();
        await UserModel.insertMany(users);
        console.log('Dummy Users inserted');
    } catch (error) {
        console.log('Error on dummy Users');
        console.log(error);
        process.exit(1);
    }
};