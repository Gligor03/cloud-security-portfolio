import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section">
      <div className="container">
        <h1 className="sectionTitle">Page not found</h1>
        <p className="sectionSubtitle">
          The page you requested does not exist or was moved.
        </p>
        <Link href="/" className="btn btnPrimary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
