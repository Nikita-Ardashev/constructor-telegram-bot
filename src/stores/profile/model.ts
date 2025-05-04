import { REGEX_TELEGRAM_BOT_API_KEY } from '@/constants/regex';
import { t } from 'mobx-state-tree';
import { SessionContextValue } from 'next-auth/react';
import { z } from 'zod';

const ZApiKey = z.string().regex(REGEX_TELEGRAM_BOT_API_KEY);

export const ProfileModel = t
	.model({
		apiKey: t.maybeNull(t.string),
		expires: t.maybeNull(t.union(t.Date, t.string)),
		name: t.maybeNull(t.string),
		image: t.maybeNull(t.string),
		email: t.maybeNull(t.string),
	})
	.views((self) => ({
		get getProfile() {
			return self;
		},
	}))
	.actions((self) => ({
		setProfile(session: SessionContextValue) {
			self.expires = new Date(session.data?.expires ?? '');

			Object.assign(self, session.data?.user);
		},
		setApiKey(apiKey: z.infer<typeof ZApiKey>) {
			self.apiKey = apiKey;
		},
	}));
