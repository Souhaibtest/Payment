import { db } from "@/db";
import { users } from "../../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query the database for the user info based on the email
    const [userInfo] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)));

    if (!userInfo) {
      return new Response(
        JSON.stringify({
          error: "userNotFound",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(userInfo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Handle errors (e.g., invalid JSON or database issues)
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
