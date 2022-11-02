# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index '/products' [GET]
- Show '/products/:productId' [GET]
- Create '/products' [POST] [token required]
- Top 5 most popular products '/top5products' [GET]
- Poducts by category '/products/category/:category' [GET]

#### Users

- Index '/users' [GET] [token required]
- Show '/users/:userId' [GET] [token required]
- Create '/users' [POST]
- Login '/users/login' [POST]
- Delete '/users/:userId' [DELETE] [token required]

#### Orders

- Index '/orders' [GET]
- Create Order '/orders/:userId' [POST]
- Remove Order '/orders/:orderId' [DELETE]
- Add Products '/orders/:orderId/products' [POST]
- Current Order by user '/currentorders/:userId' [GET] [token required]
- Completed Orders by user '/completedorders/:userId' [GET] [token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
