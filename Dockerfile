FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g pnpm npm-run-all2

# make the 'app' folder the current working directory
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Remove .env file if it exists
RUN rm -f .env

# Replace .env with .env.dev
RUN cp .env.dev .env

EXPOSE 5000

CMD [ "pnpm", "dev" ]