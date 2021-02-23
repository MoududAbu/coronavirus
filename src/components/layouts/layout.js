import Head from 'next/head'
import Logo from '../logo/logo'
import styles from './layout.module.css'


const Layout = ({ children, title = 'Coronvirus tracker' }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Created by Moudud Abu</footer>
    </div>
  )
}

export default Layout;