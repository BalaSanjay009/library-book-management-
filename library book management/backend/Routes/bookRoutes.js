const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* CREATE – Insert book */
router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* READ – All books */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* READ – By category */
router.get("/category/:cat", async (req, res) => {
  const books = await Book.find({ category: req.params.cat });
  res.json(books);
});

/* READ – After year 2015 */
router.get("/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

/* UPDATE – Change copies */
router.put("/copies/:id", async (req, res) => {
  const { availableCopies } = req.body;

  if (availableCopies < 0) {
    return res.status(400).json({ message: "Negative stock not allowed" });
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { availableCopies },
    { new: true }
  );

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

/* UPDATE – Change category */
router.put("/category/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

/* DELETE – Remove if copies = 0 */
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies !== 0) {
    return res.status(400).json({ message: "Cannot delete book with stock" });
  }

  await book.deleteOne();
  res.json({ message: "Book removed" });
});

module.exports = router;