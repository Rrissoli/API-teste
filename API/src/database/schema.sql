CREATE DATABASE api_teste_envios_agendados;

CREATE TABLE contacts (
  id uuid primary key,
  nome varchar(40),
  numero char(12));
  
 CREATE TABLE shipments (
   id uuid primary key,
   id_contact uuid references contacts(id),
   msg text,
   data_criado timestamp,
   data_envio timestamp,
   status char(10));
