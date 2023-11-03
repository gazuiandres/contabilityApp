# Backend installation

Note: Nodemailer is config to use with gmail, if you want to use it you need to setup gmail credentials or change nodemailer setup in the code.

  **1.** run `npm install` to download all dependencies :

**2.** Copy .env.example content inside of a new .env and fill all the env variables, for example:

  

```plaintext

MONGO_DB_URI="yourMongoUri"


CLIENT_HOST="http://127.0.0.1:3000"

  
ENCRYPT_SECRET="YourSecretEncryptKey"

# NODEMAILER SETUP

  

SEND_EMAIL_HOST="smtp.gmail.com"

  

SEND_EMAIL_USER="example@gmail.com"

  

SEND_EMAIL_PASSWORD="google special credentials here"


```

  **3.**  run the next command after you fill the MONGO_DB_URI env variable  `npm run seed:run`, after that you DB will seeded with categories data and an admin user with default credentials, if you want to change that credentials change them in the code before run the seed command.

**4.**  **(optional)** If you want to host your own MongoDB instance, run `docker-compose up -d` to create an instance running in your machine.

  

**5.** run `npm run build` and then `npm start:prod` to start the server or, `npm run start:dev` in case you want to be in development mode.

  

**5.** Enjoy 👀.