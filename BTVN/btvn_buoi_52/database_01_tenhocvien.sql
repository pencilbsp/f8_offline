--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Homebrew)
-- Dumped by pg_dump version 16.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: pencil
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price double precision,
    description text,
    content text NOT NULL,
    teacher_id integer NOT NULL,
    active integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.courses OWNER TO pencil;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: pencil
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO pencil;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pencil
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: pencil
--

CREATE TABLE public.teacher (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    bio text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.teacher OWNER TO pencil;

--
-- Name: teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: pencil
--

CREATE SEQUENCE public.teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacher_id_seq OWNER TO pencil;

--
-- Name: teacher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pencil
--

ALTER SEQUENCE public.teacher_id_seq OWNED BY public.teacher.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: pencil
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: teacher id; Type: DEFAULT; Schema: public; Owner: pencil
--

ALTER TABLE ONLY public.teacher ALTER COLUMN id SET DEFAULT nextval('public.teacher_id_seq'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: pencil
--

COPY public.courses (id, name, price, description, content, teacher_id, active, created_at, updated_at) FROM stdin;
2	HTML CSS nâng cao	400000	Description2	Content2	1	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
3	Javascript cơ bản	600000	Description3	Content3	1	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
4	Javascript nâng cao	1000000	Description4	Content4	2	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
5	ReactJs từ cơ bản đến nâng cao	1200000	Description5	Content5	2	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
6	NextJs từ cơ bản đến nâng cao	1200000	Description6	Content6	2	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
7	NodeJs Express	800000	Description7	Content7	3	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
8	Phân tích và thiết kế Database	499000	Description8	Content8	3	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
9	Php cơ bản	799000	Description9	Content9	3	1	2023-12-31 23:22:44.531981	2023-12-31 23:22:44.531981
1	HTML CSS cơ bản Vip	299000	Description1	Content1	1	1	2023-12-31 23:22:44.531981	2023-12-31 23:43:00.048535
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: pencil
--

COPY public.teacher (id, name, bio, created_at, updated_at) FROM stdin;
2	Ngọc Sơn	Bio 2	2023-12-31 23:22:32.673585	2023-12-31 23:22:32.673585
3	Giáo Viên Khác	Bio 3	2023-12-31 23:22:32.673585	2023-12-31 23:22:32.673585
1	Hoàng An	NewBio1	2023-12-31 23:22:32.673585	2023-12-31 23:22:32.673585
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pencil
--

SELECT pg_catalog.setval('public.courses_id_seq', 9, true);


--
-- Name: teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pencil
--

SELECT pg_catalog.setval('public.teacher_id_seq', 3, true);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: pencil
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: pencil
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: courses courses_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pencil
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id);


--
-- PostgreSQL database dump complete
--

