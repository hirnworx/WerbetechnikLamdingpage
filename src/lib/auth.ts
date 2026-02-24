import { headers } from "next/headers";

export async function isAdmin(): Promise<boolean> {
  const h = await headers();
  const auth = h.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const decoded = Buffer.from(auth.slice(6), "base64").toString();
  const [user, pass] = decoded.split(":");

  return (
    user === (process.env.ADMIN_USER || "admin") &&
    pass === (process.env.ADMIN_PASSWORD || "changeme")
  );
}

export function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
      "Content-Type": "application/json",
    },
  });
}
