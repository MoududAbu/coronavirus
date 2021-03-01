import Head from 'next/head';
import { useEffect, useState } from 'react';
import Logo from '../logo/logo';
import styles from './layout.module.css';
import BrightnessSwitcher from '../brightnessSwitcher/brightnessSwitcher';

const switchTheme = ({ theme, setTheme }) => {
	switch (theme) {
		case 'light':
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
			document.documentElement.setAttribute('data-theme', 'dark');
			break;
		case 'dark':
			setTheme('light');
			localStorage.setItem('theme', 'light');
			document.documentElement.setAttribute('data-theme', 'light');
			break;
		default:
			setTheme('light');
			localStorage.setItem('theme', 'light');
			document.documentElement.setAttribute('data-theme', 'light');
			break;
	}
};

const Layout = ({ children, title = 'Coronameter' }) => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
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
