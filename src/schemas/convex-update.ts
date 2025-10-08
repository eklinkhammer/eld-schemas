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
    providerUrl: UrlSchema.describe("The URL of the ELD provider"),
    username: z.string().describe("The driver's login username"),
    password: z.string().describe("The driver's login password"),
    driver_id: z.string().optional().describe("The ELD's internal driver ID"),
    driver_first_name: z.string().optional().describe("The driver's first name"),
    driver_last_name: z.string().optional().describe("The driver's last name"),
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
}).describe("Schema for updating driver ELD status information");
export type ConvexUpdate = z.infer<typeof ConvexUpdate>;

export const HoursOfService = z.object({
    timeRemainingInShift: z.number().describe("Seconds remaining in current shift"),
    timeRemainingTillBreak: z.number().describe("Seconds remaining until next required break"),
    timeRemainingInWeek: z.number().describe("Seconds remaining in current cycle/week"),
    timeRemainingInDrive: z.number().describe("Seconds remaining in current drive period"),
}).describe("Schema for driver's hours of service information");
export type HoursOfService = z.infer<typeof HoursOfService>;

export const DriverLocation = z.object({
    latitude: z.number().describe("Driver's current latitude"),
    longitude: z.number().describe("Driver's current longitude"),
    address: z.string().describe("Driver's current address"),
}).describe("Schema for driver's current location information");
export type DriverLocation = z.infer<typeof DriverLocation>;

export const DriverStatus = z.object({
    status: z.string().describe("The driver's duty status (direct from ELD)"),
}).describe("Schema for driver's current duty status information");
export type DriverStatus = z.infer<typeof DriverStatus>;

export const DriverLogin = z.object({
    providerUrl: UrlSchema.describe("The URL of the ELD provider"),
    username: z.string().describe("The driver's login username"),
    password: z.string().describe("The driver's login password"),
}).describe("Schema for driver login information");
export type DriverLogin = z.infer<typeof DriverLogin>;

export const DriverIdentity = z.object({
    driverId: z.string().describe("The ELD's internal driver ID"),
    driverFirstName: z.string().optional().describe("The driver's first name"),
    driverLastName: z.string().optional().describe("The driver's last name"),
    driverName: z.string().optional().describe("The driver's full name"),
}).describe("Schema for identifying the driver");
export type DriverIdentity = z.infer<typeof DriverIdentity>;

export const VehicleIdentity = z.object({
    vehicleId: z.string().optional().describe("The vehicle ID"),
}).describe("Schema for identifying the vehicle");
export type VehicleIdentity = z.infer<typeof VehicleIdentity>;

export const ConvexUpdateNested = z.object({
    driver: DriverIdentity,
    vehicle: VehicleIdentity,
    hoursOfService: HoursOfService,
    driverLocation: DriverLocation,
    driverStatus: DriverStatus,
    driverLogin: DriverLogin,
}).describe("Nested schema for updating driver ELD status information");
export type ConvexUpdateNested = z.infer<typeof ConvexUpdateNested>;