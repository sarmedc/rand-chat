import connectMongoDB from "@/libs/mongodb";
import ChatRoom from "@/models/chatRoom";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { user } = await request.json();
  await connectMongoDB();
  await ChatRoom.create({ users: [user], messages: [] });
  return NextResponse.json({ message: "Chat Room Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const chatRooms = await ChatRoom.find();
  return NextResponse.json({ chatRooms });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ChatRoom.findByIdAndDelete(id);
  return NextResponse.json({ message: "Chat Room deleted" }, { status: 200 });
}
