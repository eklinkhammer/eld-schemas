import z from "zod";

export enum ScrapeStatus {
    NEW_LOGIN_RECEIVED = "NEW_LOGIN_RECEIVED",
    LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    DATA_FETCH_IN_PROGRESS = "DATA_FETCH_IN_PROGRESS",
    DATA_FETCH_SUCCESS = "DATA_FETCH_SUCCESS",
    DATA_FETCH_FAILED = "DATA_FETCH_FAILED",
}

export const UpdateScrapeStatusMessage = z.object({
    status: z.nativeEnum(ScrapeStatus).describe("The current status of the scrape process"),
    externalProviderAccountId: z.string().describe("The external identifier for the provider account"),
    username: z.string().describe("The username of the provider account whose status is being updated"),
    provider_url: z.string().describe("The URL of the ELD provider"),
}).describe("Schema for update status messages");
export type UpdateScrapeStatusMessage = z.infer<typeof UpdateScrapeStatusMessage>;