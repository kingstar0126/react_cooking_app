import { useSelector } from "react-redux";
import classes from "./MyProfile.module.css";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <main className={classes.background}>
      <section className={classes.profile_section}>
        <h1 className={classes.profile_name}>Здравей, {user.name}</h1>
      </section>
    </main>
  );
};

export default MyProfile;
