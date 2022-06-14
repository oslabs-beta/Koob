import * as express from "express";
import * as path from "path";
let app: express.Application | undefined = undefined;
const PORT : number = 3000;

app = express();

//Routers to be imported
import userRouter from "./routes/userRouter";


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', userRouter);

// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql

//Global Error handler
app.use((err, req, res, next) => {
    // This will define an interface here to determine the element types of keys
    interface globalError {
        log: string,
        status: number,
        [key: string]:any
    }

    const defaultErr:globalError = {
        log: 'Express error handler caught unkown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} `);
});

export default app;