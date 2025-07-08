// logout api
import { account } from "@/lib/apprite.config";

export async function POST() {
  try {
    await account.deleteSession("current");
    return new Response(
      JSON.stringify({ success: true, message: "Logged out successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Logout failed." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
