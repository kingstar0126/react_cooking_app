import React from "react";

import classes from "./Register.module.css";

const Register = (props) => {
  return (
    <div className={classes.background}>
      <div className={classes.reg}>
        <h2 className={classes.reg__title}>Регистрирай се</h2>
        <form>
          <label className={classes.genLabel} htmlFor="names">
            Вашите имена
          </label>
          <input
            className={classes.genInput}
            type="text"
            id="names"
            placeholder="Гергана Иванова"
          ></input>
          <label className={classes.genLabel} htmlFor="email">
            И-мейл адрес
          </label>
          <input
            className={classes.genInput}
            placeholder="geri_chef@abv.bg"
            type="email"
            id="email"
          ></input>
          <label className={classes.genLabel} htmlFor="password">
            Парола
          </label>
          <input
            className={classes.genInput}
            type="password"
            id="password"
          ></input>
          <label className={classes.genLabel} htmlFor="rePass">
            Повтори парола
          </label>
          <input
            className={classes.genInput}
            type="password"
            id="password"
          ></input>
          <label className={classes.genLabel} htmlFor="male">
            Пол
          </label>
          <label className={classes.genRadioLabel} htmlFor="male">
            Мъж
          </label>
          <input
            id="male"
            className={classes.genRadio}
            type="radio"
            value="Male"
            name="gender"
          />{" "}
          <label className={classes.genRadioLabel} htmlFor="female">
            Жена
          </label>
          <input
            className={classes.genRadio}
            type="radio"
            value="Female"
            name="gender"
          />{" "}
          <button className={classes.regButton} type="submit">
            РЕГИСТРИРАЙ СЕ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
