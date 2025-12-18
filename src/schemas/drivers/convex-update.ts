import z from "zod"

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
export const ConvexUpdate = z.object({
    provider_url: UrlSchema.describe("The URL of the ELD provider"),
    username: z.string().describe("The driver's login username"),
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
}).describe("Schema for updating driver ELD status information");
export type ConvexUpdate = z.infer<typeof ConvexUpdate>;