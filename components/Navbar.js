import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const quantity = useSelector((state) => state.cart.quantity);

  const router = useRouter();

  return (
   <div className={styles.navbar}>
      <div className={styles.container}>    
      <div className={styles.pizza_logo}>
    <Image src="/images/pizza-logo.png" width={50} height={50} alt='pizza-logo'/> 
          </div>
        <div className={styles.item_logo}>
      
          <div className={styles.callButton}>
            <Image src="/images/phone.png" width={32} height={32} alt="phone" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER ONLINE OR CALL</div>
            <div className={styles.text}>617-558-2681</div>
          </div>
        </div>
        <div className={styles.item_list}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li
                className={`${styles.listItem} ${
                  router.asPath === "/" ? `${styles.active}` : ""
                }`}
              >
                HomePage
              </li>
            </Link>
            <Link href="/#pizza-list" passHref>
              <li
                className={`${styles.listItem} ${
                  router.asPath === "/#pizza-list" ? `${styles.active}` : ""
                }`}
              >
                Menu
              </li>
            </Link>

            <Link href="/" passHref>
              <li className={styles.logo_li}>
                <div className={styles.logoDiv}></div>
                <Image
                  src="/images/snacks.png"
                  width={190}
                  height={170}
                  alt="logo"
                  className={styles.logo}
                />
              </li>
            </Link>

            <Link href="/track" passHref>
              <li
                className={`${styles.listItem} ${
                  router.asPath === "/track" ||
                  router.asPath.startsWith("/orders")
                    ? `${styles.active}`
                    : ""
                }`}
              >
                Order Track
              </li>
            </Link>
            <Link href="/#footer" passHref>
              <li
                className={`${styles.listItem} ${
                  router.asPath === "/#footer" ? `${styles.active}` : ""
                }`}
              >
                Contact
              </li>
            </Link>
            {/* <li className={styles.listItem}>Blog</li> */}
            <Link href="/admin/login" passHref>
              <li
                className={`${styles.listItem} ${
                  router.asPath.startsWith("/admin") ? `${styles.active}` : ""
                }`}
              >
                Admin
              </li>
            </Link>
          </ul>
        </div>
        <Link href="/cart" passHref>
          <div className={styles.item_cart}>
            <div className={styles.cart}>
              <Image src="/images/cart.png" width={30} height={30} alt="logo" />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </div>
        </Link>
        <div className={styles.hamburgerMenuContainer}>
          <div
            className={styles.hamburger}
            onClick={() => setHamMenuOpen(!hamMenuOpen)}
          >
            <Image
              src="/images/hamburger-icon-3.png"
              width={30}
              height={30}
              alt="hamburger-menu"
            />
          </div>
        </div>
        
      </div>
      <div>{hamMenuOpen && <HamburgerMenu />}</div>
  </div>
  );
};

export default Navbar;
