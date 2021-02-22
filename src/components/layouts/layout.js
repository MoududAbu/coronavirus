import Head from 'next/head'
import Logo from '../logo/logo'
import styles from './layout'


const Layout = ({children}) => {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Logo />
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>footer</footer>
      </div>
    )
  }

  export default Layout;