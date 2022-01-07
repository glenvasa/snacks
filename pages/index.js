import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SNACKS! - Food Ordering App</title>
        <meta name="description" content="Customize and order your favorite snacks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3>SNACKS!!!</h3>
      {/* <Image src='/images/clip-art-snacks-12.jpg' height={300} width={300} alt='logo'/> */}
    </div>
  )
}
