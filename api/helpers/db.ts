import mongoose from 'mongoose'

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/trip'

export default (): any => {
    // @ts-ignore
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    mongoose.connection.on('open', () => {
        console.log('MongoDB : Connected successfully');
    })
    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB ERROR : ${err}`);
    })
}
