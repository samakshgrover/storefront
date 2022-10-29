create table if not exists users(
  user_id serial primary key,
  first_name varchar,
  last_name varchar,
  username varchar not null unique,
  password_hash varchar not null
);

create table if not exists products(
  product_id serial primary key,
  name varchar not null,
  price int not null,
  category varchar(50)
);

create table if not exists orders(
  order_id serial primary key,
  user_id int references users(user_id),
  status varchar(50) not null
);

create table if not exists ordered_products(
  order_id int references orders(order_id),
  product_id int references products(product_id),
  quantity int not null
);