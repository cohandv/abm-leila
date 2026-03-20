CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  comercial TEXT,
  categoria TEXT,
  tipo TEXT,
  nube TEXT,
  status TEXT,
  administracion TEXT,
  backup_interno TEXT,
  plataforma TEXT,
  dc TEXT,
  ab TEXT,
  servicio TEXT[] DEFAULT '{}',
  otros TEXT,
  contacto TEXT,
  columna1 TEXT
);
