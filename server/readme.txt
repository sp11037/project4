npm init -y
npm i express
npm i mysql2
npm i cors

#edit package.json
"start": "node index.js"
"type": "module"

sql statements for example data:
use mydb;
-- users
drop table `users`;
create table `users` (
    `uname` varchar(50) primary key,
    `pword` varchar(50)
);
insert into `users` values ('user1', 'password1');
insert into `users` values ('user2', 'password2');
insert into `users` values ('user3', 'password3');
-- categories
drop table `categories`;
create table `categories` (
	`categoryId` int primary key,
    `categoryName` varchar(50)
);
insert into `categories` values (1, 'Category 1');
insert into `categories` values (2, 'Category 2');
insert into `categories` values (3, 'Category 3');
commit;