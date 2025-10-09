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
    username: z.string().describe("The username of the driver whose status is being updated"),
    providerUrl: z.string().describe("The URL of the ELD provider"),
    password: z.string().describe("The encrypted password of the driver whose status is being updated"),
}).describe("Schema for update status messages");
export type UpdateScrapeStatusMessage = z.infer<typeof UpdateScrapeStatusMessage>;