import classes from "./PostRecipe.module.css";
import { Fragment, useState, useEffect } from "react";
import SingleIngredient from "./SingleIngredient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";

const PostRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    products: [],
    preparation: "",
    suitableFor: "",
  });

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [item, setItem] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("грама");

  const { title, preparation, suitableFor } = formData;

  const onItemAdd = (e) => {
    setItem(e.target.value);
  };

  const onVolumeAdd = (e) => {
    setVolume(Number(e.target.value));
  };

  const onSelectType = (e) => {
    setType(e.target.value);
  };

  const onAddTitle = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddDesc = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelectSuitable = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const onProductAdd = (e) => {
    e.preventDefault();

    const newProduct = {
      item,
      volume,
      type,
    };
    setProducts((prevState) => [...prevState, newProduct]);
    setFormData((prevState) => ({
      ...prevState,
      products: products,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !products || !preparation || !suitableFor) {
      toast.error("Моля въведете всички полета");
    }

    const recipe = {
      title,
      products,
      preparation,
      suitableFor,
    };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.title === title) {
        navigate("/");
      } else {
        setFormData({
          title: "",
          products: [],
          preparation: "",
          suitableFor: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <main className={classes.main}>
        <section className={classes.background}>
          <section className={classes.content}>
            <div className={classes.title}>
              <h2>Добави своята страхотна рецепта!</h2>
              <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
              <form className={classes.formInside} onSubmit={onSubmit}>
                <input
                  className={`${classes.inpitOpacity} ${classes.inputField}`}
                  type="text"
                  placeholder="Мусака с тиквички..."
                  name="title"
                  id="title"
                  value={title}
                  onChange={onAddTitle}
                  required
                />
                <p className={classes.para}>Съставки:</p>
                {products.length > 0
                  ? products.map((product) => (
                      <SingleIngredient product={product} key={product.item} />
                    ))
                  : null}
                <article className={classes.ingredient}>
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
                    placeholder="Морков, домат, лук, червен пипер..."
                    name="product"
                    id="product"
                    value={item}
                    onChange={onItemAdd}
                    required
                  />
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="number"
                    placeholder="количество..."
                    name="quantity"
                    id="quantity"
                    value={volume}
                    onChange={onVolumeAdd}
                  />
                  <select
                    onChange={onSelectType}
                    value={type}
                    name="ingredient-type"
                    id="kilo"
                  >
                    <option value="грама">грама</option>
                    <option value="мл.">мл.</option>
                    <option value="брой(я).">брой(я)</option>
                    <option value="на вкус">На вкус</option>
                  </select>
                  <button
                    className={classes.addIngredient}
                    onClick={onProductAdd}
                  >
                    +
                  </button>
                </article>

                <p>Добави стъпките за приготвянето на твоя шедьовър</p>
                <textarea
                  className={classes.inpitOpacity}
                  name="preparation"
                  id="preparation"
                  cols="10"
                  rows="4"
                  value={preparation}
                  onChange={onAddDesc}
                  required
                ></textarea>

                {/* <p>Добави категории</p>
                <article className={classes.categories}>
                  <ul className={classes.checkboxItems}>
                    <li className={classes.checkbox}>
                      <input type="checkbox" name="item" required />
                    </li>
                  </ul>
                </article> */}

                <div className={classes.suitable}>
                  <p>
                    Подходяща за
                    <span>
                      <select
                        name="suitableFor"
                        id="suitable"
                        onChange={onSelectSuitable}
                        value={suitableFor}
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                      </select>
                    </span>
                    човека.
                  </p>
                </div>

                <button className={classes.buttonMain}>ДОБАВИ РЕЦЕПТА</button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </Fragment>
  );
};

export default PostRecipe;
