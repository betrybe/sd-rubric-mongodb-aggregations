db.trips.aggregate([
  {
    $match: { 
      startTime: { 
        $gte: ISODate("2016-03-10"), 
        $lt: ISODate("2016-03-11") 
      }
    }
  },
  {
    $addFields: { dif: { $subtract: ["$stopTime", "$startTime"] } }
  },
  {
    $group: {
      _id: "",
      media: { $avg: "$dif" }
    }
  },
  {
    $addFields: { convert: { $divide: ["$media", 60000] } }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$convert" }
    }
  }
]);
