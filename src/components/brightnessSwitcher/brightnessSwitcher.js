import styles from './brightnessSwitcher.module.css';
import { Brightness6Rounded } from '@material-ui/icons';

const BrightnessSwitcher = () => {
	return (
		<button className={styles.themeSwitcher}>
			<Brightness6Rounded />
		</button>
	);
};

export default BrightnessSwitcher;
