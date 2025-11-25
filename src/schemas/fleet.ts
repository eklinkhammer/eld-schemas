import { z } from "zod";

export const NewFleetRequest = z.object({
    name: z.string().min(1)
        .describe("The name of the fleet"),
    description: z.string().min(1).optional()
        .describe("A brief description of the fleet"),
    organization_id: z.string().min(1)
        .describe("The unique identifier of the organization to which the fleet belongs"),
});

export const NewFleetSuccessResponse = z.object({
    id: z.string()
        .describe("The unique identifier for the newly created fleet"),
    name: z.string().min(1)
        .describe("The name of the fleet"),
    description: z.string().min(1).optional()
        .describe("A brief description of the fleet"),
    organization_id: z.string().min(1)
        .describe("The unique identifier of the organization to which the fleet belongs"),
    created_at: z.coerce.date()
        .describe("Timestamp when the fleet was created"),
    updated_at: z.coerce.date()
        .describe("Timestamp when the fleet was last updated"),
});

export const NewFleetFailureResponse = z.object({
    error: z.string()
        .describe("A message describing why the fleet creation failed"),
});

export const NewFleetResponse = z.union([
    NewFleetSuccessResponse,
    NewFleetFailureResponse,
]);