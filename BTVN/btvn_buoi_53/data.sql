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
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    phone_number character varying(15) NOT NULL,
    email character varying(200) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Customer_id_seq" OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    total_amount integer NOT NULL,
    shipping_fee integer NOT NULL,
    order_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    shipping_id integer NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    subtotal integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: OrderStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderStatus" (
    id integer NOT NULL,
    order_id integer NOT NULL,
    detail text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrderStatus" OWNER TO postgres;

--
-- Name: OrderStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderStatus_id_seq" OWNER TO postgres;

--
-- Name: OrderStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderStatus_id_seq" OWNED BY public."OrderStatus".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO postgres;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    sku character varying(16) NOT NULL,
    price integer NOT NULL,
    discount_price integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Shipping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Shipping" (
    id integer NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    postal_code text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    customer_id integer
);


ALTER TABLE public."Shipping" OWNER TO postgres;

--
-- Name: Shipping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Shipping_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Shipping_id_seq" OWNER TO postgres;

--
-- Name: Shipping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Shipping_id_seq" OWNED BY public."Shipping".id;


--
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: OrderStatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderStatus" ALTER COLUMN id SET DEFAULT nextval('public."OrderStatus_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: Shipping id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Shipping" ALTER COLUMN id SET DEFAULT nextval('public."Shipping_id_seq"'::regclass);


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (id, name, phone_number, email, created_at, updated_at) FROM stdin;
1	Vũ Văn Thống	+84304216746	pencil.bsp@gmail.com	2024-01-07 16:18:45.642	2024-01-07 16:18:45.642
2	Nguyễn Hữu Hưng	+84847666665	huuhungnguyen2002@gmail.com	2024-01-07 16:18:45.651	2024-01-07 16:18:45.651
3	Nguyễn Bá Đông	+84918915610	nbdong205@gmail.com	2024-01-07 16:18:45.653	2024-01-07 16:18:45.653
4	Lê Quốc Khánh	+84522707646	lekhanhdhpt@gmail.com	2024-01-07 16:18:45.655	2024-01-07 16:18:45.655
5	Phí Văn Đức	+84395584465	phivanduc325@gmail.com	2024-01-07 16:18:45.656	2024-01-07 16:18:45.656
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, customer_id, total_amount, shipping_fee, order_date, updated_at, shipping_id) FROM stdin;
1	1	10970000	30000	2024-01-07 16:20:40.63	2024-01-07 16:20:40.63	1
2	1	100410000	30000	2024-01-07 16:22:00.616	2024-01-07 16:22:00.616	1
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, order_id, product_id, quantity, price, subtotal, created_at, updated_at) FROM stdin;
1	1	1	1	9190000	9190000	2024-01-07 16:20:40.63	2024-01-07 16:20:40.63
2	1	2	2	890000	1780000	2024-01-07 16:20:40.63	2024-01-07 16:20:40.63
3	2	3	2	9990000	19980000	2024-01-07 16:22:00.616	2024-01-07 16:22:00.616
4	2	4	3	3890000	11670000	2024-01-07 16:22:00.616	2024-01-07 16:22:00.616
5	2	5	4	17190000	68760000	2024-01-07 16:22:00.616	2024-01-07 16:22:00.616
\.


--
-- Data for Name: OrderStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderStatus" (id, order_id, detail, created_at, updated_at) FROM stdin;
1	1	Đơn hàng đã tạo thành công, đang chờ người bán xác nhận	2024-01-07 16:20:40.63	2024-01-07 16:20:40.63
2	2	Đơn hàng đã tạo thành công, đang chờ người bán xác nhận	2024-01-07 16:22:00.616	2024-01-07 16:22:00.616
3	1	Đơn hàng đã được người bán xác nhận	2024-01-07 16:34:03.861	2024-01-07 16:34:03.861
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, sku, price, discount_price, created_at, updated_at) FROM stdin;
1	Điện thoại Xiaomi 12 5G	234621	13990000	9190000	2024-01-07 16:18:45.658	2024-01-07 16:18:45.658
2	Đồng hồ thông minh Xiaomi Redmi Watch 3 Active 46mm	311333	1490000	890000	2024-01-07 16:18:45.661	2024-01-07 16:18:45.661
3	Laptop Lenovo IdeaPad 1 15AMN7 R5 7520U/8GB/256GB/Win11	82VG0061VN	12690000	9990000	2024-01-07 16:18:45.662	2024-01-07 16:18:45.662
4	Điện thoại OPPO A57 128GB	285082	4990000	3890000	2024-01-07 16:18:45.664	2024-01-07 16:18:45.664
5	Điện thoại iPhone 12 256GB	228737	19990000	17190000	2024-01-07 16:18:45.665	2024-01-07 16:18:45.665
6	Chuột Bluetooth Apple MK2E3	251787	2490000	1650000	2024-01-07 16:18:45.666	2024-01-07 16:18:45.666
7	Điện thoại iPhone 15 Pro 128GB	303831	28290000	\N	2024-01-07 16:18:45.668	2024-01-07 16:18:45.668
8	Điện thoại OPPO Reno8 T	299248	8490000	6790000	2024-01-07 16:18:45.669	2024-01-07 16:18:45.669
9	Laptop Asus Vivobook X515EA i3 1115G4/8GB/512GB/Win11	EJ3948W	11290000	9490000	2024-01-07 16:18:45.671	2024-01-07 16:18:45.671
\.


--
-- Data for Name: Shipping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Shipping" (id, address, city, state, postal_code, created_at, updated_at, customer_id) FROM stdin;
1	998 P. Thành Trung, Trâu Quỳ, Gia Lâm, Hà Nội, Việt Nam	Hà Nội	Hà Nội	127723	2024-01-07 16:18:45.642	2024-01-07 16:18:45.642	1
2	207 Đ. Thạch Bàn, Thạch Bàn, Long Biên, Hà Nội, Việt Nam	Hà Nội	Hà Nội	122600	2024-01-07 16:18:45.651	2024-01-07 16:18:45.651	2
3	452 phố Định Công Hạ, Phương Liệt, Thanh Xuân, Hà Nội, Việt Nam	Hà Nội	Hà Nội	129875	2024-01-07 16:18:45.653	2024-01-07 16:18:45.653	3
4	458 Trần Vỹ, Mai Dịch, Cầu Giấy, Hà Nội, Việt Nam	Hà Nội	Hà Nội	123259	2024-01-07 16:18:45.655	2024-01-07 16:18:45.655	4
5	467 Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội, Việt Nam	Hà Nội	Hà Nội	127738	2024-01-07 16:18:45.656	2024-01-07 16:18:45.656	5
\.


--
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 5, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 5, true);


--
-- Name: OrderStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderStatus_id_seq"', 3, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 2, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 9, true);


--
-- Name: Shipping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Shipping_id_seq"', 5, true);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: OrderStatus OrderStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderStatus"
    ADD CONSTRAINT "OrderStatus_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Shipping Shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Shipping"
    ADD CONSTRAINT "Shipping_pkey" PRIMARY KEY (id);


--
-- Name: Customer_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_email_key" ON public."Customer" USING btree (email);


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: OrderItem OrderItem_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderStatus OrderStatus_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderStatus"
    ADD CONSTRAINT "OrderStatus_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_shipping_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_shipping_id_fkey" FOREIGN KEY (shipping_id) REFERENCES public."Shipping"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Shipping Shipping_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Shipping"
    ADD CONSTRAINT "Shipping_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

