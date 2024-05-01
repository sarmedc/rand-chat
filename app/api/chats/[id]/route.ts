import connectMongoDB from "@/libs/mongodb";
import ChatRoom from "@/models/chatRoom";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newUser: userId,
    newMessage: message,
    isNewUser,
  } = await request.json();
  await connectMongoDB();
  if (isNewUser)
    await ChatRoom.findByIdAndUpdate(id, {
      $push: { users: userId },
      ["messages." + userId]: [],
    });
  else
    await ChatRoom.findByIdAndUpdate(id, {
      $push: { ["messages." + userId]: message },
    });
  return NextResponse.json(
    { message: "Chat Room updated", id },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const chatRoom = await ChatRoom.findOne({ _id: id });
  return NextResponse.json({ chatRoom }, { status: 200 });
}
