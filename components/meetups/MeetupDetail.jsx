const MeetupDetail = (props) => {
  const { title, image, address, description } = props;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt={title} />
      <address>{address}</address>
    </>
  );
};

export default MeetupDetail;
