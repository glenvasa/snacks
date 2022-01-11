import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from 'next/link'
import { useSelector } from "react-redux";

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/images/telephone.png" width={32} height={32} alt='phone' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>508-558-2681</div>
        </div>
      </div>
      <div className={styles.item}>
          <ul className={styles.list}>
            <Link href='/' passHref>
              <li className={styles.listItem}>HomePage</li>
            </Link>
          
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Menu</li>
            <Image src='/images/snacks.png' width={190} height={170} alt='logo' className={styles.logo} />
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
            <Link href='/admin/login' passHref>
            <li className={styles.listItem}>Admin</li>
            </Link>
            
          </ul>
      </div>
      <Link href='/cart'>
      <div className={styles.item}>
          <div className={styles.cart}>
          <Image src='/images/cart.png' width={30} height={30} alt='logo' />
          <div className={styles.counter}>{quantity}</div>
          </div>
      </div>
      </Link>
      
    </div>
  );
};

export default Navbar;
