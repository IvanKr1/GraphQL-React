const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const LaunchType = require("./typeDef/Launch");
const RocketType = require("./typeDef/Rocket");

let rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/?limit=50`)
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
    rockets: {
      type: RocketType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then((res) => res.data);
      },
    }
  },
});

module.exports = new GraphQLSchema({ query: rootQuery });
