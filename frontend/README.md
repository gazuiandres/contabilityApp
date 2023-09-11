# Frontend installation


**1.** run `npm install` to install al dependencies:

**2.** Copy .env.example content inside of a new .env **(.env.local is valid too)** and fill all the env variables, for example:

```plaintext
NEXT_PUBLIC_API_HOST="http://localhost:3001/api/v1"

NEXTAUTH_SECRET="yourSecret"

NEXTAUTH_URL="http://localhost:3000"
```

**3.** run `npm run build` and then `npm start` to start the server or, `npm run dev` in case you want to be in development mode.

**4.** Enjoy 👀.
