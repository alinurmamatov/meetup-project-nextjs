import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title} | Tech Meetups</title>
        <meta name="description" content={meetupData.description} />
      </Head>

      <MeetupDetail {...meetupData} />
    </>
  );
};

export default MeetupDetails;

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.vdz8rxw.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("tech-meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.vdz8rxw.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("tech-meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};
