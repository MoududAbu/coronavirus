import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import styles from './country.module.css';

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

	return await res.json();
};

const Country = ({ country }) => {
	const [borderCountries, setBorderCountries] = useState([]);

	const getBorderCountries = async () => {
		const borders = await Promise.all(country.borders.map((border) => getCountry(border)));

		setBorderCountries(borders);
	};

	useEffect(() => {
		getBorderCountries();
	});

	return (
		<Layout title={country.name}>
			<div className={styles.container}>
				<div className={styles.container_left}>
					<div className={styles.overview_panel}>
						<img src={country.flag} alt={country.name}></img>
						<h1 className={styles.overview_name}>{country.name}</h1>
						<div className={styles.overview_region}>{country.region}</div>
						<div className={styles.overview_numbers}>
							<div className={styles.overview_population}>
								<div className={styles.overview_value}>{country.population}</div>
								<div className={styles.overview_label}>Population</div>
							</div>
							<div className={styles.overview_area}>
								<div className={styles.overview_value}>{country.area}</div>
								<div className={styles.overview_label}>Area</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.container_right}>
					<div className={styles.details_panel}>
						<h4 className={styles.details_panel_heading}>Details</h4>
						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_row_label}>Capital</div>
							<div className={styles.details_panel_row_value}>{country.capital}</div>
						</div>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_row_label}>Languages</div>
							<div className={styles.details_panel_row_value}>
								{country.languages.map(({ name }) => name).join(', ')}
							</div>
						</div>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_row_label}>Currencies</div>
							<div className={styles.details_panel_row_value}>
								{country.currencies.map(({ name }) => name).join(', ')}
							</div>
						</div>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_row_label}>Native Name</div>
							<div className={styles.details_panel_row_value}>{country.nativeName}</div>
						</div>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_row_label}>Gini</div>
							<div className={styles.details_panel_row_value}>{country.gini || 0}%</div>
						</div>

						<div className={styles.details_panel_borders}>
							<div className={styles.details_panel_borders_label}>Bordering Countries</div>

							<div className={styles.details_panel_borders_container}>
								{borderCountries.map(({ flag, name }) => (
									<div key={name} className={styles.details_panel_borders_country}>
										<img src={flag} alt={name}></img>
										<div className={styles.details_panel_borders_name}>{name}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getStaticPaths = async () => {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	const paths = countries.map((country) => ({
		params: { id: country.alpha3Code },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: {
			country,
		},
	};
};
