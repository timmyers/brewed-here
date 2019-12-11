FROM node:13-alpine AS build

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN yarn install
RUN yarn build

CMD [ "node", "dist/index.js" ]

