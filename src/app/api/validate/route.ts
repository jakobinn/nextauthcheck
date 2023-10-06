import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {

    let tokenTemp = await axios.get(
      process.env.NEXTAUTH_URL + "/api/auth/csrf"
    );
    
    const data = {
      csrfToken: tokenTemp.data.csrfToken,
      email: "gtest",
      password: "gtest",
      json: true,
      redirect: false,
    };

    let response = await axios({
      method: 'post',
      url: 'http://localhost:5555/api/auth/callback/validate',
      data: data,
      headers: {
          'Content-Type': 'application/json'
      }
    })

    console.log("res: ", response.data);


    return NextResponse.json({
      status: 200,
      data: "res",
      csrfToken: tokenTemp.data.csrfToken,
      dataRes: "",
    });
    
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({
      message: "An Error occurred while run",
      status: 500,
      err: err,
    });
  }
}
