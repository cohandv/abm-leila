# ABM — CRUD simple (Node.js + PostgreSQL + Docker)

Aplicación mínima para **alta, edición y borrado** de filas persistidas en PostgreSQL. Interfaz con **EJS** y **Tailwind CSS** (CDN), sin paso de build en el frontend.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose

## Arranque con Docker

```bash
docker compose up --build
```

Abre **http://localhost:3000**.

La base de datos se crea al primer arranque del volumen de Postgres; el esquema está en [`init.sql`](init.sql).

## Variables de entorno

| Variable         | Descripción                          | Ejemplo (Compose)                    |
| ---------------- | ------------------------------------ | ------------------------------------ |
| `DATABASE_URL`   | Cadena de conexión PostgreSQL        | `postgresql://abm:abm@db:5432/abm`   |
| `PORT`           | Puerto HTTP del servidor             | `3000`                               |

En `docker-compose.yml` ya están definidas para el servicio `app`.

## Desarrollo local (sin Docker para la app)

1. Postgres en marcha (por ejemplo solo el servicio `db`: `docker compose up db`).
2. Instalar dependencias: `npm install`
3. Exportar `DATABASE_URL` apuntando a tu instancia local, por ejemplo:
   `export DATABASE_URL=postgresql://abm:abm@localhost:5432/abm`
4. Aplicar el esquema: `psql "$DATABASE_URL" -f init.sql`
5. `npm run dev` (Node con `--watch`) o `npm start`

## Opciones de los desplegables (Select / Multi-select)

Edita los arrays en [`src/options.js`](src/options.js). Ahí defines las opciones de **Categoría**, **Tipo**, **Nube**, **Status**, **Administración**, **Backup interno**, **Plataforma**, **DC**, **AB** y la lista del multi-select **Servicio**.

Tras cambiar opciones, reinicia el proceso Node (o reconstruye la imagen si usas Docker).

## Estructura relevante

- [`src/server.js`](src/server.js) — Express y vistas EJS
- [`src/routes/records.js`](src/routes/records.js) — Rutas CRUD
- [`src/db.js`](src/db.js) — Pool de `pg` y espera a que Postgres esté listo
- [`src/views/`](src/views/) — Plantillas EJS

## Credenciales por defecto (solo desarrollo)

Usuario/contraseña/base en Compose: `abm` / `abm` / `abm`. **No uses esto en producción** sin cambiar credenciales y exponer Postgres correctamente.
