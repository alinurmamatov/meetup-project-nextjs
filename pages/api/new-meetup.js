import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.vdz8rxw.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("tech-meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();
    // console.log(result);

    res.status(201).json({ message: "Meetup data successfully inserted!" });
  }
};

export default handler;
