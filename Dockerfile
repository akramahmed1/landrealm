FROM node:20-slim
WORKDIR /app

RUN --mount=type=cache,id=s/landrealm-apt,target=/var/cache/apt \
    apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN --mount=type=cache,id=s/landrealm-npm,target=/root/.npm \
    npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
