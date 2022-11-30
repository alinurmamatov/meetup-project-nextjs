import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  const { title, image, address, description } = props;

  return (
    <section className={classes.detail}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <img src={image} alt={title} className={classes.img} />
      </div>
      <address>{address}</address>
    </section>
  );
};

export default MeetupDetail;
