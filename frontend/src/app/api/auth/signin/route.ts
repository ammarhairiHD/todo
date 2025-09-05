const BACKEND_BASE_URL = process.env.BACKEND_BASE;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_BASE_URL}auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (err) {
    return Response.json({ message: "Error sending data" }, { status: 500 });
  }
}
