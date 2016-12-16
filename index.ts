import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { videoType } from './types';
import { queryType } from './queries';
import { mutationType } from './mutations';
import { getVideoById, getVideos, createVideo } from './api';

const PORT = process.env.PORT || 3000;
const server = express();

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
