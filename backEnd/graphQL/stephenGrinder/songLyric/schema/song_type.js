const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./lyric_type');
const Song = require("../models/song");

const SongType = new GraphQLObjectType({
  name:  'SongType',
  fields: () => ({
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue._id);
      }
    }
  })
});

module.exports = SongType;
