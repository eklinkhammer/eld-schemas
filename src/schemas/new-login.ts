import { z } from 'zod';

export const NewLoginRequest = z.object({
    dispatcher_id: z.string().min(1),
    providerUrl: z.string().url(),
    username: z.string().min(1),
    password: z.string().min(1),
    integrationId: z.string().min(1),
});
