import classes from "./EditRecipe.module.css";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRecipe, reset } from "../../features/recipes/recipeSlice";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import SingleIngredient from "./SingleIngredient";

const EditRecipe = () => {
  const params = useParams();
  const { recipeId } = params;
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("грама");
  const [loading, setLoading] = useState(false);
  const [oldProducts, setOldProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    products: [],
    preparation: "",
    suitableFor: "",
    photos: "",
  });

  const edit = true;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipeId !== undefined) {
      dispatch(getSingleRecipe(recipeId));
    }
  }, [dispatch, recipeId]);

  const { user } = useSelector((state) => state.auth);
  const { recipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      title: recipe.title,
      products: recipe.products,
      preparation: recipe.preparation,
      suitableFor: recipe.suitableFor,
      photos: recipe.photos,
    }));
  }, []);

  

  useEffect(() => {
    setProducts(formData.products)
  }, [formData.products])
  // useEffect(() => {
  //   setOldProducts(formData.products)
  // }, [formData.products])
  

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
    const updatedProducts = products.filter((product) => product.item !== item)
    
    setProducts(updatedProducts)
    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
    
   // setOldProducts(updatedProducts);
  };
  console.log(products)
  
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
    console.log(products)
    console.log(formData)
    setItem("");
    setType("грама");
    setVolume("");
  };

  const handlePhotoUpload = (e) => {
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
        `http://localhost:5000/api/posts/${recipeId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${user.token}`,
            // "Content-Type": "multipart/form-data: boundary=XXX",
          },
        }
      );

      if (response.status === 201) {
        const updatedRecipe = await response.json();
        setLoading(false);
        navigate("/");
        return updatedRecipe;
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
              <h2>
                Намерил си начин да подобриш вкуса на своята рецепта? Добави
                промените оттук!
              </h2>
              <div className={classes.line}></div>
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
                <p className={classes.para}>Съставки:</p>
                {products.length > 0
                  ? products.map((product) => (
                      <SingleIngredient
                        product={product}
                        key={product.item}
                        products={products}
                        onProductsUpdate={onProductsUpdate}
                        edit={edit}
                      />
                    ))
                  : null}
                {/* {oldProducts.length > 0
                  ? oldProducts.map((oldProduct) => (
                      <SingleIngredient
                        product={oldProduct}
                        key={oldProduct.item}
                        products={oldProducts}
                        onProductsUpdate={onProductsUpdate}
                        edit={edit}
                      />
                    ))
                  : null} */}
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
                  className={classes.inpitOpacity}
                  name="preparation"
                  id="preparation"
                  cols="10"
                  rows="4"
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
                {/* <UploadFile onUploadClick={onFilenameSet} /> */}
                <div>
                  <label htmlFor="photos">Качи снимки</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photos"
                    id="photos"
                    filename="photos"
                    onChange={handlePhotoUpload}
                    required
                  />
                </div>

                <button className={classes.buttonMain}>РЕДАКТИРАЙ</button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </Fragment>
  );
};

export default EditRecipe;
