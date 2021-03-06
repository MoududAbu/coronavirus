import React, { useState } from 'react';
import { ArrowUpward, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import styles from './countriesTable.module.css';
import Link from 'next/link';

const formatNumber = (number) => {
	return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const orderBy = (countries, value, direction) => {
	if (direction === 'asc') {
		return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
	}

	if (direction === 'desc') {
		return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
	}

	return countries;
};

const SortArrow = ({ direction }) => {
	if (!direction) {
		return <></>;
	}

	if (direction === 'desc') {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowDownRounded color="inherit" />
			</div>
		);
	} else {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowUpRounded color="inherit" />
			</div>
		);
	}
};

const renderRow = (orderedCountries) => {
	return orderedCountries.map((country, index) => (
		// <Link key={index} href={`/country/${country.alpha3Code}`}>
		<div className={styles.row}>
			<div className={styles.arrow}>
				{(country.todayCases !== 0 || country.todayDeaths !== 0) && <ArrowUpward className={styles.arrowIcon}/>}
			</div>
			<div className={styles.name}>{country.name}</div>
			<div className={styles.cases}>{formatNumber(country.cases)}</div>
			<div className={styles.todayCases}>{country.todayCases ? formatNumber(country.todayCases) : ''}</div>
			<div className={styles.deaths}>{formatNumber(country.deaths)}</div>
			<div className={styles.todayDeaths}>{country.todayDeaths ? formatNumber(country.todayDeaths): ''}</div>
			<div className={styles.recovered}>{country.recovered ? formatNumber(country.recovered) : 'n/a'}</div>
		</div>
		// </Link>
	));
};

const CountriesTable = ({ countries }) => {
	const [direction = 'desc', setDirection] = useState();
	const [value = 'cases', setValue] = useState();

	const orderedCountries = orderBy(countries, value, direction);

	const switchDirection = () => {
		if (!direction) {
			setDirection('desc');
		} else if (direction === 'desc') {
			setDirection('asc');
		} else if (direction === 'asc') {
			setDirection('desc');
		}
	};

	const setValueAndDirection = (value) => {
		switchDirection();
		setValue(value);
	};

	return (
		<div>
			<div className={styles.heading}>
				<div className={styles.heading_flag}></div>
				<button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
					<div>Name</div>
					{value === 'name' && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_cases} onClick={() => setValueAndDirection('cases')}>
					<div>Cases</div>
					{value === 'cases' && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_todayCases} onClick={() => setValueAndDirection('todayCases')}>
					<div>New Cases</div>
					{value === 'todayCases' && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_deaths} onClick={() => setValueAndDirection('deaths')}>
					<div>Deaths</div>
					{value === 'deaths' && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_todayDeaths} onClick={() => setValueAndDirection('todayDeaths')}>
					<div>New Deaths</div>
					{value === 'todayDeaths' && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_recovered} onClick={() => setValueAndDirection('recovered')}>
					<div>Recovered</div>
					{value === 'recovered' && <SortArrow direction={direction} />}
				</button>
			</div>
			{renderRow(orderedCountries)}
		</div>
	);
};

export default CountriesTable;
