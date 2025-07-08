// handle sign up api request
import { signUpUser } from "@/lib/user.action"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password, fullName, phone } = body

        if (!email || !password || !fullName) {
            return Response.json(
                { error: "Email, password, and fullName are required" },
                { status: 400 }
            )
        }

        const result = await signUpUser({ email, password, fullName, phone })

        if (result.error) {
            return Response.json(
                { error: result.error },
                { status: 400 }
            )
        }

        return Response.json(
            { 
                message: "User signed up successfully",
                user: result.user,
                session: result.session
            },
            { status: 201 }
        )

    } catch (error: any) {
        console.error("Sign up error:", error)
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


