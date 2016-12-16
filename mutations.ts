import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { videoType } from './types';
import { createVideo } from './api';

const videoMutation = mutationWithClientMutationId({
  name: 'AddVideo',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video (in seconds)',
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether or not the video is released',
    },
  }, 
  outputFields: {
    video: {
      type: videoType,
    }
  },
  mutateAndGetPayload: (args) => new Promise((accept, reject) => {
    Promise.resolve(createVideo(args))
      .then((video) => accept({ video }))
      .catch(reject);
  }),
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type.',
  fields: {
    createVideo: videoMutation,
  },
});

export {
  mutationType,
};