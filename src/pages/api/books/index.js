import prisma from "../../../../lib/prisma";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const books = await prisma.book.findMany({});
      return res.json({ books });
    case "POST":
      const { title, author, publisher, year, pages } = req.body;
      try {
        const newBook = await prisma.book.create({
          data: {
            title,
            author,
            publisher,
            year,
            pages,
          },
        });
        res.status(201).json({
          message: "Success",
          data: newBook,
        });
      } catch (error) {
        res.status(400).json({ message: "Book already exists." });
      }
    case "PUT":
      return res.json({ message: "from put" });
    case "DELETE":
      return res.json({ message: "from delete" });
    default:
      return res.json({ message: "method is not allowed." });
  }
}
