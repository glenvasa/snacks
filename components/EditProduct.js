import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const EditProduct = ({ product, setEditClose, pizzaList, setPizzaList }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);
  const [extra, setExtra] = useState(null);
  const [editMessage, setEditMessage] = useState(false);

  const hostUrl = process.env.URL;

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = Number(e.target.value).toFixed(2);
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleAddExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleDeleteExtra = (index) => {
    const deletedOptionText = extraOptions[index].text;
    const currentOptions = extraOptions;
    const removedOptions = currentOptions.filter(
      (option) => option.text !== deletedOptionText
    );

    setExtraOptions(removedOptions);
  };
  
  const editMessageHandler = () => {
    setTimeout(() => {
      setEditMessage(false);
      setEditClose(true);
    }, 1300);
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dwpfbzcnl/image/upload",
          data
        );

        const { url } = uploadRes.data;
      }

      const updatedProduct = file
        ? { title, desc, prices, extraOptions, img: url }
        : { title, desc, prices, extraOptions };
      console.log(updatedProduct);
      const res = await axios.put(`/api/products/${product._id}`, updatedProduct);
      console.log(pizzaList)
      setPizzaList([
        res.data,
        ...pizzaList.filter((pizza) => pizza._id !== product._id),
      ]);
      setEditMessage(true);
      editMessageHandler();
    } catch (err) {
      console.log(err);
    }
  };

  
  // console.log(product)
  // console.log(extraOptions);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setEditClose(true)} className={styles.close}>
          X
        </span>
        <h1>Edit a Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input  type="file" className={styles.file} onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            value={desc}
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              //   value={prices[0]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              //    value={prices[1]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              //   value={prices[2]}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleAddExtra}>
              Add Extra
            </button>
          </div><h5>{`Click 'extra' name below to delete`}</h5>
          <div className={styles.extraItemsEdit}> 
          
            {extraOptions.map((option, index) => (
              <span
                key={index}
                className={styles.extraItem}
                onClick={() => handleDeleteExtra(index)}
              >
                {option.text}: ${option.price}
              </span>
            ))}
          </div>
         
          <div>
            
          </div>
        </div>
        <button className={styles.addButton} onClick={handleUpdate}>
          Submit
        </button>
        {editMessage && (
          <span className={styles.editMessage}>Pizza info updated</span>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
