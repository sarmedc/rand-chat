import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;
  await connectMongoDB();
  const user = await User.findOne({ email });
  return NextResponse.json({ user }, { status: 200 });
}
