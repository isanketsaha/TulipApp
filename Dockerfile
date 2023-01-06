# https://javascript.plainenglish.io/step-by-step-guide-to-dockerize-react-app-created-using-vite-90772423f7fb

FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]