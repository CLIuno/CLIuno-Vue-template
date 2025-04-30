# ---- Stage 1: Builder ----
    FROM node:lts-alpine3.21 AS builder

    ENV NODE_ENV=production
    
    WORKDIR /app
    RUN npm install -g pnpm npm-run-all2 http-server
    
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --no-frozen-lockfile
    
    COPY . .
    RUN pnpm build
    
    # Remove all devDependencies
    RUN pnpm prune --prod
    
    # Install node-prune for further cleaning
    RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune
    
    # ---- Stage 2: Runner ----
    FROM node:lts-alpine3.21 AS runtime
    
    WORKDIR /app
    
    # Copy only the build output from the builder stage
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package.json ./package.json
    
    # Expose the port for the application
    EXPOSE 5000
    
    # Command to run the application
    CMD [ "http-server", "dist" ]