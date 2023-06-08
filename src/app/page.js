import Image from 'next/image'
import styles from './page.module.css'
import Images from '../components/images/images'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
    <Images></Images>

      </div>
    </main>
  )
}
