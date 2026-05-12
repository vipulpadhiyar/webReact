FROM reg-harbor.agiletechnologies.in/agile_node18.13.0_alpine/agile_node18.13.0_alpine:latest as builder

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "-l", "5173", "build"]

EXPOSE 5173