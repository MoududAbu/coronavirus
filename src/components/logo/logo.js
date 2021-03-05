import Link from 'next/link';
import styles from './logo.module.css';

const Logo = () => {
	return (
		<Link href="/">
			<img className={styles.logo} src="/coronameter-logo.png" alt="Logo"/>
		</Link>
	);
};

export default Logo;
