import connectMongoDB from "@/libs/mongodb";
import ChatRoom from "@/models/chatRoom";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const { id } = await request.json();
  await connectMongoDB();
  const newRoomId = await ChatRoom.create({
    users: [id],
    messages: { [id]: [] },
  }).then((newDocument) => {
    return { id: newDocument._id };
  });
  return NextResponse.json(
    { message: "Chat Room Created", id: newRoomId.id },
    { status: 201 }
  );
}

export async function GET(request, { params }) {
  const id = request.nextUrl.searchParams.get("id");
  const chatId = request.nextUrl.searchParams.get("chatId");
  const isMulti = JSON.parse(request.nextUrl.searchParams.get("isMulti"));
  await connectMongoDB();
  let chatRooms;
  if (id) {
    let filter = {
      ["messages." + id]: { $exists: true },
    };
    if (chatId !== "undefined") filter = { ...filter, _id: chatId.toString() };
    if (isMulti) chatRooms = await ChatRoom.find(filter);
    else chatRooms = await ChatRoom.findOne(filter);
  } else chatRooms = await ChatRoom.find();
  return NextResponse.json({ chatRooms });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ChatRoom.findByIdAndDelete(id);
  return NextResponse.json({ message: "Chat Room deleted" }, { status: 200 });
}
