import { z } from 'zod';

const UrlSchema = z.string().refine(
  (val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Invalid URL" }
);
export const NewLoginRequest = z.object({
    dispatcher_id: z.string().min(1),
    providerUrl: UrlSchema,
    username: z.string().min(1),
    password: z.string().min(1),
});

const PublicUser = z.object({
    id: z.string(),
    dispatcher_id: z.string(),
    username: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
});
type PublicUser = z.infer<typeof PublicUser>;

const PublicProvider = z.object({
    name: z.string(),
    url: UrlSchema,
});
type PublicProvider = z.infer<typeof PublicProvider>;

export const NewLoginResponseSuccess = z.object({
    success: z.literal(true),
    message: z.string(),
    user: PublicUser,
    provider: PublicProvider,
});
export const NewLoginResponseFailure = z.object({
    success: z.literal(false),
    error: z.string(),
});
export const NewLoginResponse = z.union([NewLoginResponseSuccess, NewLoginResponseFailure]);