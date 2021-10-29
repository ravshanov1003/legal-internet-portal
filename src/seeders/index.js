const { connectDb } = require('../../services/db/db')
connectDb();

const runSeeders = async() => {
    try {
        await require('./user')(),
            console.log('Seeding completed')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

    process.exit(0)
}

runSeeders();