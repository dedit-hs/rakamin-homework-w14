import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.status(200).json({
        message: "User created successfully",
      });
    } catch (err) {
      return res.status(400).json({ message: "User already exists" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
// const bcrypt = require("bcrypt");

// export const POST = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(req.body);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const { password: passwordDB, ...user } = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });
//     return res.status(201).json({ message: "user created" });
//   } catch (error) {
//     return res.status(400).json({ message: "User already exists." });
//   }
// };
