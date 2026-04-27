import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, recipientName } = body;

    console.log("FAKE WhatsApp send to:", to);

    // מדמה הצלחה
    return NextResponse.json({
      success: true,
      message: "Fake WhatsApp sent",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}