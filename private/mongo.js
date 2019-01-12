// Database instance

const mongoUN = "sbhacks_user",
      mongoPW = "sbhackszot2019",
      mongoCluster = "@ds155714.mlab.com:55714/sbhacks",
      mongoURL = "mongodb://" + mongoUN + ":" + mongoPW + mongoCluster;

module.exports = mongoURL;