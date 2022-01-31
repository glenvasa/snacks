import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { removeProduct, reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Link from "next/link";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [cashOpen, setCashOpen] = useState(false)

  
  const url = process.env.URL

  const currency = "USD";
  const style = { layout: "vertical" };

  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const amount = Number(cart.total * 1.0625).toFixed(2);

  const tax = Number((cart.total * 0.0625).toFixed(2));
  const grandTotal = Number((cart.total + tax).toFixed(2));

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`/api/orders`, data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        setTimeout(()=> {
          dispatch(reset())
        }, 1300)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRemoveFromCart = ({quantity, totalPrice}, index) => {
    dispatch(removeProduct({quantity, totalPrice, index}));    
  }


  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              const addressInfo = Object.values(shipping.address)
              const email = details.payer.email_address
              createOrder({
                customer: shipping.name.full_name,
                address: [...addressInfo, email],
                  // shipping.address.address_line_1,
                products: cart.products,
                cart_qty: cart.quantity,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  
  // console.log(cart)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.quantity < 1 && (
              <div>
                 <h3>Your Cart is Empty!</h3>
                 <Link href='/#pizza-list' >
                   <button className={styles.emptyCart}>Find your favorite pizza   </button>
                 </Link>
              </div>
             
            )}
            {cart.products.map((product, i) => (
              <tr className={styles.tr} key={i}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.extrasContainer}>
                  {product.extrasArray.map((extra) => (
                    <span key={extra._id} className={styles.extras}>
                      {extra.text}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>
                    ${product.totalPrice.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity} {product.size}
                  {product.quantity > 1 ? 's' : ''}
                  </span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${(product.totalPrice * product.quantity).toFixed(2)}
                  </span>
                  
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleRemoveFromCart(product, i)}>
                    <Image src='/images/trash.png' width={20} height={20} alt='delete-pizza'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Sales Tax:</b>${tax.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Order Total:</b>${grandTotal.toFixed(2)}
          </div>
          <div>
 <button className={styles.clearButton} onClick={() => dispatch(reset())}>
            Clear Cart
          </button>

          </div>
         
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => {
                  setCash(true)
                  setCashOpen(true)
                }}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AUH97Q9ISG2buY1AXhEOHDDf0cEfxQaSR7K3SCvmGVPlU9YY5PkqNxkkiY5YYrtmUgaiTw7LbUR2EN42",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && cashOpen && <OrderDetail total={cart.total} createOrder={createOrder} setCashOpen={setCashOpen} />}
    </div>
  );
};

export default Cart;
