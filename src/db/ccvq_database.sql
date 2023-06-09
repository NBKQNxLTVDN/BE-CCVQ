PGDMP                            z            ccvq_database    14.5    14.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    16411    ccvq_database    DATABASE     q   CREATE DATABASE ccvq_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE ccvq_database;
                bkt_ccvq    false            
           0    0    DATABASE ccvq_database    COMMENT     :   COMMENT ON DATABASE ccvq_database IS 'Database for CCVQ';
                   bkt_ccvq    false    3337            �            1259    16431    chats    TABLE     �   CREATE TABLE public.chats (
    user_id text NOT NULL,
    socket_id text NOT NULL,
    name text NOT NULL,
    department text NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.chats;
       public         heap    bkt_ccvq    false            �            1259    16438    messages    TABLE     �   CREATE TABLE public.messages (
    date date NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    user_id text NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.messages;
       public         heap    bkt_ccvq    false            �            1259    16450    scores    TABLE     �   CREATE TABLE public.scores (
    role text NOT NULL,
    name text,
    "order" integer,
    score integer,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.scores;
       public         heap    bkt_ccvq    false            �            1259    16419    users    TABLE     �   CREATE TABLE public.users (
    role text NOT NULL,
    name text NOT NULL,
    socket_id text NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.users;
       public         heap    bkt_ccvq    false            �            1259    16426    viewers    TABLE     i   CREATE TABLE public.viewers (
    socket_id text NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.viewers;
       public         heap    bkt_ccvq    false                      0    16431    chats 
   TABLE DATA           _   COPY public.chats (user_id, socket_id, name, department, "createdAt", "updatedAt") FROM stdin;
    public          bkt_ccvq    false    211   �                 0    16438    messages 
   TABLE DATA           Z   COPY public.messages (date, message, type, user_id, "createdAt", "updatedAt") FROM stdin;
    public          bkt_ccvq    false    212   �                 0    16450    scores 
   TABLE DATA           V   COPY public.scores (role, name, "order", score, "createdAt", "updatedAt") FROM stdin;
    public          bkt_ccvq    false    213   �       �          0    16419    users 
   TABLE DATA           P   COPY public.users (role, name, socket_id, "createdAt", "updatedAt") FROM stdin;
    public          bkt_ccvq    false    209   	                  0    16426    viewers 
   TABLE DATA           F   COPY public.viewers (socket_id, "createdAt", "updatedAt") FROM stdin;
    public          bkt_ccvq    false    210   &       n           2606    16437    chats chat_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chat_pkey PRIMARY KEY (user_id);
 9   ALTER TABLE ONLY public.chats DROP CONSTRAINT chat_pkey;
       public            bkt_ccvq    false    211            p           2606    16444    messages message_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_pkey PRIMARY KEY (date);
 ?   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_pkey;
       public            bkt_ccvq    false    212            r           2606    16456    scores scores_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (role);
 <   ALTER TABLE ONLY public.scores DROP CONSTRAINT scores_pkey;
       public            bkt_ccvq    false    213            l           2606    16425    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (role);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            bkt_ccvq    false    209            s           2606    16445    messages message_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_fkey FOREIGN KEY (user_id) REFERENCES public.chats(user_id) NOT VALID;
 ?   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_fkey;
       public          bkt_ccvq    false    212    3182    211                  x^����� � �            x^����� � �         3   x^K��L�+1��"###]K]CN�+�̈8e��)3!�,F��� ��#�      �      x^����� � �             x^����� � �     