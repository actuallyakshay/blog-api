# Install dependencies only when needed
FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json .
COPY yarn.lock .


RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app
COPY package.json .
COPY yarn.lock .

ENV NODE_ENV production

RUN yarn install --only=production && npm cache clean --force

COPY . .

COPY --from=deps /app/dist ./dist

EXPOSE 8080

ENV PORT 8080

CMD ["node", "dist/main"]