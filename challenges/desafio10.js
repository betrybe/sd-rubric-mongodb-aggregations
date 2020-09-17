db.trips.aggregate([
  {
    $addFields: { 
      dif: { $subtract: ["$stopTime", "$startTime"] }
    }
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: "$dif" }
    }
  },
  {
    $addFields: { 
      convert: { $divide: ["$media", 3600000] }
    }
  },
  { $sort: { convert: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$convert", 2] }
    }
  },
]);
