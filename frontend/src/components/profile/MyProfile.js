import { useSelector } from "react-redux";
import classes from "./MyProfile.module.css";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <main className={classes.background}>
      <div>Hello {user.name}</div>
    </main>
  );
};

export default MyProfile;
