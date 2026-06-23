export const statusLabels = {
  ONGOING: "En emision",
  FINISHED: "Finalizado",
  PAUSED: "Pausado",
  CANCELLED: "Cancelado",
  UPCOMING: "Proximamente",
};

export const formatNumber = (value) => new Intl.NumberFormat("es-AR").format(value || 0);

export const normalizeText = (value) =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
