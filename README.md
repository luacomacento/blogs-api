# :computer: Blogs API

<div align="center"><img src="preview.png" /></div>

## About:
<p>A Node.js/Express.js RESTful API for a store managing system, where one can create, read, update and delete informations about products and sales in a MySQL database.</p>
<p>It uses a model-service-controller architecture, and has unit tests coverage, that were made using Mocha, Chai and Sinon.</p>
<p>Data validation on the request side is made using JOI library.</p>

## Tools and libraries:
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Express Async Errors</li>
  <li>JOI</li>
  <li>Mocha</li>
  <li>Chai</li>
  <li>Sinon</li>
  <li>Docker</li>
  <li>MySQL</li>
</ul>

## Documentation:
The full API documentation can be accessed through the route /docs

## API Routes:

### Products:

<details>
<summary><b>/products</b></summary>
<br />

- GET: List all products

- POST: Create a new product in the database
  - It requires a JSON object to be passed to the request, with a name (string with a minimum of 5 characters).

```
{
  "name": "Product name"
}
```
</details>

<details>
<summary><b>/products/search?q=</b></summary>
<br />

- GET: Searches for products with matching name, passed as a query

```
URL EXAMPLE: /products/search?q=PartOfProductName
```
</details>

<details>
<summary><b>/products/:id</b></summary>
<br />

- GET: List product by id

- PUT: Edit a specific product by its id
  - It expects a JSON object to be passed to the request, with a name (string with a minimum of 5 characters).

```
{
  "name": "Product name"
}
```
- DELETE: Remove a product by its id
</details>

### Sales:

<details>
<summary><b>/sales</b></summary>
<br />

- GET: List all sales

- POST: Create a new sale in the database
  - It requires an array of objects to be passed to the request, with the following format:

```
 [
   {
     "productId": 1,
     "quantity": 1
   },
   {
     "productId": 2,
     "quantity": 5
   }
 ]
```
</details>

<details>
<summary><b>/sales/:id</b></summary>
<br />

- GET: List a sale by id

- PUT: Edit a sale in the database by its id
  - It requires an array of objects to be passed to the request, with the following format:

```
 [
   {
     "productId": 1,
     "quantity": 1
   },
   {
     "productId": 2,
     "quantity": 5
   }
 ]
```
- DELETE: Remove a sale by its id
</details>