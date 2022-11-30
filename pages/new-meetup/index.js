import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const handleNewMeetup = async (data) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    const resData = response.json();
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add New Meetup | Tech Meetups</title>
        <meta
          name="description"
          content="Add your New Tech Meetup for Developers worldwide"
        />
      </Head>

      <NewMeetupForm onAddMeetup={handleNewMeetup} />
    </>
  );
};

export default NewMeetupPage;
