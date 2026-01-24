import z from "zod"

// Explicit interfaces for clean type exports
export interface ConvexDriverData {
    driver_name?: string;
    vehicle_id?: string;
    driver_status: string;
    time_remaining_in_shift: number;
    time_remaining_till_break: number;
    time_remaining_in_week: number;
    time_remaining_in_drive: number;
    driver_current_location_latitude: number;
    driver_current_location_longitude: number;
    driver_current_location_address: string;
    license_number?: string;
    license_state?: string;
    speed?: number;
    odometer?: number;
    convex_provider_account_id: string;
    external_provider_account_id: string;
    external_driver_id: string;
    mileage_since_last_update?: number;
}

export interface ConvexUpdateData {
    provider_url: string;
    username: string;
    drivers: ConvexDriverData[];
    version?: string;
}

export interface BatchConvexUpdateData {
    updates: ConvexUpdateData[];
}

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
export const ConvexDriverSchema = z.object({
    driver_name: z.string().optional().describe("The driver's full name"),
    vehicle_id: z.string().optional().describe("The vehicle ID"),
    driver_status: z.string().describe("The driver's duty status (direct from ELD)"),
    time_remaining_in_shift: z.number().describe("Seconds remaining in current shift"),
    time_remaining_till_break: z.number().describe("Seconds remaining until next required break"),
    time_remaining_in_week: z.number().describe("Seconds remaining in current cycle/week"),
    time_remaining_in_drive: z.number().describe("Seconds remaining in current drive period"),
    driver_current_location_latitude: z.number().describe("Driver's current latitude"),
    driver_current_location_longitude: z.number().describe("Driver's current longitude"),
    driver_current_location_address: z.string().describe("Driver's current address"),
    license_number: z.string().optional().describe("The driver's license number"),
    license_state: z.string().optional().describe("The state that issued the driver's license"),
    speed: z.number().optional().describe("The vehicle's current speed in mph"),
    odometer: z.number().optional().describe("The vehicle's current odometer reading in miles"),
    convex_provider_account_id: z.string().describe("The Convex ELD provider account ID"),
    external_provider_account_id: z.string().describe("The provider account ID on backend"),
    external_driver_id: z.string().describe("The driver ID on backend"),
    mileage_since_last_update: z.number().optional().describe("Mileage since last update in miles"),
}).describe("An object containing driver ELD status information");

export const ConvexUpdateSchema = z.object({
    provider_url: UrlSchema.describe("The URL of the ELD provider"),
    username: z.string().describe("The ELD account's login username"),
    drivers: z.array(ConvexDriverSchema).describe("An array of driver ELD status updates"),
    version: z.string().default("2.7.0").describe("The version of the Convex ELD API being used"),
}).describe("Schema for updating driver ELD status information");

export const BatchConvexUpdateSchema = z.object({
    updates: z.array(ConvexUpdateSchema).describe("An array of Convex ELD driver updates"),
}).describe("Schema for batch updating driver ELD status information");

// Backward compatibility aliases (deprecated - use *Schema and *Data versions)
export const ConvexUpdate = ConvexUpdateSchema;
export type ConvexUpdate = ConvexUpdateData;

export const BatchConvexUpdate = BatchConvexUpdateSchema;
export type BatchConvexUpdate = BatchConvexUpdateData;
