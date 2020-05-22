require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "image","name","price","productId","shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!Number.isInteger(Number(productId)) || Number(productId) <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `Cannot find productId with "productId" ${productId}`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/cart', (req, res, next) => {
  if (req.session.cartId === undefined) res.json([]);
  else {
    const cartId = req.session.cartId;
    const sql = `
  select "c"."cartItemId",
                "c"."price",
                 "p"."productId",
                 "p"."image",
                "p"."name",
                "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
  where "c"."cartId" = $1
  `;
    const params = [cartId];
    db.query(sql, params)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const product = req.body;
  if (!product.productId || !Number.isInteger(Number(product.productId)) || Number(product.productId) <= 0) {
    return res.status(400).json({
      error: '"productId" must be an integer number'
    });
  }

  const sql = `
    select "price"
    from "products"
    where "productId" = $1
  `;
  const params = [product.productId];
  db.query(sql, params)
    .then(result => {
      const price = result.rows;
      if (price.length === 0) {
        throw new ClientError(`cannot ${req.method} ${req.originalUrl}`, 400);
      } else {
        if (req.session.cartId !== undefined) {
          return ({
            cartId: req.session.cartId,
            price: price[0].price
          });
        }
        const sql = `
            insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
        `;
        return db.query(sql)
          .then(result => {
            return {
              cartId: result.rows[0].cartId,
              price: price[0].price
            };
          });
      }
    })
    .then(newResult => {
      req.session.cartId = newResult.cartId;
      const sql = `
            insert into "cartItems" ("cartId", "productId", "price")
            values ($1, $2, $3)
            returning "cartItemId"
        `;
      const params = [newResult.cartId, product.productId, newResult.price];
      return db.query(sql, params)
        .then(result => {
          return (result.rows[0].cartItemId);
        });

    })
    .then(finalResult => {

      const sql = `
            select "c"."cartItemId",
                   "c"."price",
                    "p"."productId",
                    "p"."image",
                    "p"."name",
                     "p"."shortDescription"
             from "cartItems" as "c"
             join "products" as "p" using ("productId")
            where "c"."cartItemId" = $1
        `;
      const params = [finalResult];
      return db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });

    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/orders', (req, res, next) => {
  const order = req.body;
  if (req.session.cartId === undefined) {
    res.status(400).json({
      error: 'Can not post card, CartId is undefined.'
    });
  } else if (req.body.name === '' || req.body.creditCard === '' || req.body.shippingAddress === '') {
    res.status(400).json({
      error: 'Name, CreditCard and Shipping Address are needed'
    });
  } else {
    const cartId = req.session.cartId;
    const sql = `
            insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
            values ($1, $2, $3, $4)
            returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
        `;
    const params = [cartId, order.name, order.creditCard, order.shippingAddress];
    db.query(sql, params)
      .then(result => {
        req.session.cartId = undefined;
        res.json(result.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
