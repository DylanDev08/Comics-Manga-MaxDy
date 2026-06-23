import Button from "../components/common/Button";

function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Pagina no encontrada</h1>
      <Button to="/catalogo">Volver al catalogo</Button>
    </section>
  );
}

export default NotFoundPage;
