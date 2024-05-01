import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, role } = await request.json();
  await connectMongoDB();
  await Users.create({ name, email, role });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

// export async function GET(request) {
//   const { email } = await request.json();
//   await connectMongoDB();
//   const user = (await Users.findOne({ email }));
//   console.log("api: ", user);
//   return NextResponse.json({ user });
// }

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
