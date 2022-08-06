import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./Register.module.css";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });

  const navigate = useNavigate();

  const { name, email, password, repass } = formData;

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
    }
    if (password !== repass) {
      toast.error("Въведените пароли не съвпадат");
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      //console.log(data)

      if (data.name === name) {
        navigate("/");
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          repass: "",
        });
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

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
        <p>Ако имаш регистрация вече <Link to="/login">Влез тук</Link></p>
        
      </div>
    </div>
  );
};

export default Register;
