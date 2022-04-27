FROM node:12-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python2 g++ make
WORKDIR /Reviews-API
COPY . .
RUN npm install
CMD ["node", "server/index.js"]