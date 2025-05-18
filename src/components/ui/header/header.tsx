import { Links } from '@/utils/getRoutes';
import styles from './header.module.sass';

export default function Header() {
	return (
		<header className={styles.header}>
			<div>
				<Links />
			</div>
		</header>
	);
}
