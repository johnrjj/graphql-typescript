import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { 
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs,
  nodeDefinitions, 
  fromGlobalId,
} from 'graphql-relay';
import { videoType } from './types';
import { getVideos, getObjectById } from './api';
import { nodeField } from './types';

const { connectionType: VideoConnection } = connectionDefinitions({
  nodeType: videoType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of objects in this connection.',
      resolve: (conn) => conn.edges.length,
    },
  }),
});

// What you can query on!
const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    node: nodeField,
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video.',
        },
      },
    },
    videos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        getVideos(),
        args,
      ),
    },
  },
});

export {
  queryType,
};


