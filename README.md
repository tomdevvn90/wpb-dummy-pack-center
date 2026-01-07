# WPB Dummy Pack Center

A TypeScript Express API server for managing and serving WordPress theme packages with Cloudflare R2 integration. This service provides authenticated access to theme packages and generates time-limited signed URLs for secure file downloads.

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ 
- **npm** or **yarn**
- **Vercel CLI** (for development and deployment)
- **Cloudflare R2** account with bucket and API credentials 

### Installation

```bash
# Clone and install
git clone <repository-url>
cd wpb-dummy-pack-center
npm install

# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Configure environment
cp .env-exam .env  # If template exists, or create manually
```

### Environment Variables

#### Local Development

Create a `.env` file in the root directory:

```env
PORT=3000
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET=your_bucket_name
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
```

#### Vercel Deployment

Set environment variables in Vercel:

1. **Via CLI:**
```bash
vercel env add R2_ACCESS_KEY_ID
vercel env add R2_SECRET_ACCESS_KEY
vercel env add R2_BUCKET
vercel env add R2_ENDPOINT
```

2. **Via Dashboard:**
   - Go to your project → Settings → Environment Variables
   - Add each variable for Production, Preview, and Development environments

**Note:** `vercel dev` automatically loads variables from `.env` file or Vercel project settings.

### Development

#### Option 1: Vercel CLI (Recommended)

```bash
# Start development server with Vercel
vercel dev
```

This will:
- Start a local development server that mimics Vercel's production environment
- Automatically load environment variables from `.env` or Vercel project settings
- Provide hot-reload functionality
- Run on `http://localhost:3000` (or Vercel's default port)

#### Option 2: Standard Node.js Development

```bash
# Development with hot-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

The server runs on `http://localhost:3000` (or your configured `PORT`).

### Deployment

#### Deploy to Vercel

```bash
# First-time deployment (login and link project)
vercel

# Deploy to production
vercel --prod

# Deploy preview (staging)
vercel
```

**Note:** Make sure to set environment variables in Vercel dashboard:
- Go to your project settings → Environment Variables
- Add all required variables: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT`

## 📁 Project Structure

```
├── api/
│   └── index.ts             # Vercel serverless entry point (exports Express app)
├── src/
│   ├── app.ts               # Express app configuration & middleware setup
│   ├── server.ts            # Standalone server entry point (for npm start)
│   ├── controllers/         # Request handlers
│   │   └── package.controller.ts
│   ├── services/            # Business logic layer
│   │   └── package.service.ts
│   ├── routes/              # API route definitions
│   │   ├── index.ts        # Main router (mounts sub-routes)
│   │   └── package.routes.ts
│   ├── middlewares/         # Express middlewares
│   │   └── auth.middleware.ts
│   ├── data/               # Static data
│   │   └── themes.ts
│   ├── types/              # TypeScript type definitions
│   │   └── themes.ts
│   └── util/               # Utility functions
│       └── libs.ts
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies and scripts
```

**Vercel Configuration:**
- `api/index.ts` is the serverless function entry point for Vercel
- `vercel.json` routes all requests to the Express app
- The Express app from `src/app.ts` is exported and used by both Vercel and standalone server

## 🔌 API Endpoints

All endpoints are prefixed with `/api/packages` and require authentication via the `xxx-meta` header.

### Get Theme Information

Retrieve theme details and available packages.

**Endpoint:** `GET /api/packages/:theme_slug`

**Headers:**
- `xxx-meta` (required): Base64-encoded, reversed JSON payload containing license information

**Response:**
```json
{
  "name": "Theme Name",
  "description": "A premium WordPress theme...",
  "packages": [
    {
      "ID": "064e94a5-a9ea-4d49-950e-993a19e48bf5",
      "name": "Dummy Package Name",
      "description": "...",
      "image": "https://...",
      "preview_url": "https://...",
      "tags": ["woocommerce", "staging"],
      "size": "207.4MB",
      "createdAt": "2024-02-10T09:15:00.000Z",
      "updatedAt": "2024-03-18T16:45:00.000Z",
      "required": [...],
      "required_plugins": [...],
      "r2_file": "Dummy-Pack-Path-From-Cloudflare-R2.zip"
    }
  ]
}
```

**Example:**
```bash
curl -H "xxx-meta: <base64-encoded-payload>" \
  http://localhost:3000/api/packages/woozio
```

### Get Package Download URL

Generate a signed download URL for a specific package file.

**Endpoint:** `GET /api/packages/:theme_slug/:package_id`

**Headers:**
- `xxx-meta` (required): Base64-encoded, reversed JSON payload containing license information

**Response:**
```json
{
  "signedUrl": "https://signed-r2-url...",
  "size": 217456640,
  "unit": "bytes",
  "mime": "application/zip",
  "lastModified": "2024-03-18T16:45:00.000Z",
  "etag": "\"abc123...\""
}
```

**Example:**
```bash
curl -H "xxx-meta: <base64-encoded-payload>" \
  http://localhost:3000/api/packages/woozio/064e94a5-a9ea-4d49-950e-993a19e48bf5
```

## 🔐 Authentication

The API uses a custom authentication mechanism via the `xxx-meta` header. The header contains a base64-encoded, reversed JSON payload.

### Payload Format

The decoded payload should contain:
```json
{
  "domain": "http://example.com",
  "ip": "192.168.1.1",
  "admin_email": "admin@example.com",
  "license_key": "your-license-key",
  "wordpress_version": "6.9",
  "php_version": "8.4.10",
  "theme_slug": "themeslug",
  "theme_version": "1.0"
}
```

### Authentication Flow

1. Client encodes the payload: Base64 → Reverse string → URL encode
2. Server decodes: URL decode → Reverse string → Parse JSON
3. Middleware validates `license_key` field
4. Missing or invalid `license_key` returns `401 Unauthorized`

### Implementation Details

The authentication middleware (`src/middlewares/auth.middleware.ts`) uses `decodePayload()` from `src/util/libs.ts`:

```typescript
// Encoding process (client-side):
const payload = JSON.stringify({ license_key: "...", ... });
const reversed = payload.split('').reverse().join('');
const encoded = btoa(unescape(encodeURIComponent(reversed)));

// Decoding process (server-side):
const decoded = decodePayload(encoded); // Returns parsed object or null
```

## 🏗️ Architecture

### Request Flow

```
Client Request
    ↓
Express App (app.ts)
    ↓
Auth Middleware (validates xxx-meta header)
    ↓
Route Handler (package.routes.ts)
    ↓
Controller (package.controller.ts)
    ↓
Service (package.service.ts) → R2/S3 Client
    ↓
Response (JSON)
```

### Key Components

- **Controllers**: Handle HTTP requests, validate params, call services
- **Services**: Business logic, R2 operations, signed URL generation
- **Middlewares**: Global authentication applied to all routes
- **Data Layer**: Static theme/package definitions (can be migrated to DB)

### R2 Integration

The service uses AWS SDK v3's S3-compatible client for Cloudflare R2:

- **Signed URLs**: 1-hour expiration (configurable in `package.service.ts`)
- **Metadata**: Fetches file metadata (size, mime type, etag) before URL generation
- **Region**: Set to `'auto'` for R2 compatibility

## 🛠️ Development

### Adding a New Theme

1. Add theme definition to `src/data/themes.ts`:
```typescript
export const themes: Record<string, Theme> = {
  your-theme: {
    name: "Your Theme Name",
    description: "...",
    packages: [...]
  }
};
```

2. Ensure the `r2_file` path in packages matches your R2 bucket structure

### Modifying Authentication

Edit `src/middlewares/auth.middleware.ts` to:
- Add additional payload validation
- Implement license key verification against a database
- Add rate limiting or IP restrictions

### Extending API

1. Add route in `src/routes/package.routes.ts`
2. Create controller method in `src/controllers/package.controller.ts`
3. Add service logic in `src/services/package.service.ts` if needed

## 📦 Dependencies

### Core
- **express** ^5.2.1 - Web framework
- **typescript** ^5.9.3 - Type safety
- **@aws-sdk/client-s3** ^3.962.0 - R2/S3 client
- **@aws-sdk/s3-request-presigner** ^3.962.0 - Signed URL generation

### Security & Middleware
- **helmet** ^8.1.0 - Security headers
- **cors** ^2.8.5 - CORS support
- **morgan** ^1.10.1 - HTTP request logging

### Development
- **ts-node-dev** ^2.0.0 - Hot-reload development server
- **dotenv** ^17.2.3 - Environment variable management

### Available (not currently used)
- **joi** ^18.0.2 - Input validation
- **bcrypt** ^6.0.0 - Password hashing
- **jsonwebtoken** ^9.0.3 - JWT tokens

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env or kill existing process
lsof -ti:3000 | xargs kill -9
```

### Vercel CLI Issues

**`vercel dev` not working:**
- Ensure Vercel CLI is installed: `npm install -g vercel`
- Login to Vercel: `vercel login`
- Link project: `vercel link` (if not already linked)

**Environment variables not loading:**
- Check `.env` file exists in project root
- Verify variables are set in Vercel dashboard
- Restart `vercel dev` after adding new variables

**Deployment errors:**
- Check `vercel.json` configuration
- Ensure `api/index.ts` exists and exports the Express app
- Review build logs: `vercel logs`

### R2 Connection Errors
- Verify credentials in `.env` (local) or Vercel environment variables (deployed)
- Check bucket exists and is accessible
- Ensure endpoint URL format: `https://<account-id>.r2.cloudflarestorage.com`
- Verify R2 API tokens have correct permissions

### TypeScript Compilation Errors
```bash
npm run build  # See detailed errors
```

### Authentication Failures
- Verify `xxx-meta` header encoding matches expected format
- Check `license_key` exists in decoded payload
- Review `src/util/libs.ts` decode logic

## 📝 Notes

- All routes are protected by global `authMiddleware`
- Signed URLs expire after 1 hour (configurable in `package.service.ts`)
- Theme data is currently static; consider migrating to a database for production
- Error handling middleware is available but commented out in `app.ts`
- **Vercel Deployment**: The project is configured for serverless deployment on Vercel
  - Uses `api/index.ts` as the serverless function entry point
  - All routes are handled by a single Express app instance
  - Environment variables should be set in Vercel dashboard for production

## 📄 License

ISC

