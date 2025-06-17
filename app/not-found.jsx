export default function NotFound() {
  return (
    <div className={"page not-found"} style={{ textAlign: "center", marginTop: "2rem" }}>
      <div className="page__container container">
        <h1>Page non trouvée</h1>
        <p>La page que vous cherchez n’existe pas ou a été supprimée.</p>
      </div>
    </div>
  );
}
