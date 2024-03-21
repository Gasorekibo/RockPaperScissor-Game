const router = require("express").Router();
const Movies = require("../models/Movie");
const verifyToken = require("../verifyToken");

// CREATE A MOVIE

// router.post("/", verifyToken, async (req, res) => {
//   if (req.user.isAdmin) {
//     const newMovie = new Movies({ ...req.body });
//     try {
//       const saveMovie = await newMovie.save();
//       res.status(200).json(saveMovie);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//       console.log("This user is not an admin");
//     }
//   } else {
//     res.status(403).json("You can create Movie only on your account");
//   }
// });
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movies(req.body);
    try {
      const saveMovie = await newMovie.save();
      res.status(200).json(saveMovie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can create Movie only on your account");
  }
});

// UPDATE MOVIE

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await Movies.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateMovie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

// DELETE MOVIE
router.delete("/find/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movies.findByIdAndDelete(req.params.id);
      res.status(200).json("Movie has been deleted...");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

// GET A SPECIFIC MOVIE
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET RANDOM MOVIE

router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movies;
  try {
    if (type === "series") {
      movies = await Movies.aggregate([
        { $match: { isSerie: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movies = await Movies.aggregate([
        { $match: { isSerie: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL MOVIES

router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movies.find();
      // reverse function is added to review the newly added movies.
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can view only your account");
  }
});

module.exports = router;
