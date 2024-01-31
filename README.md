1. $ npm init
   Press ^C at any time to quit.
   package name: (backend)
   version: (1.0.0)  
    description:  
    entry point: (index.js) ./src/index.ts (make sure to have this)

2. npm i ts-node typescript nodemon @types/cors @types/express @types/node --save

3. npm i @prisma/client cors express prisma

4. npx tsc --init

5. in package.json
   "scripts": {
   "start": "npx nodemon"
   },

# Setting Backend

1.  Create a small express server  
    Its important to satrt with this:

    ***

    import express from 'express';
    import cors from 'cors';

    const app = express();

    app.use(express.json());

    app.use(cors());

    const port = 8000;
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });

2.  Use elephantsql to create a database
3.  Create a database and copy the connection string to .env file.
4.  create a prisma/schema.prisma file and add the following code to it. by writing in the terminal npx prisma init.
5.  Now, create a model in prisma/schema.prisma file.
6.  After creating the model, by writing in the terminal npx prisma db push , the model will be generate a prisma client.
7.  Now, the prisma client will be used in the backend.
8.  By now, the Note table is created in the database.
9.  Now we create notesRouters and notes Controllers. Make sure to have PrismaClient.
10. Add User model by: npx prisma migrate save --Add Users, then npx prisma migrate up and then npx prisma db push.

npm install jasonwebtoken
npm install dotenv

envronment.d.ts : helped be to declare types golabbaly!
