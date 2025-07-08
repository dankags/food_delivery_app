// sign in api
import { account } from "@/lib/apprite.config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ loginSuccess: false, message: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a session with Appwrite
    const session = await account.createEmailPasswordSession(email, password);

    return new Response(
      JSON.stringify({ loginSuccess: true, session }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    let message = error?.message || "Sign in failed.";
    // Appwrite error messages may be in error.response.message
    if (error?.response?.message) {
      message = error.response.message;
    }
    return new Response(
      JSON.stringify({ loginSuccess: false, message }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
