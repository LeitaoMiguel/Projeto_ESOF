import { NextResponse, NextRequest } from 'next/server'

import { getSession, signOut } from "next-auth/react"

export async function middleware(req) {
    const session = await getSession({ req });
    
    //console.log(session)
 {
/*if (!session)
        signOut(); */
 }
    

    return NextResponse.next();
}