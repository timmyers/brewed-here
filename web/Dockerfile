FROM node:13-alpine AS build

# Set working directory
WORKDIR /web

# Copy project files
COPY . .

# Install dependencies
RUN yarn install
RUN yarn build

CMD [ "node", "dist/index.js" ]

