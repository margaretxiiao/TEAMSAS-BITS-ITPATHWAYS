const MongoClient = require('mongodb').MongoClient;

// Replace <username>, <password>, and <dbname> with your actual credentials and database name
const uri = "mongodb+srv://<s3902846>:<Penguin420!>@cluster0.mongodb.net/<WebsiteDBCluster>";

// Create a MongoClient and connect to the MongoDB Atlas cluster
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  console.log("Connected to MongoDB");
  
  // Now you can perform database operations here

  // client.close(); //
});
