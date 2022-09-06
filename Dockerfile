FROM node:16-slim
WORKDIR /eng-words
COPY package.json /eng-words/
RUN npm install
COPY . /eng-words/
CMD ["npm", "run", "dev"]