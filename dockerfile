FROM node:20-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim AS production
WORKDIR /app
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=base /app/dist ./dist
COPY --from=base /app/api ./api
COPY --from=base /app/contracts ./contracts
COPY --from=base /app/db ./db
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/drizzle.config.ts ./
COPY --from=base /app/tsconfig*.json ./
EXPOSE 3000
CMD ["npm", "start"]
