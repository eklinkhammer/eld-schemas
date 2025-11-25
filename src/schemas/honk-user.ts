import { z } from "zod";

export const NewHonkUserRequest = z.object({
    email: z.string().email().optional()
        .describe("The user's email address"),
    phone: z.string().min(1).optional()
        .describe("The user's phone number (to support SMS-based login)"),
    organization: z.string().optional()
        .describe("The organization the user belongs to"),
}).refine((data) => data.email || data.phone, {
    message: "At least one of email or phone must be provided",
});

export const NewHonkUserSuccessResponse = z.object({
    id: z.string()
        .describe("The unique identifier for the newly created Honk user"),
    email: z.string().email().optional()
        .describe("The user's email address"),
    phone: z.string().min(1).optional()
        .describe("The user's phone number (to support SMS-based login)"),
    organization: z.string().optional()
        .describe("The organization the user belongs to"),
    created_at: z.coerce.date()
        .describe("Timestamp when the user was created"),
    updated_at: z.coerce.date()
        .describe("Timestamp when the user was last updated"),
});

export const NewHonkUserFailureResponse = z.object({
    error: z.string()
        .describe("A message describing why the user creation failed"),
});

export const NewHonkUserResponse = z.union([
    NewHonkUserSuccessResponse,
    NewHonkUserFailureResponse,
]);

export const GetDriversHonkUserHasAccessToRequest = z.object({
    id: z.string()
        .describe("The unique identifier of the Honk user"),
});

export const GetDriversHonkUserHasAccessToSuccessResponse = z.object({
    driverIds: z.array(z.string())
        .describe("An array of driver IDs that the Honk user has access to"),
});

export const GetDriversHonkUserHasAccessToFailureResponse = z.object({
    error: z.string()
        .describe("A message describing why the request failed"),
});

export const GetDriversHonkUserHasAccessToResponse = z.union([
    GetDriversHonkUserHasAccessToSuccessResponse,
    GetDriversHonkUserHasAccessToFailureResponse,
]);