import Layout from '../components/layout/layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/searchInput/searchInput';
import CountriesTable from '../components/countriesTable/countriesTable';
import { useState } from 'react';

export default function Home({ countries }) {
	const [keyword, setKeyword] = useState('');

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(keyword)
	);

	const onInputChange = (e) => {
		e.preventDefault();

		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<Layout>
			<div className={styles.inputContainer}>
				<div className={styles.counts}>Found {countries.length} countries</div>
				<div className={styles.input}>
					<SearchInput placeholder="filter by Name" onChange={onInputChange} />
				</div>
			</div>
			<CountriesTable countries={filteredCountries} />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const res = await fetch('https://covid-19-node.herokuapp.com/countries');
	const countries = await res.json();

	return {
		props: {
			countries,
		},
	};
};
