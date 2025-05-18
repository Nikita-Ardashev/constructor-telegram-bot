'use client';

import DefaultField from '@/components/ui/defaultFields/defaultField';
import { REGEX_TELEGRAM_BOT_API_KEY } from '@/constants/regex';
import React, { useState } from 'react';
import { z } from 'zod';

const ZProfile = z.object({
	apiKey: z.string().regex(REGEX_TELEGRAM_BOT_API_KEY),
});

export default function Profile() {
	const [isEditable, setIsEditable] = useState(false);

	return (
		<div>
			<DefaultField
				title="Вставьте API-KEY Telegram"
				errorText="error"
				icon={'globe.svg'}
				isReversed
				inputProps={{
					disabled: isEditable,
				}}
			/>
		</div>
	);
}
