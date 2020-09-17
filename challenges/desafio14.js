db.trips.aggregate([
  {
    $addFields: { dif: { $subtract: ["$stopTime", "$startTime"] } }
  },
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: "$dif" }
    }
  },
  {
    $addFields: { convert: { $divide: ["$media", 60000] } }
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$convert" }
    }
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 }
]);
