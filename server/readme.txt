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
-- categories
drop table `categories`;
create table `categories` (
	`categoryId` int primary key,
    `categoryName` varchar(50)
);
-- questions
drop table `questions`;
create table `questions` (
	`questionId` int primary key,
    `question` varchar(50),
    `categoryId` int,
    foreign key (categoryId) references categories(categoryId)
);
commit;