// Ref: https://authjs.dev/guides/pages/error
export default async function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Error</h1>
      <p>Something went wrong! There was a problem when trying to sign you in. Please contact us if this error persists.</p>
    </main>
  );
}
