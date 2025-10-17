export default function ErrorMessage({ show, children }) {
  if (!show) return null;
  return <p className="mt-1 text-sm text-rose-600">{children}</p>;
}
