import { z }  from "zod";

export const NewHonkOrganizationRequest = z.object({
    name: z.string().min(1)
        .describe("The name of the organization"),
    domain: z.string().min(1).optional()
        .describe("The domain associated with the organization"),
    dot_number: z.string().min(1).optional()
        .describe("The DOT number of the organization"),
});

export const NewHonkOrganizationSuccessResponse = z.object({
    id: z.string()
        .describe("The unique identifier for the newly created Honk organization"),
    name: z.string().min(1)
        .describe("The name of the organization"),
    domain: z.string().min(1).optional()
        .describe("The domain associated with the organization"),
    dot_number: z.string().min(1).optional()
        .describe("The DOT number of the organization"),
    created_at: z.coerce.date()
        .describe("Timestamp when the organization was created"),
    updated_at: z.coerce.date()
        .describe("Timestamp when the organization was last updated"),
});

export const NewHonkOrganizationFailureResponse = z.object({
    error: z.string()
        .describe("A message describing why the organization creation failed"),
});

export const NewHonkOrganizationResponse = z.union([
    NewHonkOrganizationSuccessResponse,
    NewHonkOrganizationFailureResponse,
]);

export const AssignUserToOrganizationRequest = z.object({
    user_id: z.string()
        .describe("The unique identifier of the user to assign"),
    organization_id: z.string()
        .describe("The unique identifier of the organization to assign the user to"),
    permission_level: z.enum(["admin", "member"])
        .describe("The permission level to assign to the user within the organization"),
    driver_whitelist: z.array(z.string()).optional()
        .describe("An optional list of driver IDs that the user is allowed to access"),
    driver_blacklist: z.array(z.string()).optional()
        .describe("An optional list of driver IDs that the user is not allowed to access"),
});

export const AssignUserToOrganizationSuccessResponse = z.object({
    user_id: z.string()
        .describe("The unique identifier of the assigned user"),
    organization_id: z.string()
        .describe("The unique identifier of the organization"),
    permission_level: z.enum(["admin", "member"])
        .describe("The permission level assigned to the user within the organization"),
    driver_list: z.array(z.string()).optional()
        .describe("The list of driver IDs that the user is allowed to access"),
});

export const AssignUserToOrganizationFailureResponse = z.object({
    error: z.string()
        .describe("A message describing why the user assignment failed"),
});

export const AssignUserToOrganizationResponse = z.union([
    AssignUserToOrganizationSuccessResponse,
    AssignUserToOrganizationFailureResponse,
]);