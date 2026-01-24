import { z } from 'zod';

// Explicit interfaces for clean type exports (these bypass Zod's complex generic types)
export interface NewLoginRequestData {
    providerUrl: string;
    username: string;
    encryptedPassword: string;
    ownerId: string;
    externalProviderAccountId: string;
    convexUpdateUrl: string;
}

export interface PublicUserData {
    id: string;
    username: string;
    created_at: Date;
    updated_at: Date;
}

export interface PublicProviderData {
    name: string;
    url: string;
}

export interface NewLoginResponseSuccessData {
    success?: boolean;
    message: string;
    user: PublicUserData;
    provider: PublicProviderData;
    driverIds: string[];
    organizationId?: string;
    honkUserId?: string;
}

export interface NewLoginResponseFailureData {
    success?: boolean;
    error: string;
}

export type NewLoginResponseData = NewLoginResponseSuccessData | NewLoginResponseFailureData;

// URL validation schema
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

// Zod schemas for runtime validation
export const NewLoginRequestSchema = z.object({
    providerUrl: UrlSchema,
    username: z.string().min(1),
    encryptedPassword: z.string().min(1),
    ownerId: z.string(),
    externalProviderAccountId: z.string(),
    convexUpdateUrl: z.string().url().describe("The Convex function URL to send updates to"),
});

const PublicUserSchema = z.object({
    id: z.string(),
    username: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
});

const PublicProviderSchema = z.object({
    name: z.string(),
    url: UrlSchema,
});

export const NewLoginResponseSuccessSchema = z.object({
    success: z.boolean().optional(),
    message: z.string(),
    user: PublicUserSchema,
    provider: PublicProviderSchema,
    driverIds: z.array(z.string())
      .describe("An array of driver IDs associated with the login"),
    organizationId: z.string().optional(),
    honkUserId: z.string().optional(),
});

export const NewLoginResponseFailureSchema = z.object({
    success: z.boolean().optional(),
    error: z.string(),
});

export const NewLoginResponseSchema = z.union([NewLoginResponseSuccessSchema, NewLoginResponseFailureSchema]);

// Backward compatibility aliases (deprecated - use *Schema and *Data versions)
export const NewLoginRequest = NewLoginRequestSchema;
export type NewLoginRequest = NewLoginRequestData;

export const NewLoginResponseSuccess = NewLoginResponseSuccessSchema;
export type NewLoginResponseSuccess = NewLoginResponseSuccessData;

export const NewLoginResponseFailure = NewLoginResponseFailureSchema;
export type NewLoginResponseFailure = NewLoginResponseFailureData;

export const NewLoginResponse = NewLoginResponseSchema;
export type NewLoginResponse = NewLoginResponseData;
