export default async function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="grid gap-10">
        <h1 className="text-xl">This is a Auth app</h1>
        <h2 className="text-lg">We will create an all auth app with auth.js</h2>
        <p>The navbar will show if user is logged or not</p>
        {/* <Logout /> */}
      </main>
    </div>
  );
}
