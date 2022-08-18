import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "../Register.module.css";
import {useSelector, useDispatch} from 'react-redux';
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../layout/Spinner";

const EditProfile = (props) => {
    const { user } = useSelector((state) => state.auth);
    const params = useParams()
    const {profileId} = params
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });

 // const navigate = useNavigate();

  const { name, email, password, repass } = formData;

  const dispatch = useDispatch();
  const { isLoading, isError ,isSuccess, message} = useSelector(state => state.auth)

//   useEffect(() => {
//     if (isError) {
//       toast.error(message)
//     }

//     // if (isSuccess || user) {
//     //   navigate('/')
//     // }

//     dispatch(reset())
//   }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6 || password.length > 12) {
      toast.error("Паролата трябва да е между 6 и 12 символа");
      return;
    }
    if (password !== repass) {
      toast.error("Въведените пароли не съвпадат");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

   // dispatch(register(userData))
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={classes.background}>
      <div className={classes.reg}>
        <form onSubmit={onSubmit}>
          <label className={classes.genLabel} htmlFor="name">
            Вашите имена
          </label>
          <input
            className={classes.genInput}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Гергана Иванова"
            required
          ></input>
          <label className={classes.genLabel} htmlFor="email">
            И-мейл адрес
          </label>
          <input
            className={classes.genInput}
            placeholder="geri_chef@abv.bg"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
          <label className={classes.genLabel} htmlFor="password">
            Парола
          </label>
          <input
            className={classes.genInput}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Въведете парола"
            required
          ></input>
          <p>Паролата трябва да е между 6 и 12 символа</p>
          <label className={classes.genLabel} htmlFor="rePass">
            Повтори парола
          </label>
          <input
            className={classes.genInput}
            type="password"
            id="repass"
            name="repass"
            value={repass}
            onChange={onChange}
            placeholder="Повторете паролата"
            required
          ></input>
          {/* <label className={classes.genLabel} htmlFor="male">
            Пол
          </label>
          <label className={classes.genRadioLabel} htmlFor="male">
            Мъж
          </label>
          <input
            id="male"
            className={classes.genRadio}
            type="radio"
            value={gender}
            name="gender"
            onChange={genderRadio}
          />{" "}
          <label className={classes.genRadioLabel} htmlFor="female">
            Жена
          </label>
          <input
            className={classes.genRadio}
            type="radio"
            value={gender}
            name="gender"
            onChange={genderRadio}
          />{" "} */}
          <button className={classes.regButton} type="submit">
            РЕГИСТРИРАЙ СЕ
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default EditProfile;
