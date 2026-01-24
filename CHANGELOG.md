# @findatruck/shared-schemas

## 2.9.0

### Minor Changes

- Add explicit TypeScript interfaces for all schemas to fix ESLint unsafe assignment errors

  - Added explicit interfaces: `NewLoginRequestData`, `NewLoginResponseSuccessData`, `NewLoginResponseFailureData`, `PublicUserData`, `PublicProviderData`
  - Added explicit interfaces: `ValidatePasswordRequestData`, `ValidatePasswordResponseData`
  - Added explicit interfaces: `ConvexDriverData`, `ConvexUpdateData`, `BatchConvexUpdateData`
  - Added `Schema` suffix naming convention for Zod schemas (e.g., `NewLoginRequestSchema`)
  - Added `success` field to response schemas to match actual API usage
  - Maintained backward compatibility with existing exports

## 0.2.0

### Minor Changes

- Remove integrationId
