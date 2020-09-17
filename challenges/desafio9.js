db.trips.aggregate([
  { 
    $match: { 
      birthYear: { $exists: true },
      birthYear: { $ne: "" }
    }
  },
  {
    $addFields: { data: { $toInt: "$birthYear" } }
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: { $max: "$data" },
      menorAnoNascimento: { $min: "$data" }
    }
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maiorAnoNascimento",
      menorAnoNascimento: "$menorAnoNascimento",
    }
  },
]);
