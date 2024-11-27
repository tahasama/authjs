"use client";
export default async function Home() {
  const handleLogin = async (e: React.FormEvent) => {
    try {
      const response = await fetch("/api/authExpo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "t@t.com", password: "tttttt" }),
      });

      const data = await response.json();

      // Check if the response was successful
      if (response.ok) {
        // setUser(data.user); // Set the user data if login was successful
        // setErrorMessage(""); // Clear any previous errors
        console.log("🚀 ~ Login success, user:", data.user);
      } else {
        // setErrorMessage(data.error || "Login failed");
        console.error("🚀 ~ Login error:", data.error);
      }
      console.log("🚀 ~ handleLogin ~ data.user:", data.user);
    } catch (error) {
      // setErrorMessage("An error occurred while logging in.");
      console.error("🚀 ~ Error during login:", error);
    }
  };
  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="grid gap-10">
        <button type="submit" onClick={handleLogin}>
          Click
        </button>
        <h1 className="text-xl">This is a Auth app</h1>
        <h2 className="text-lg">We will create an all auth app with auth.js</h2>
        <p>The navbar will show if user is logged or not</p>
      </main>
    </div>
  );
}
