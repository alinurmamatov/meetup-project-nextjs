import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MEETUPS } from "../fakeDb/fakeDb";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Tech Meetups</title>
      </Head>

      <main>

          <MeetupList meetups={MEETUPS} />

      </main>
    </div>
  );
}
