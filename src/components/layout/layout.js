import Head from 'next/head';
import { useEffect, useState } from 'react';
import Logo from '../logo/logo';
import styles from './layout.module.css';
import BrightnessSwitcher from '../brightnessSwitcher/brightnessSwitcher';

const switchTheme = ({ theme, setTheme }) => {
	switch (theme) {
		case 'light':
			saveTheme('dark', setTheme);
			break;
		case 'dark':
			saveTheme('light', setTheme);
			break;
		default:
			saveTheme('light', setTheme);
			break;
	}
};

const saveTheme = (theme, setTheme) => {
	setTheme(theme);
	localStorage.setItem('theme', theme);
	document.documentElement.setAttribute('data-theme', theme);
};

const Layout = ({ children, title = 'Coronameter' }) => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		document.documentElement.setAttribute('data-theme', theme);
		setTheme(theme);
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className={styles.header}>
				<Logo />
				<BrightnessSwitcher switchTheme={switchTheme} theme={theme} setTheme={setTheme} />
			</header>

			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>Created by Moudud Abu</footer>
		</div>
	);
};

export default Layout;
