-- Comment SQL
-- 1. Thêm dữ liệu mới

insert into users(id, name, email, password, status, created_at, updated_at)
values(1, 'User 01', 'user01@gmail.com', '123456', TRUE, NOW(), NOW());

insert into users(id, name, email, password, status, created_at, updated_at)
values(3, 'User 03', 'user03@gmail.com', '123456', TRUE, NOW(), NOW());

-- 2. Sửa dữ liệu

update users set name='Vu Thong 2', updated_at=now() where id=1;
update users set updated_at=NULL where id=4;

-- 3. Xoá dữ liệu

delete from users where id=2;

-- 4. Hiển thị dữ liệu

-- select * from users where id=4;
-- select * from users where lower(email) like '%thong%' or lower(name) like '%thong%';
-- select * from users where updated_at is null;
select id, name as fullname, email from users where updated_at is null;

drop table users;