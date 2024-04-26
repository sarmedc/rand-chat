import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, role, id } = await request.json();
  await connectMongoDB();
  await Users.create({ name, email, role, id });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json({ users });
}

// export async function PUT(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Users.findByIdAndUpdate(id, { $push: { activeRooms: id } });
//   return NextResponse.json({ message: "User Updated" }, { status: 200 });
// }

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Users.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
