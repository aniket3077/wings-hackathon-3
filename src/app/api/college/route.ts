import axios from "axios";
import { NextRequest,NextResponse } from "next/server";


export async function GET(request:NextRequest, response:NextResponse) {
   const res = await axios.get('https://raw.githubusercontent.com/VarthanV/Indian-Colleges-List/master/colleges.json'); 
   return NextResponse.json(res.data);
}