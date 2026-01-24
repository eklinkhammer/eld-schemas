# AI Instructions for eld-schemas

This is `@findatruck/shared-schemas` - a Zod schema library providing validation schemas for findatruck backend services.

## Project Overview

- **Package name**: `@findatruck/shared-schemas`
- **Version**: 2.8.0
- **Purpose**: Shared Zod schemas for ELD (Electronic Logging Device) data validation
- **Consumers**: eld-aggregator, Convex workers, and other findatruck services

## Schemas

### Provider Accounts (`src/schemas/providerAccounts/`)
- **new-login.ts**: `NewLoginRequest`, `NewLoginResponseSuccess`, `NewLoginResponseFailure`, `NewLoginResponse`
- **update-status.ts**: `ScrapeStatus` (enum), `UpdateScrapeStatusMessage`
- **validate-password.ts**: `ValidatePasswordRequestSchema`, `ValidatePasswordResponseSchema`

### Drivers (`src/schemas/drivers/`)
- **convex-update.ts**: `ConvexUpdate`, `BatchConvexUpdate`

### Security (`src/security/`)
- **transit-crypto.ts**: RSA-OAEP encryption utilities (Node.js only)

## Entry Points

- `src/index.ts` - Full Node.js version (includes crypto utilities)
- `src/browser.ts` - Browser-safe version (excludes Node.js crypto)

## Type Export Pattern

Each schema exports both the Zod schema and inferred type with the same name:
```typescript
export const NewLoginRequest = z.object({ ... });
export type NewLoginRequest = z.infer<typeof NewLoginRequest>;
```

Consumers can use either:
- `import { NewLoginRequest } from '@findatruck/shared-schemas'` - gets the schema
- `import type { NewLoginRequest } from '@findatruck/shared-schemas'` - gets the type

## Commands

- **Build**: `npm run build` (uses tsup, outputs ESM/CJS to `dist/`)
- **Test**: `npm run test`
- **Watch tests**: `npm run test:watch`

## Publishing

Uses Changesets for versioning:
1. `npx changeset` to create a changeset
2. `npx changeset version` to bump version
3. `npm publish --access public` to publish

## Dependencies

- **Peer**: `zod ^4.1.11` (consumers must install)
- Uses Zod 4 features - note `.url()` and `.uuid()` are deprecated in Zod 4

## Integration Notes

When consuming in Fastify with `fastify-type-provider-zod`:
- Import schemas directly for route schema definitions
- Import types for generic type parameters
- Fastify validates automatically - avoid redundant `safeParse` calls
