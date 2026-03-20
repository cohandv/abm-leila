const express = require("express");
const { pool } = require("../db");
const options = require("../options");

const router = express.Router();

function toStringArray(val) {
  if (val == null || val === "") return [];
  return Array.isArray(val) ? val : [val];
}

function rowFromBody(body) {
  return {
    comercial: body.comercial?.trim() || null,
    categoria: body.categoria || null,
    tipo: body.tipo || null,
    nube: body.nube || null,
    status: body.status || null,
    administracion: body.administracion || null,
    backup_interno: body.backup_interno || null,
    plataforma: body.plataforma || null,
    dc: body.dc || null,
    ab: body.ab || null,
    servicio: toStringArray(body.servicio),
    otros: body.otros?.trim() || null,
    contacto: body.contacto?.trim() || null,
    columna1: body.columna1?.trim() || null,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, comercial, categoria, tipo, nube, status, administracion,
              backup_interno, plataforma, dc, ab, servicio, otros, contacto, columna1
       FROM records ORDER BY id ASC`
    );
    res.render("index", { records: rows, options });
  } catch (e) {
    next(e);
  }
});

router.get("/new", (req, res) => {
  res.render("form", {
    record: null,
    options,
    title: "Nuevo registro",
    action: "/",
    method: "POST",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const r = rowFromBody(req.body);
    await pool.query(
      `INSERT INTO records (
        comercial, categoria, tipo, nube, status, administracion,
        backup_interno, plataforma, dc, ab, servicio, otros, contacto, columna1
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [
        r.comercial,
        r.categoria,
        r.tipo,
        r.nube,
        r.status,
        r.administracion,
        r.backup_interno,
        r.plataforma,
        r.dc,
        r.ab,
        r.servicio,
        r.otros,
        r.contacto,
        r.columna1,
      ]
    );
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(404).send("No encontrado");
    const { rows } = await pool.query(
      `SELECT * FROM records WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return res.status(404).send("No encontrado");
    res.render("form", {
      record: rows[0],
      options,
      title: "Editar registro",
      action: `/${id}`,
      method: "POST",
    });
  } catch (e) {
    next(e);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(404).send("No encontrado");
    const r = rowFromBody(req.body);
    const result = await pool.query(
      `UPDATE records SET
        comercial = $1, categoria = $2, tipo = $3, nube = $4, status = $5,
        administracion = $6, backup_interno = $7, plataforma = $8, dc = $9, ab = $10,
        servicio = $11, otros = $12, contacto = $13, columna1 = $14
       WHERE id = $15`,
      [
        r.comercial,
        r.categoria,
        r.tipo,
        r.nube,
        r.status,
        r.administracion,
        r.backup_interno,
        r.plataforma,
        r.dc,
        r.ab,
        r.servicio,
        r.otros,
        r.contacto,
        r.columna1,
        id,
      ]
    );
    if (result.rowCount === 0) return res.status(404).send("No encontrado");
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(404).send("No encontrado");
    await pool.query(`DELETE FROM records WHERE id = $1`, [id]);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
