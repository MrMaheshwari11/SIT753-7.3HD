FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN apk update && apk upgrade
COPY . .
EXPOSE 3000
CMD ["npm", "start"]