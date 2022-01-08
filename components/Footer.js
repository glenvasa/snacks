import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/images/bg.png" layout='fill' alt='' objectFit='cover'></Image>
            </div>
            <div className={styles.item}>
              <div className={styles.card}>
                  <h2 className={styles.motto}>
                      {`BEST PIZZA IN TOWN?`} <br/>
                      {`IT'S SNACKS.`} <br/>
                      {`JUST THE FACTS!`}
                  </h2>
              </div>
              <div className={styles.card}>
                  <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
                  <p className={styles.text}>
                      17542 Main St. 
                      <br />Brockton, MA 02301
                      <br />508-558-2681
                  </p>
                  <p className={styles.text}>
                      754  N. Main St. 
                      <br />Brockton, MA 02301
                      <br />508-558-2682
                  </p>
                  <p className={styles.text}>
                      542 S. Main St. 
                      <br />Brockton, MA 02301
                      <br />508-558-2683
                  </p>
                  <p className={styles.text}>
                      175 E. Main St. 
                      <br />Brockton, MA 02301
                      <br />508-558-2684
                  </p>
              </div>
              <div className={styles.card}>
              <h1 className={styles.title}>HOURS</h1>
              <p className={styles.text}>
                      SUNDAY - SATURDAY
                      <br />11:00AM - 10:00PM
                      
                  </p>
              </div>
            </div>
        </div>
    )
}

export default Footer
