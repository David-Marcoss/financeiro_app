FROM node:18

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 3001

RUN chmod +x ./run.sh


CMD ["./run.sh", "--host", "0.0.0.0"]
