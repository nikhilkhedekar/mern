// require('dotenv').config();
// require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
// const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
// const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

//  routers
//login will work on authentication file and rest will work on full-auth file
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

//swagger
const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDoc = YAML.load('./api/swaggerApi.yaml');
// const YAML = require('js-yaml');
// const fs   = require('fs');
// const swaggerDoc = YAML.load(fs.readFileSync('./api/swaggerApi.yaml'))

// // middleware
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(mongoSanitize());

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded());
app.use(cookieParser("q4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D"));

app.use(express.static('./public'));
app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
// app.use('/swagger-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
// app.use('/swagger-api-docs', swaggerUI.serveFiles('./api/openapi.json'), swaggerUI.setup('./api/openapi.json'));
app.use('/swagger-api-docs', swaggerUI.serve, swaggerUI.setup('./api/openapi.json'));

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    const userName = encodeURIComponent("nikhilkhedekar");
    const password = encodeURIComponent("Abcd@1234");
    await connectDB(`mongodb+srv://${userName}:${password}@mernstack.ppizwtc.mongodb.net/mernStack?retryWrites=true&w=majority`);
    app.get('/', (req, res) => {
      // res.send("Server is listening on port 8080...")
      res.send("<h1>Jobs API</h1><a href='/swagger-api-docs'>Swagger Documentation</a>")
    }).listen(8080, () =>
      console.log(`Server is listening on port 8080...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = {
  app
}