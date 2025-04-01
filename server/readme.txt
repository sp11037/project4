npm init -y
npm i express
npm i mysql2
npm i cors

#edit package.json
"start": "node index.js"
"type": "module"

sql statements for example data:
use mydb;
drop table `users`;
create table `users` (
    `uname` varchar(50) primary key,
    `pword` varchar(50)
);
insert into `users` values ('user1', 'password1');
select * from `users`;

drop table `categories`;
create table `categories` (
	`categoryId` int primary key,
    `categoryName` varchar(50)
);
insert into `categories` values (1, 'HTML');
select * from `categories`;

drop table `questions`;
create table `questions` (
	`questionId` int auto_increment primary key,
    `question` varchar(50),
    `categoryId` int,
    foreign key (categoryId) references categories(categoryId)
);
insert into `questions` (`question`, `categoryId`) values ('What HTML tag is used for unordered lists?', 1);
insert into `questions` (`question`, `categoryId`) values ('Where does the <title> tag go?', 1);
select * from `questions`;
commit;