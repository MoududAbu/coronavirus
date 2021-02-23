import Head from 'next/head'
import Layout from '../components/layouts/layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/searchInput/searchInput';
import CountriesTable from '../components/countriesTable/countriesTable';

export default function Home({ countries }) {
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput placeholder="filter by Name, Region or Sub Region" />
      <CountriesTable countries={countries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries
    }
  }
}