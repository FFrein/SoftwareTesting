create table dictionary (
                            word varchar(50),
                            translate varchar(50)
);
INSERT INTO dictionary (word, translate) VALUES ('apple', 'яблоко');

-- Вставка нескольких записей в одном запросе
INSERT INTO dictionary (word, translate) VALUES('car', 'машина');
INSERT INTO dictionary (word, translate) VALUES('book', 'книга');
INSERT INTO dictionary (word, translate) VALUES('table', 'стол');
INSERT INTO dictionary (word, translate) VALUES('стол', 'table');
select * from dictionary;
----------------------------------------------------
create table dict_rus_bel (
                              word varchar(50),
                              translate varchar(50)
);


insert into dict_rus_bel values ('ночь', 'ноч');
insert into dict_rus_bel values ('спасибо', 'дзякуй');
----------------------------------------------------

CREATE TABLE poems (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    year INT,
    poem BYTEA
);

-- Вставляем данные в таблицу poemsINSERT INTO poems (author, year, poem)

INSERT INTO poems (author, year, poem)
VALUES ('Лермонтов', 1831, 'Сонет. BLOB_DATA_FOR_POEM_2. акупук11!!!!');

INSERT INTO poems (author, year, poem)
VALUES ('Некрасов', 1911, 'Сонет');

INSERT INTO poems (author, year, poem)
VALUES ('Некрасов', 1912, 'Сонет номер 2');

INSERT INTO poems (author, year, poem)
VALUES ('Пушкин', 1823, '!!#!!!!');

INSERT INTO poems (author, year, poem)
VALUES ('Лермонтов', 1837, 'Сонет.');


SELECT * FROM poems;

-- Чтобы вывести просто текст
SELECT id, author, year, ENCODE(poem, 'escape') AS poem_text
FROM poems;

drop table poems
-- Создание таблицы
CREATE TABLE poems (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    poem TEXT
);

-- Вставка данных
INSERT INTO poems (author, poem) VALUES ('Пушкин', 'О, весна без конца и без края!...');
INSERT INTO poems (author, poem) VALUES ('Пушкин', 'Вновь я посетил...');
INSERT INTO poems (author, poem) VALUES ('Лермонтов', 'Белеет парус одинокий...');
INSERT INTO poems (author, poem) VALUES ('Лермонтов', 'Скажи, зачем, с кем теперь ты?...');
INSERT INTO poems (author, poem) VALUES ('Некрасов', 'Вот домик Пушкина. Откроем входную дверь...');
INSERT INTO poems (author, poem) VALUES ('Некрасов', 'Как заря весенняя ясна...');

