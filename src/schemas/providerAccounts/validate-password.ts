import { z } from 'zod';

export const ValidatePasswordRequestSchema = z.object({
    providerAccountId: z.string().min(1)
        .describe("The unique identifier of the provider account in postgres to validate the password for"),
    encryptedPassword: z.string().min(1)
        .describe("The encrypted password to validate against the stored password"),
}).describe("Request schema for validating a provider account password");
export type ValidatePasswordRequest = z.infer<typeof ValidatePasswordRequestSchema>;

export const ValidatePasswordResponseSchema = z.object({
    isValid: z.boolean().describe("Indicates if the provided password is valid"),
    driverIds: z.array(z.string()).describe("List of driver IDs associated with the provider account"),
}).describe("Response schema for password validation");
export type ValidatePasswordResponse = z.infer<typeof ValidatePasswordResponseSchema>;