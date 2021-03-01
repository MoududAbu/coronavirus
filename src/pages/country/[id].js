import { StepLabel } from '@material-ui/core';
import Layout from '../../components/layout/layout';
import styles from './country.module.css';

const Country = ({ country }) => {
	return (
		<Layout title={country.name}>
			<div>
				<div className={styles.overview_panel}>
					<img src={country.flag} alt={country.name}></img>
					<h1 className={styles.overview_name}>{country.name}</h1>
					<div className={styles.overview_region}>{country.region}</div>
					<div className={styles.overview_numbers}>
						<div className={styles.overview_population}>
							<div className={styles.overview_value}>{country.population}</div>
							<div className={styles.overview_lable}>Population</div>
						</div>
						<div className={styles.overview_area}>
							<div className={styles.overview_value}>{country.area}</div>
							<div className={styles.overview_lable}>Area</div>
						</div>
					</div>
				</div>

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
						<div className={styles.details_panel_row_value}>{country.gini}%</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getServerSideProps = async ({ params }) => {
	const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);

	const country = await res.json();
	console.log(country);
	return {
		props: {
			country,
		},
	};
};
