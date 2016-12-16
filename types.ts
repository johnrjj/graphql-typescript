import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { 
  globalIdField,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs,
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import { getObjectById } from './api';

// Mechanism to make GraphQL Relay compliant (needs to be able to requery any item (using a global id))
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id); // given a type and an id, resolve the actual object
  },
  (object) => {
    return object.title ? videoType : null // given an object, what is its type??
  }
);

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on some site',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLString,
      description: 'The title of the video',
    },
    duration: {
      type:GraphQLInt,
      description: 'The duration of the video (in seconds)',
    },
    released: {
      type: GraphQLBoolean,
      description: 'Whether or not the video has been released',
    },
  },
  interfaces: [nodeInterface],
});

export {
  videoType,
  nodeField,
};
