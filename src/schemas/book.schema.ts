import z from "zod";

// title string
// description string
// isbn string
// author string
// categories string[] fk[]
// publisher string fk
// publishedAt Date
// language string
// edition number

const createBookSchema = z.object({
  title: z
    .string("Title of book")
    .trim()
    .min(3, "Book title must have atleast 3 characters.")
    .max(255, "Book title can't have more than 255 characters"),
  description: z
    .string("Book description")
    .trim()
    .min(20, "Book description must be 20 character long"),
  isbn: z

})
