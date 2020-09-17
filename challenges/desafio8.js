db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { air: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$air"] }
          }
        }
      ],
      as: "aliancas_rotas"
    }
  },
  {
    $addFields: { aliRotSom: { $size: "$aliancas_rotas" } }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$aliRotSom" }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]).pretty();
