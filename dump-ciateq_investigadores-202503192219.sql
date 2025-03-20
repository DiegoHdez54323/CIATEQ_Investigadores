--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-19 22:19:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 17818)
-- Name: articulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articulos (
    id integer NOT NULL,
    fecha_publicacion date NOT NULL,
    doi character varying(100),
    url character varying(200),
    nombre character varying(200) NOT NULL,
    nombre_revista character varying(200) NOT NULL,
    pais_publicacion character varying(100),
    anio_publicacion integer
);


ALTER TABLE public.articulos OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17817)
-- Name: articulos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articulos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articulos_id_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 232
-- Name: articulos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articulos_id_seq OWNED BY public.articulos.id;


--
-- TOC entry 224 (class 1259 OID 17753)
-- Name: carreras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carreras (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.carreras OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17752)
-- Name: carreras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carreras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carreras_id_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 223
-- Name: carreras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carreras_id_seq OWNED BY public.carreras.id;


--
-- TOC entry 234 (class 1259 OID 17826)
-- Name: det_art; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_art (
    investigador_id integer NOT NULL,
    articulo_id integer NOT NULL,
    es_principal boolean DEFAULT false
);


ALTER TABLE public.det_art OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17865)
-- Name: det_eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_eventos (
    investigador_id integer NOT NULL,
    evento_id integer NOT NULL
);


ALTER TABLE public.det_eventos OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 17912)
-- Name: det_herr; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_herr (
    proyecto_id integer NOT NULL,
    herramienta_id integer NOT NULL
);


ALTER TABLE public.det_herr OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17802)
-- Name: det_lineas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_lineas (
    investigador_id integer NOT NULL,
    linea_id integer NOT NULL
);


ALTER TABLE public.det_lineas OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17887)
-- Name: det_proy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_proy (
    investigador_id integer NOT NULL,
    proyecto_id integer NOT NULL,
    es_principal boolean DEFAULT false
);


ALTER TABLE public.det_proy OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17771)
-- Name: estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante (
    id integer NOT NULL,
    investigador_id integer NOT NULL,
    carrera_id integer NOT NULL,
    tipo_estudiante_id integer NOT NULL,
    escuela character varying(100) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_termino date NOT NULL,
    sueldo numeric(10,2) DEFAULT 3200 NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.estudiante OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17770)
-- Name: estudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estudiante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estudiante_id_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 227
-- Name: estudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estudiante_id_seq OWNED BY public.estudiante.id;


--
-- TOC entry 238 (class 1259 OID 17852)
-- Name: eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventos (
    id integer NOT NULL,
    tipo_evento_id integer NOT NULL,
    nombre character varying(200) NOT NULL,
    lugar character varying(100) NOT NULL,
    fecha date NOT NULL,
    duracion integer NOT NULL,
    empresa_invita character varying(200) NOT NULL
);


ALTER TABLE public.eventos OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17851)
-- Name: eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventos_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 237
-- Name: eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;


--
-- TOC entry 244 (class 1259 OID 17904)
-- Name: herramientas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.herramientas (
    id integer NOT NULL,
    descripcion character varying(100) NOT NULL
);


ALTER TABLE public.herramientas OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 17903)
-- Name: herramientas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.herramientas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.herramientas_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 243
-- Name: herramientas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.herramientas_id_seq OWNED BY public.herramientas.id;


--
-- TOC entry 222 (class 1259 OID 17737)
-- Name: investigador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.investigador (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    telefono character varying(20),
    correo character varying(100) NOT NULL,
    sueldo numeric(10,2) NOT NULL,
    snii_id integer
);


ALTER TABLE public.investigador OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17736)
-- Name: investigador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.investigador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.investigador_id_seq OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 221
-- Name: investigador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.investigador_id_seq OWNED BY public.investigador.id;


--
-- TOC entry 230 (class 1259 OID 17794)
-- Name: lineas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lineas (
    id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.lineas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17793)
-- Name: lineas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lineas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lineas_id_seq OWNER TO postgres;

--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 229
-- Name: lineas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lineas_id_seq OWNED BY public.lineas.id;


--
-- TOC entry 218 (class 1259 OID 17718)
-- Name: nivel_snii; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel_snii (
    id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.nivel_snii OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17717)
-- Name: nivel_snii_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nivel_snii_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nivel_snii_id_seq OWNER TO postgres;

--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 217
-- Name: nivel_snii_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nivel_snii_id_seq OWNED BY public.nivel_snii.id;


--
-- TOC entry 241 (class 1259 OID 17881)
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos (
    id integer NOT NULL,
    nombre character varying(200) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_termino date NOT NULL,
    ingresos numeric(10,2) NOT NULL
);


ALTER TABLE public.proyectos OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17880)
-- Name: proyectos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_seq OWNER TO postgres;

--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 240
-- Name: proyectos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;


--
-- TOC entry 220 (class 1259 OID 17725)
-- Name: snii; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snii (
    id integer NOT NULL,
    nivel_id integer NOT NULL,
    fecha_asignacion date NOT NULL
);


ALTER TABLE public.snii OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17724)
-- Name: snii_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snii_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.snii_id_seq OWNER TO postgres;

--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 219
-- Name: snii_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snii_id_seq OWNED BY public.snii.id;


--
-- TOC entry 226 (class 1259 OID 17762)
-- Name: tipo_estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_estudiante (
    id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.tipo_estudiante OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17761)
-- Name: tipo_estudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_estudiante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_estudiante_id_seq OWNER TO postgres;

--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 225
-- Name: tipo_estudiante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_estudiante_id_seq OWNED BY public.tipo_estudiante.id;


--
-- TOC entry 236 (class 1259 OID 17843)
-- Name: tipo_evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_evento (
    id integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.tipo_evento OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17842)
-- Name: tipo_evento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_evento_id_seq OWNER TO postgres;

--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 235
-- Name: tipo_evento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_evento_id_seq OWNED BY public.tipo_evento.id;


--
-- TOC entry 247 (class 1259 OID 18075)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 18074)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 246
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4729 (class 2604 OID 17821)
-- Name: articulos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articulos ALTER COLUMN id SET DEFAULT nextval('public.articulos_id_seq'::regclass);


--
-- TOC entry 4724 (class 2604 OID 17756)
-- Name: carreras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carreras ALTER COLUMN id SET DEFAULT nextval('public.carreras_id_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 17774)
-- Name: estudiante id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante ALTER COLUMN id SET DEFAULT nextval('public.estudiante_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 17855)
-- Name: eventos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 17907)
-- Name: herramientas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.herramientas ALTER COLUMN id SET DEFAULT nextval('public.herramientas_id_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 17740)
-- Name: investigador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.investigador ALTER COLUMN id SET DEFAULT nextval('public.investigador_id_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 17797)
-- Name: lineas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas ALTER COLUMN id SET DEFAULT nextval('public.lineas_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 17721)
-- Name: nivel_snii id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_snii ALTER COLUMN id SET DEFAULT nextval('public.nivel_snii_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 17884)
-- Name: proyectos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 17728)
-- Name: snii id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snii ALTER COLUMN id SET DEFAULT nextval('public.snii_id_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 17765)
-- Name: tipo_estudiante id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_estudiante ALTER COLUMN id SET DEFAULT nextval('public.tipo_estudiante_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 17846)
-- Name: tipo_evento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_evento ALTER COLUMN id SET DEFAULT nextval('public.tipo_evento_id_seq'::regclass);


--
-- TOC entry 4736 (class 2604 OID 18078)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4966 (class 0 OID 17818)
-- Dependencies: 233
-- Data for Name: articulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articulos (id, fecha_publicacion, doi, url, nombre, nombre_revista, pais_publicacion, anio_publicacion) FROM stdin;
1	2015-01-01	\N	https://arxiv.org/abs/1512.03385	Deep Residual Learning for Image Recognition	arXiv	USA	2015
2	2012-01-01	10.1145/3065386	https://dl.acm.org/doi/10.1145/3065386	ImageNet Classification with Deep Convolutional Neural Networks	ACM	USA	2012
3	2017-01-01	\N	https://arxiv.org/abs/1706.03762	Attention Is All You Need	arXiv	USA	2017
4	2018-01-01	\N	https://arxiv.org/abs/1810.04805	BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding	arXiv	USA	2018
5	2010-01-01	\N	https://ieeexplore.ieee.org/document/5432210	The Hardware Trojan War: Attacks, Myths, and Defenses	IEEE Xplore	USA	2010
6	2016-01-01	\N	https://ieeexplore.ieee.org/document/7445126	A Survey of 5G Network: Architecture and Emerging Technologies	IEEE Xplore	USA	2016
7	2010-01-01	\N	https://ieeexplore.ieee.org/document/5694074	The Internet of Things: A Survey	IEEE Xplore	USA	2010
8	2014-01-01	\N	https://ieeexplore.ieee.org/document/6547630	Big Data: A Survey	IEEE Xplore	USA	2014
9	2010-01-01	\N	https://ieeexplore.ieee.org/document/5280678	Cloud Computing: State-of-the-Art and Research Challenges	IEEE Xplore	USA	2010
10	2015-01-01	\N	https://ieeexplore.ieee.org/document/7010933	A Survey on Software-Defined Networking	IEEE Xplore	USA	2015
11	2021-01-01	\N	https://revista.unam.mx	Energías renovables y sustentabilidad: una eficiente forma de gestionar los recursos naturales	Revista UNAM	México	2021
12	2017-01-01	\N	https://redalyc.org	Ciencia, tecnología y energías renovables: una aproximación a sus interrelaciones	Redalyc	México	2017
13	2023-01-01	\N	\N	Nuevas estrategias de enseñanza: unidades didácticas basadas en temas de la Astronomía Cultural	N/A	México	2023
14	2017-01-01	\N	\N	Con los juegos también se educa: un enfoque educativo de los juegos de la Oca y el Parchís	N/A	México	2017
15	2019-01-01	\N	\N	Uso de gestos como recurso mediador por un profesor de bachillerato para enfrentar un desafío didáctico no previsto por él	N/A	México	2019
\.


--
-- TOC entry 4957 (class 0 OID 17753)
-- Dependencies: 224
-- Data for Name: carreras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carreras (id, nombre) FROM stdin;
1	Ing de Software
2	Bioquímica
3	Lic. Pedagogía
4	Ing. Electricidad
5	Ing. en Electrónica
6	Ing en Mecatrónica
\.


--
-- TOC entry 4967 (class 0 OID 17826)
-- Dependencies: 234
-- Data for Name: det_art; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_art (investigador_id, articulo_id, es_principal) FROM stdin;
10	1	t
9	1	f
8	1	f
7	2	t
2	2	f
3	2	f
4	3	t
8	3	f
9	4	t
1	5	t
2	5	f
7	5	f
10	5	f
9	6	t
1	6	f
10	7	t
2	7	f
1	8	t
7	8	f
8	8	f
8	9	t
9	9	f
10	9	f
4	10	t
8	10	f
8	11	t
4	11	f
10	12	t
7	12	f
2	12	f
1	12	f
7	13	t
10	14	t
9	14	f
1	15	t
\.


--
-- TOC entry 4972 (class 0 OID 17865)
-- Dependencies: 239
-- Data for Name: det_eventos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_eventos (investigador_id, evento_id) FROM stdin;
6	1
3	2
5	2
7	3
10	4
1	4
2	4
10	5
9	6
8	7
10	8
6	9
4	10
5	11
9	12
8	13
7	14
10	15
2	16
1	17
3	18
9	19
8	19
1	19
9	20
\.


--
-- TOC entry 4978 (class 0 OID 17912)
-- Dependencies: 245
-- Data for Name: det_herr; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_herr (proyecto_id, herramienta_id) FROM stdin;
1	1
1	2
2	8
2	9
3	3
3	4
4	3
4	11
4	17
5	5
5	8
6	15
6	8
7	1
7	16
8	16
8	3
9	17
9	13
9	2
10	11
10	3
10	17
11	3
11	13
12	12
12	9
13	3
13	13
14	10
14	3
14	17
15	14
15	3
15	17
\.


--
-- TOC entry 4964 (class 0 OID 17802)
-- Dependencies: 231
-- Data for Name: det_lineas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_lineas (investigador_id, linea_id) FROM stdin;
1	1
2	1
3	2
4	2
6	3
10	4
5	5
7	6
8	7
9	7
\.


--
-- TOC entry 4975 (class 0 OID 17887)
-- Dependencies: 242
-- Data for Name: det_proy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_proy (investigador_id, proyecto_id, es_principal) FROM stdin;
2	1	f
1	2	f
4	4	f
6	4	f
9	7	f
4	15	f
1	1	t
7	2	t
6	3	t
3	4	t
5	5	t
5	6	t
8	7	t
9	8	t
2	10	t
10	11	t
10	12	t
1	13	t
3	14	t
3	15	t
\.


--
-- TOC entry 4961 (class 0 OID 17771)
-- Dependencies: 228
-- Data for Name: estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiante (id, investigador_id, carrera_id, tipo_estudiante_id, escuela, fecha_inicio, fecha_termino, sueldo, nombre) FROM stdin;
1	9	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Carlos
2	9	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Roberto
3	7	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Diego
4	8	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Carmen
5	8	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Gerardo
6	6	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Alberto
7	2	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Alicia
8	2	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Sandra
9	5	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Javier
10	5	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Rebeca
11	4	1	1	Escuela de Ingeniería	2023-01-01	2023-12-31	3200.00	Antonio
\.


--
-- TOC entry 4971 (class 0 OID 17852)
-- Dependencies: 238
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventos (id, tipo_evento_id, nombre, lugar, fecha, duracion, empresa_invita) FROM stdin;
1	1	Congreso de IA 2025	Ciudad X	2025-01-01	2	Empresa X
2	2	Taller de Machine Learning	Ciudad X	2025-02-01	3	Empresa Y
3	2	Taller de Hidrocarburos	Ciudad X	2025-03-01	2	Empresa Z
4	4	Diplomado web 5.0	Ciudad X	2025-04-01	4	Empresa X
5	5	Charla: Las tendencia de ChatGPT y DeepSeek en la sociedad	Ciudad X	2025-05-01	1	Empresa Y
6	1	Congreso de impresión y Planchado de Circuitos en placas de silicio	Ciudad X	2025-06-01	2	Empresa Z
7	4	Diplomado en Administración de proyectos	Ciudad X	2025-07-01	4	Empresa X
8	4	Diplomado en Analítica de datos	Ciudad X	2025-08-01	4	Empresa X
9	2	Taller de programación Android	Ciudad X	2025-09-01	3	Empresa Y
10	5	Charla: Los avances tecnológicos de cara al siglo XXII en el área ambiental	Ciudad X	2025-10-01	1	Empresa Z
11	5	Charla: Basura electrónica	Ciudad X	2025-11-01	1	Empresa X
12	1	Congreso: Machine Learning and Deep Learning in the health	Ciudad X	2025-12-01	2	Empresa Y
13	3	Curso: ciberseguridad en las empresas	Ciudad X	2026-01-01	3	Empresa Z
14	3	Curso: Georeferenciación con Machine Learning	Ciudad X	2026-02-01	3	Empresa X
15	1	Congreso: Microrredes	Ciudad X	2026-03-01	2	Empresa Y
16	1	Congreso: Uso de nuevas tecnologías para el desarrollo de herramientas de control ambiental	Ciudad X	2026-04-01	2	Empresa Z
17	2	Taller de Impresión de circuitos integrados en placas de silicio	Ciudad X	2026-05-01	3	Empresa X
18	1	Congreso: Revolución eléctrica autosustentable	Ciudad X	2026-06-01	2	Empresa Y
19	3	Conferencia: El arte de generar nuevas tendencias de aprendizaje automático	Ciudad X	2026-07-01	2	Empresa Z
20	3	Proyecto: Uso de nuevas herramientas de capacitación en la pedagogía actual	Ciudad X	2026-08-01	2	Empresa X
\.


--
-- TOC entry 4977 (class 0 OID 17904)
-- Dependencies: 244
-- Data for Name: herramientas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.herramientas (id, descripcion) FROM stdin;
1	Python
2	OpenCV
3	Arduino
4	Sensor DHT11
5	Android Studio
6	TensorFlow
7	Unity
8	React
9	MySQL
10	Panel Solar
11	Sensores EMG
12	Raspbian
13	Sensor LDR
14	Módulo Piezoeléctrico
15	Unity AR
16	Nanotecnología
17	C++
\.


--
-- TOC entry 4955 (class 0 OID 17737)
-- Dependencies: 222
-- Data for Name: investigador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.investigador (id, nombre, apellido, telefono, correo, sueldo, snii_id) FROM stdin;
1	Juan	Perez	1234567890	juan@example.com	35800.00	\N
2	Pedro	Lopez	1234567890	pedro@example.com	45200.00	1
3	Alicia	Gomez	1234567890	alicia@example.com	35800.00	\N
4	Noemi	Martinez	1234567890	noemi@example.com	30000.00	\N
5	Alondra	Sanchez	1234567890	alondra@example.com	45200.00	2
6	Fernando	Ramirez	1234567890	fernando@example.com	45200.00	3
7	Alejandro	Torres	1234567890	alejandro@example.com	35800.00	\N
8	Katia	Flores	1234567890	katia@example.com	45200.00	4
9	Brenda	Gutierrez	1234567890	brenda@example.com	45200.00	5
10	Luis	Rojas	1234567890	luis@example.com	45200.00	6
\.


--
-- TOC entry 4963 (class 0 OID 17794)
-- Dependencies: 230
-- Data for Name: lineas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lineas (id, descripcion) FROM stdin;
1	IA
2	Energía
3	Microrredes
4	Medio Ambiente
5	Desarrollo humano
6	Desarrollo de Software
7	Química de combustibles
\.


--
-- TOC entry 4951 (class 0 OID 17718)
-- Dependencies: 218
-- Data for Name: nivel_snii; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nivel_snii (id, descripcion) FROM stdin;
1	Candidato
2	Nivel I
3	Nivel II
4	Nivel III
\.


--
-- TOC entry 4974 (class 0 OID 17881)
-- Dependencies: 241
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyectos (id, nombre, fecha_inicio, fecha_termino, ingresos) FROM stdin;
1	Sistema de Autenticación Biométrica con Reconocimiento Facial	2023-01-01	2023-06-30	1800000.00
2	Plataforma de Gestión Escolar en la Nube	2024-01-01	2024-12-31	2200000.00
3	Sistema de Monitoreo de Temperatura y Humedad con IoT	2023-02-01	2023-07-31	1000000.00
4	Brazo Robótico Controlado por Señales Microeléctricas	2023-03-01	2023-08-31	7200000.00
5	Aplicación Móvil para el Aprendizaje de Matemáticas con Gamificación	2023-04-01	2023-08-15	150000.00
6	Uso de Realidad Aumentada en la Enseñanza de HistoriaMóviles	2024-02-01	2024-12-01	100000.00
7	Producción de Bioplásticos a partir de Almidón de Papa	2023-05-01	2023-10-01	400000.00
8	Filtro de Agua Basado en NanotecnologíaMóviles	2023-06-01	2024-06-01	250000.00
9	Vehículo Autónomo para Entrega de Paquetes en Ambientes Controlados	2023-07-01	2023-12-31	5200000.00
10	Exoesqueleto Robótico para Asistencia en Rehabilitación FísicaMóviles	2023-08-01	2024-02-01	800000.00
11	Sistema de Captación y Filtrado de Agua de Lluvia	2023-09-01	2023-11-01	100000.00
12	Biogás a partir de Residuos OrgánicosMóviles	2023-10-01	2024-05-01	120000.00
13	Automatización del Alumbrado Público con Sensores de Luz	2023-11-01	2024-02-01	200000.00
14	Cargador Solar para Dispositivos Móviles	2023-12-01	2024-08-01	700000.00
15	Generador de Energía a partir de Vibraciones Mecánicas	2023-07-01	2024-01-01	3200000.00
\.


--
-- TOC entry 4953 (class 0 OID 17725)
-- Dependencies: 220
-- Data for Name: snii; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snii (id, nivel_id, fecha_asignacion) FROM stdin;
1	2	2023-03-01
2	2	2023-03-01
3	2	2023-03-01
4	2	2023-03-01
5	2	2023-03-01
6	2	2023-03-01
\.


--
-- TOC entry 4959 (class 0 OID 17762)
-- Dependencies: 226
-- Data for Name: tipo_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_estudiante (id, descripcion) FROM stdin;
1	practicante
2	servicio social
3	maestria
4	doctorado
\.


--
-- TOC entry 4969 (class 0 OID 17843)
-- Dependencies: 236
-- Data for Name: tipo_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_evento (id, descripcion) FROM stdin;
1	Congresos
2	Talleres
3	conferencias
4	diplomados
5	charlas
\.


--
-- TOC entry 4980 (class 0 OID 18075)
-- Dependencies: 247
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, username, password, role) FROM stdin;
1	admin	tecmilenio	admin
2	usuario_prueba1	password123	investigador
3	usuario_prueba2	testpass	estudiante
\.


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 232
-- Name: articulos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articulos_id_seq', 15, true);


--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 223
-- Name: carreras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carreras_id_seq', 6, true);


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 227
-- Name: estudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estudiante_id_seq', 11, true);


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 237
-- Name: eventos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventos_id_seq', 20, true);


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 243
-- Name: herramientas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.herramientas_id_seq', 17, true);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 221
-- Name: investigador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.investigador_id_seq', 10, true);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 229
-- Name: lineas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lineas_id_seq', 7, true);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 217
-- Name: nivel_snii_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nivel_snii_id_seq', 4, true);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 240
-- Name: proyectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyectos_id_seq', 15, true);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 219
-- Name: snii_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snii_id_seq', 6, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 225
-- Name: tipo_estudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_estudiante_id_seq', 4, true);


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 235
-- Name: tipo_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_evento_id_seq', 5, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 246
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 4764 (class 2606 OID 17825)
-- Name: articulos articulos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articulos
    ADD CONSTRAINT articulos_pkey PRIMARY KEY (id);


--
-- TOC entry 4748 (class 2606 OID 17760)
-- Name: carreras carreras_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carreras
    ADD CONSTRAINT carreras_nombre_key UNIQUE (nombre);


--
-- TOC entry 4750 (class 2606 OID 17758)
-- Name: carreras carreras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carreras
    ADD CONSTRAINT carreras_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 17831)
-- Name: det_art det_art_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_art
    ADD CONSTRAINT det_art_pkey PRIMARY KEY (investigador_id, articulo_id);


--
-- TOC entry 4774 (class 2606 OID 17869)
-- Name: det_eventos det_eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_eventos
    ADD CONSTRAINT det_eventos_pkey PRIMARY KEY (investigador_id, evento_id);


--
-- TOC entry 4784 (class 2606 OID 17916)
-- Name: det_herr det_herr_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_herr
    ADD CONSTRAINT det_herr_pkey PRIMARY KEY (proyecto_id, herramienta_id);


--
-- TOC entry 4762 (class 2606 OID 17806)
-- Name: det_lineas det_lineas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_lineas
    ADD CONSTRAINT det_lineas_pkey PRIMARY KEY (investigador_id, linea_id);


--
-- TOC entry 4778 (class 2606 OID 17892)
-- Name: det_proy det_proy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_proy
    ADD CONSTRAINT det_proy_pkey PRIMARY KEY (investigador_id, proyecto_id);


--
-- TOC entry 4756 (class 2606 OID 17777)
-- Name: estudiante estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT estudiante_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 17859)
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 17911)
-- Name: herramientas herramientas_descripcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.herramientas
    ADD CONSTRAINT herramientas_descripcion_key UNIQUE (descripcion);


--
-- TOC entry 4782 (class 2606 OID 17909)
-- Name: herramientas herramientas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.herramientas
    ADD CONSTRAINT herramientas_pkey PRIMARY KEY (id);


--
-- TOC entry 4742 (class 2606 OID 17744)
-- Name: investigador investigador_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.investigador
    ADD CONSTRAINT investigador_correo_key UNIQUE (correo);


--
-- TOC entry 4744 (class 2606 OID 17742)
-- Name: investigador investigador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.investigador
    ADD CONSTRAINT investigador_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 17746)
-- Name: investigador investigador_snii_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.investigador
    ADD CONSTRAINT investigador_snii_id_key UNIQUE (snii_id);


--
-- TOC entry 4758 (class 2606 OID 17801)
-- Name: lineas lineas_descripcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas
    ADD CONSTRAINT lineas_descripcion_key UNIQUE (descripcion);


--
-- TOC entry 4760 (class 2606 OID 17799)
-- Name: lineas lineas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas
    ADD CONSTRAINT lineas_pkey PRIMARY KEY (id);


--
-- TOC entry 4738 (class 2606 OID 17723)
-- Name: nivel_snii nivel_snii_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_snii
    ADD CONSTRAINT nivel_snii_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 17886)
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);


--
-- TOC entry 4740 (class 2606 OID 17730)
-- Name: snii snii_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snii
    ADD CONSTRAINT snii_pkey PRIMARY KEY (id);


--
-- TOC entry 4752 (class 2606 OID 17769)
-- Name: tipo_estudiante tipo_estudiante_descripcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_estudiante
    ADD CONSTRAINT tipo_estudiante_descripcion_key UNIQUE (descripcion);


--
-- TOC entry 4754 (class 2606 OID 17767)
-- Name: tipo_estudiante tipo_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_estudiante
    ADD CONSTRAINT tipo_estudiante_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 17850)
-- Name: tipo_evento tipo_evento_descripcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_evento
    ADD CONSTRAINT tipo_evento_descripcion_key UNIQUE (descripcion);


--
-- TOC entry 4770 (class 2606 OID 17848)
-- Name: tipo_evento tipo_evento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_evento
    ADD CONSTRAINT tipo_evento_pkey PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 18080)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4788 (class 2606 OID 18082)
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- TOC entry 4791 (class 2606 OID 17783)
-- Name: estudiante fk_carrera; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT fk_carrera FOREIGN KEY (carrera_id) REFERENCES public.carreras(id);


--
-- TOC entry 4796 (class 2606 OID 17837)
-- Name: det_art fk_det_art_articulo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_art
    ADD CONSTRAINT fk_det_art_articulo FOREIGN KEY (articulo_id) REFERENCES public.articulos(id);


--
-- TOC entry 4797 (class 2606 OID 17832)
-- Name: det_art fk_det_art_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_art
    ADD CONSTRAINT fk_det_art_investigador FOREIGN KEY (investigador_id) REFERENCES public.investigador(id);


--
-- TOC entry 4799 (class 2606 OID 17875)
-- Name: det_eventos fk_det_eventos_evento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_eventos
    ADD CONSTRAINT fk_det_eventos_evento FOREIGN KEY (evento_id) REFERENCES public.eventos(id);


--
-- TOC entry 4800 (class 2606 OID 17870)
-- Name: det_eventos fk_det_eventos_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_eventos
    ADD CONSTRAINT fk_det_eventos_investigador FOREIGN KEY (investigador_id) REFERENCES public.investigador(id);


--
-- TOC entry 4803 (class 2606 OID 17922)
-- Name: det_herr fk_det_herr_herramienta; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_herr
    ADD CONSTRAINT fk_det_herr_herramienta FOREIGN KEY (herramienta_id) REFERENCES public.herramientas(id);


--
-- TOC entry 4804 (class 2606 OID 17917)
-- Name: det_herr fk_det_herr_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_herr
    ADD CONSTRAINT fk_det_herr_proyecto FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id);


--
-- TOC entry 4794 (class 2606 OID 17807)
-- Name: det_lineas fk_det_lineas_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_lineas
    ADD CONSTRAINT fk_det_lineas_investigador FOREIGN KEY (investigador_id) REFERENCES public.investigador(id);


--
-- TOC entry 4795 (class 2606 OID 17812)
-- Name: det_lineas fk_det_lineas_linea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_lineas
    ADD CONSTRAINT fk_det_lineas_linea FOREIGN KEY (linea_id) REFERENCES public.lineas(id);


--
-- TOC entry 4801 (class 2606 OID 17893)
-- Name: det_proy fk_det_proy_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_proy
    ADD CONSTRAINT fk_det_proy_investigador FOREIGN KEY (investigador_id) REFERENCES public.investigador(id);


--
-- TOC entry 4802 (class 2606 OID 17898)
-- Name: det_proy fk_det_proy_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_proy
    ADD CONSTRAINT fk_det_proy_proyecto FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id);


--
-- TOC entry 4798 (class 2606 OID 17860)
-- Name: eventos fk_eventos_tipo_evento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT fk_eventos_tipo_evento FOREIGN KEY (tipo_evento_id) REFERENCES public.tipo_evento(id);


--
-- TOC entry 4792 (class 2606 OID 17778)
-- Name: estudiante fk_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT fk_investigador FOREIGN KEY (investigador_id) REFERENCES public.investigador(id);


--
-- TOC entry 4789 (class 2606 OID 17731)
-- Name: snii fk_nivel_snii; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snii
    ADD CONSTRAINT fk_nivel_snii FOREIGN KEY (nivel_id) REFERENCES public.nivel_snii(id);


--
-- TOC entry 4790 (class 2606 OID 17747)
-- Name: investigador fk_snii_investigador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.investigador
    ADD CONSTRAINT fk_snii_investigador FOREIGN KEY (snii_id) REFERENCES public.snii(id);


--
-- TOC entry 4793 (class 2606 OID 17788)
-- Name: estudiante fk_tipo_estudiante; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT fk_tipo_estudiante FOREIGN KEY (tipo_estudiante_id) REFERENCES public.tipo_estudiante(id);


-- Completed on 2025-03-19 22:19:56

--
-- PostgreSQL database dump complete
--

