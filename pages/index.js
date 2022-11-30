import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Tech Meetups</title>
        <meta
          name="description"
          content="Browse all Worldwide Tech Meetups for Developers"
        />
      </Head>

      <main>
        <MeetupList meetups={props.meetups} />
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  // fetch data from API

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.vdz8rxw.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("tech-meetups");
  const allMeetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async (context) => {
//   // fetch data from API
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: MEETUPS,
//     },
//     // you can't set revalidate here, no reason
//   };
// };
