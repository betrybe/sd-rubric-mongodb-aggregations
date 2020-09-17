db.movies.aggregate([
  { 
    $match: { 
      cast: { $exists: true },
      languages: { $exists: true },
      languages: "English"
    }
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" }
    }
  },
  {
    $project: {
      numeroFilmes: "$numeroFilmes",
      mediaIMDB: { $round: ["$mediaIMDB", 1] }
    }
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    }
  }
]);
