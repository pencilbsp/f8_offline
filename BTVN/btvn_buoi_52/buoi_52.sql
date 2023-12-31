-- Tạo database:
-- CREATE DATABASE database_01_tenhocvien;
-- c\ database_01_tenhocvien;

-- Tạo bảng teacher và thêm dữ liệu:
CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tạo bảng courses:
CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT,
    description TEXT,
    content TEXT NOT NULL,
    teacher_id INT NOT NULL,
    active INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);

-- Thêm trường description
ALTER TABLE courses ADD COLUMN description TEXT;

-- Đổi tên trường detail thành content và ràng buộc chuyển thành NOT NULL
ALTER TABLE courses
    RENAME COLUMN detail TO content;

-- Chuyển đổi ràng buộc của cột content thành NOT NULL
ALTER TABLE courses
    ALTER COLUMN content SET NOT NULL;
	
INSERT INTO teacher (name, bio, created_at, updated_at)
VALUES
    ('Hoàng An', 'Bio 1', NOW(), NOW()),
    ('Ngọc Sơn', 'Bio 2', NOW(), NOW()),
    ('Giáo Viên Khác', 'Bio 3', NOW(), NOW());

-- Thêm 3 khóa học cho mỗi giảng viên:
INSERT INTO courses (name, price, description, content, teacher_id, active, created_at, updated_at)
VALUES
    ('HTML CSS cơ bản', 250000, 'Description1', 'Content1', 1, 1, NOW(), NOW()),
    ('HTML CSS nâng cao', 400000, 'Description2', 'Content2', 1, 1, NOW(), NOW()),
    ('Javascript cơ bản', 600000, 'Description3', 'Content3', 1, 1, NOW(), NOW()),
    ('Javascript nâng cao', 1000000, 'Description4', 'Content4', 2, 1, NOW(), NOW()),
    ('ReactJs từ cơ bản đến nâng cao', 1200000, 'Description5', 'Content5', 2, 1, NOW(), NOW()),
    ('NextJs từ cơ bản đến nâng cao', 1200000, 'Description6', 'Content6', 2, 1, NOW(), NOW()),
    ('NodeJs Express', 800000, 'Description7', 'Content7', 3, 1, NOW(), NOW()),
    ('Phân tích và thiết kế Database', 499000, 'Description8', 'Content8', 3, 1, NOW(), NOW()),
    ('Php cơ bản', 799000, 'Description9', 'Content9', 3, 1, NOW(), NOW());
	
	
-- Sửa tên và giá của từng khóa học
UPDATE courses
SET
    name = 'HTML CSS cơ bản Vip', price = 299000, updated_at = NOW()
WHERE
    id = 1;
	
-- Sửa lại bio của từng giảng viên
UPDATE teacher
SET
    bio = 'NewBio1', updated_at = NOW()
WHERE
    id = 1;

-- Hiện thị 
SELECT * FROM public.courses
ORDER BY id ASC 

