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
    providerUrl: UrlSchema,
    username: z.string().min(1),
    encryptedPassword: z.string().min(1),
    ownerId: z.string(),
    externalProviderAccountId: z.string()
});
type NewLoginRequest = z.infer<typeof NewLoginRequest>;

const PublicUser = z.object({
    id: z.string(),
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
    message: z.string(),
    user: PublicUser,
    provider: PublicProvider,
    driverIds: z.array(z.string())
      .describe("An array of driver IDs associated with the login"),
    organizationId: z.string().optional(),
    honkUserId: z.string().optional(),
});

export const NewLoginResponseFailure = z.object({
    error: z.string(),
});

export const NewLoginResponse = z.union([NewLoginResponseSuccess, NewLoginResponseFailure]);