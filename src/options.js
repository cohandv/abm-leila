/**
 * Opciones para cada campo tipo Select. Edita estos arrays según tu negocio.
 */
module.exports = {
  categoria: ["Opción A", "Opción B", "Opción C"],
  tipo: ["Tipo 1", "Tipo 2", "Tipo 3"],
  nube: ["AWS", "Azure", "GCP", "On-prem", "Híbrida"],
  status: ["Activo", "Inactivo", "Pendiente", "En revisión"],
  administracion: ["Interna", "Externa", "Mixta"],
  backup_interno: ["Sí", "No", "N/A"],
  plataforma: ["Linux", "Windows", "Otro"],
  dc: ["DC1", "DC2", "DC3", "N/A"],
  ab: ["A", "B", "N/A"],
  /** Multi-select SERVICIO */
  servicio: [
    "Consultoría",
    "Soporte",
    "Hosting",
    "Licencias",
    "Integración",
    "Otro",
  ],
};
