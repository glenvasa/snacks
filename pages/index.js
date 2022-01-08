import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SNACKS! - Food Ordering App</title>
        <meta name="description" content="Customize and order your favorite snacks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Featured/>
    </div>
  )
}
