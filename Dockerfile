# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# Copy source
COPY . .

# Build
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Cloud Run will inject PORT=8080
ENV PORT=8080

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/pages ./pages

# Expose Cloud Run port
EXPOSE 8080

# Start Next.js using Cloud Run PORT
CMD ["npm", "start"]
