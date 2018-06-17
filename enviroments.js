version: '2'
networks: 
  web:
  queue:
  db:
services:
 db:
  image: mongo:3.4
  volumes: 
    - /data/db:/data/db
  networks: 
    - db
  ports: 
    - 27017:27017
 backend:
  image: node:8.1
  volumes: 
   - ./backend:/backend
  ports: 
   - 3003:3003
  command: bash -c "cd /backend && npm i -g sendgrid && npm i && npm start"
  depends_on:
   - "db"
   - "queue"
  networks: 
   - web
   - db
   - queue
  environment: 
   - QUEUE_NAME=grifoo-queue
   - USER_NAME=grifoo
   - USER_PASS=6977baed673c6ae35b230ea5f312961araphaelgrifo
 frontend:
  image: nginx:1.13
  volumes: 
    - ./frontend/dist/:/usr/share/nginx/html
    - ./nginx/default.conf:/etc/nginx/confi.d/default.conf
  ports:  
    - 80:80
  depends_on:
    - "backend"
    - "db"
  networks: 
    - web
  environment: 
   - URL=http://localhost:3003/api/v1
 queue:
  image: redis
  networks: 
   - queue
  ports: 
    - 6379:6379
 worker:
  image: node:8.1
  volumes: 
    - ./worker:/worker
  command: bash -c "cd /worker && npm i -g --no-optional && npm start"
  depends_on: 
    - "db"
    - "queue"
  networks: 
    - db
    - queue
    - web
  links: 
    - backend:backend
  environment: 
   - QUEUE_NAME=grifoo-queue
   - EMAIL_KEY=key-6977baed673c6ae35b230ea5f312961a
   - USER_NAME=grifoo
   - USER_PASS=Z3JpZm9vOjY5NzdiYWVkNjczYzZhZTM1YjIzMGVhNWYzMTI5NjFhcmFwaGFlbGdyaWZv
   - URL=http://backend:3003/api/v1