import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "database", "users.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // Đọc nội dung body của request
  const newUser = await request.json();

  // Xác định đường dẫn tới file users.json
  const filePath = path.join(process.cwd(), "database", "users.json");

  // Đọc dữ liệu hiện có từ file
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Thêm người dùng mới vào danh sách
  data.push(newUser);

  // Ghi lại dữ liệu đã cập nhật vào file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Trả về phản hồi với người dùng mới được thêm vào
  return NextResponse.json({ message: "Thêm mới thành công", newUser });
}
