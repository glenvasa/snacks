import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const HamburgerMenu = () => {
  return (
    <div className={styles.hamMenuItem_list}>
      <ul className={styles.hamMenu}>
        {/* <Link href="/" passHref>
          <li className={styles.hamMenuItem}>HomePage</li>
        </Link> */}
        <Link href="/#pizza-list" passHref>
          <li className={styles.hamMenuItem}>Menu</li>
        </Link>

        {/* <li>
                  <Image src='/images/snacks.png' width={190} height={170} alt='logo' className={styles.logo} />
            </li> */}
<Link href="/cart" passHref>
          <li className={styles.hamMenuItem}>Cart</li>
        </Link>
        <Link href="/track" passHref>
          <li className={styles.hamMenuItem}>Track</li>
        </Link>
        <Link href={"/#motto"} passHref>
          <li className={styles.hamMenuItem}>Contact</li>
        </Link>
        {/* <li className={styles.hamMenuItem}>Blog</li> */}
        <Link href="/admin/login" passHref>
          <li className={styles.hamMenuItem}>Admin</li>
        </Link>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
