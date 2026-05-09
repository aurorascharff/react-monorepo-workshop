import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <p className="text-6xl font-bold text-muted-foreground/30">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-primary underline underline-offset-4 text-sm"
      >
        Go to dashboard
      </Link>
    </div>
  )
}
