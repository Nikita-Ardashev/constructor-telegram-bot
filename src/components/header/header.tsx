import { Links } from '@/utils/getRoutes';
import styles from '@styles/components/header.module.sass';

export default function Header() {
	return (
		<header className={styles.header}>
			<div>
				<Links />
			</div>
		</header>
	);
}
