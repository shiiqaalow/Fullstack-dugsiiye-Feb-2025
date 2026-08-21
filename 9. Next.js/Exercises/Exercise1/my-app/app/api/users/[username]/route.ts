import { NextRequest,NextResponse } from "next/server" 
interface userData {
    params: {
        username: string
    }

}

export async function GET  (NextRequest,{params}: userData) {
    const {username} =  params

    return NextResponse.json({
        success: true,
        status: 200,
        message: 'User successfully founded',
        user: `HELLO, WELCOME BACK ${username}`
        
    })
}
