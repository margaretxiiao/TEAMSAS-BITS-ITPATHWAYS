const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000; 
const mongoUrl = 'mongodb+srv://lekhanhtoan07:T14012003oan@server1.h0nl7gl.mongodb.net/'; 
const dbName = 'Web'; 
const collectionName = 'Test'; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve HTML and CSS files from the 'public' directory

app.post('/register', async (req, res) => {
    const { fullName, dateOfBirth, email, username, phone, password } = req.body;

    try {
        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if email or username already exist
        const existingUser = await collection.findOne({ $or: [{ email }, { username },{ phone }] });
        if (existingUser) {
            return res.send('failedhtml');
        }

        // Insert the new user into the database
        const newUser = {
            fullName,
            dateOfBirth,
            email,
            username,
            phone,
            password, 
        };

        const result = await collection.insertOne(newUser);
        if (result.insertedCount === 1) {
            res.send('Registration failed.');
        } else {
            res.send('Registration successful! ');
        }

        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
