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

    axios({
      method: 'post',
      url: 'http://localhost:5555/api/auth/signin/validate',
      data: data,
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
      console.log("res ", response.data);
    })
    .catch(error => {
        console.error(error);
    });


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
