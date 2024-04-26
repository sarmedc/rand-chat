import connectMongoDB from "@/libs/mongodb";
import ChatRoom from "@/models/chatRoom";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const { id } = await request.json();
  await connectMongoDB();
  const newRoomId = await uuidv4().toString();
  await ChatRoom.create({
    id: newRoomId,
    users: [id],
    messages: { [id]: [] },
  });
  return NextResponse.json(
    { message: "Chat Room Created", id: newRoomId },
    { status: 201 }
  );
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
