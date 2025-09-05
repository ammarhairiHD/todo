const BACKEND_BASE_URL = process.env.BACKEND_BASE;

export async function GET(req: Request, res: Response) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/profile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({
      message: err,
    });
  }
}
