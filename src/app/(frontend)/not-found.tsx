import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="bg-bg px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow mb-4">404</p>
        <h1 className="h-section">No encontramos esta p&aacute;gina.</h1>
        <p className="mt-5 text-text-muted">
          Puede que la direcci&oacute;n haya cambiado o que la p&aacute;gina no est&eacute;
          publicada.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-sm bg-primary px-6 py-3 font-heading font-semibold text-text-on-dark"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
