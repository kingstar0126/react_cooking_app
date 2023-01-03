import classes from "./PostRecipe.module.css";
import { Fragment, useState, useEffect } from "react";
import SingleIngredient from "./SingleIngredient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { createRecipe, reset } from "../../features/recipes/recipeSlice";
import { FaPlusCircle } from "react-icons/fa";

const PostRecipe = () => {
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("грама");
  const [loading, setLoading] = useState(false);
  const editMode = true;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { recipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  // useEffect(() => {
  //   if (recipeId !== undefined) {
  //     dispatch(getSingleRecipe(recipeId));
  //   }
  // }, [dispatch, recipeId]);

  const [formData, setFormData] = useState({
    title: "",
    products: [],
    preparation: "",
    suitableFor: "",
    photos: "",
  });

  const { photos, title, preparation, suitableFor } = formData;

  const onItemAdd = (e) => {
    setItem(e.target.value);
  };

  const onVolumeAdd = (e) => {
    setVolume(Number(e.target.value));
  };

  const onSelectType = (e) => {
    setType(e.target.value);
  };

  const onMutate = (e) => {
    if (e.target.name === "suitableFor") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onProductsUpdate = (item) => {
    setProducts(products.filter((product) => product.item !== item));
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
    setItem("");
    setType("грама");
    setVolume("");
  };

  const handlePhotoUpload = (e) => {
    // setUploadedPhotos((prevState) => [...prevState, e.target.files[0]]);
    setFormData((prevState) => ({
      ...prevState,
      photos: e.target.files[0],
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess) {
    //   dispatch(reset());
    //   navigate("/recepti");
    // }
    dispatch(reset());
  }, [message, isError, isSuccess, navigate, dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("products", JSON.stringify(products));
    formData.append("preparation", preparation);
    formData.append("suitableFor", suitableFor);
    formData.append("photos", photos);

    try {
      const response = await fetch(
        `https://cook-master.onrender.com/api/posts`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${user.token}`,
            // "Content-Type": "multipart/form-data: boundary=XXX",
          },
        }
      );

      if (response.status === 201) {
        const addedRecipe = await response.json();
        setLoading(false);
        navigate("/");
        return addedRecipe;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
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
              <h1>Здравей, {user.name}</h1>
              <h3>Добави своята страхотна рецепта!</h3>
            </div>
            <div className={classes.form}>
              <form
                className={classes.formInside}
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <input
                  className={`${classes.inpitOpacity} ${classes.inputField}`}
                  type="text"
                  placeholder="Мусака с тиквички..."
                  name="title"
                  id="title"
                  value={title}
                  onChange={onMutate}
                  required
                />
                <p>Съставки:</p>
                {products.length > 0
                  ? products.map((product) => (
                      <SingleIngredient
                        edit={editMode}
                        product={product}
                        key={product.item}
                        products={products}
                        onProductsUpdate={onProductsUpdate}
                      />
                    ))
                  : null}
                <article className={classes.ingredient}>
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
                    placeholder="Морков, домат, лук..."
                    name="product"
                    id="product"
                    value={item}
                    onChange={onItemAdd}
                  />
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
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
                    <FaPlusCircle />
                  </button>
                </article>

                <p className={classes.para}>
                  Добави стъпките за приготвянето на твоя шедьовър
                </p>
                <textarea
                  className={classes.textArea}
                  name="preparation"
                  id="preparation"
                  cols="10"
                  rows="10"
                  value={preparation}
                  onChange={onMutate}
                  required
                ></textarea>

                {/* <p className={classes.para}>Добави категории</p>
                <article className={classes.categories}>
                  <ul className={classes.checkboxItems}>
                    <li className={classes.checkbox}>
                      <input type="checkbox" name="item" required />
                    </li>
                  </ul>
                </article> */}

                <div className={classes.suitable}>
                  <p className={classes.para}>
                    Подходяща за
                    <span className={`${classes.para} ${classes.spanText}`}>
                      <select
                        name="suitableFor"
                        id="suitable"
                        onChange={onMutate}
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
                <div>
                  <label className={classes.upload} htmlFor="photos">
                    Качи снимки
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photos"
                    id="photos"
                    filename="photos"
                    onChange={handlePhotoUpload}
                    required
                  />
                </div>

                <button className="btn__primary">ДОБАВИ РЕЦЕПТА</button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </Fragment>
  );
};

export default PostRecipe;
