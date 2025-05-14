import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import styles from './page.module.sass';

export default memo(
	observer(function SettingsButton() {
		return <div className={styles.setting_button}></div>;
	}),
);
