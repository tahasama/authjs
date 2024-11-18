import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>this is a Auth app</h1>
      <h2>we will create an all auth app with auth.js</h2>
      <p>we will show here if user is logged or not</p>
    </div>
  );
}
