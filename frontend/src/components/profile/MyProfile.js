import { useSelector } from "react-redux";
import classes from "./MyProfile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const profileId = params.profileId;
  const onUpdate = (e) => {
    navigate(`/profile/edit/${user.id}`);
  };

  console.log(profileId);
  console.log(user);

  return (
    <main className={classes.background}>
      <section className={classes.profile_section}>
        {profileId === undefined ? (
          <h1 className={classes.profile_name}>Здравей, {user.name}</h1>
        ) : null}
        {!user.profilePic ? (
          <img
            className={classes.profile__pic}
            src={require(`../../assets/maleprofile.jpg`)}
            alt="profile"
          ></img>
        ) : null}
        <p className={classes.profile_name}>Имена - {user.name}</p>
        <p className={classes.profile_name}>Имейл - {user.email}</p>
        {!user.profilePic ? (
          <h3 className={classes.noPic}>
            Все още не си добавил профилна снимка. Покажи кой се крие за
            прекрасните ти рецепти и добави през "РЕДАКТИРАЙ"
          </h3>
        ) : null}
        <button className="btn__primary" onClick={onUpdate}>
          РЕДАКТИРАЙ
        </button>
      </section>
    </main>
  );
};

export default MyProfile;
