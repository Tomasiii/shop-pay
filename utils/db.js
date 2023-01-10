import mongoose from 'mongoose'
mongoose.set('strictQuery', true)

const connection = {}

 async function connectDb() {
    if (connection.isConnected) {
        console.log('ALREADY CONNECTED !!!')
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('Use previous connection to the database')
            return
        }
        await mongoose.disconnect()
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('New connection to db')
    connection.isConnected = db.connections[0].readyState
}

 async function disconnectDb(){
    console.log(process.env.NODE_ENV)
    if(connection.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect()
            connection.isConnected = false
        }else{
            console.log('not disconnecting from the db')
        }
    }
}

export default {connectDb, disconnectDb}