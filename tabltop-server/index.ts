import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        profilePictureURL: String
        bio: String
        # TODO: add more things here when we figure them out
    }

    type Game {
        id: ID!
        name: String!
        publisher: String
        yearPublished: Int
        thumbnailURL: String
        minPlayers: Int
        maxPlayers: Int
        categories: [String!]
    }

    type Post {
        id: ID!
        author: User!
        game: Game!
        caption: String
        taggedFriends: [User]
        # TODO: make a location type
        location: String
        # TODO: make image type
        images: [String]
    }

    type Query {
        posts: [Post]
        games: [Game]
        searchGames(query: String): [Game]
    }
`;
// SAMPLE DATA
// TODO: add TS types for this
const Games = [
    {
        id: "266192",
        name: "Wingspan",
        publisher: "Stonemaier Games",
        yearPublished: 2019,
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/wvfZwwtcqpth4bgHnh4M-EhUCXg=/fit-in/200x150/pic4458123.jpg",
        minPlayers: 1,
        maxPlayers: 5,
        categories: ["Card Game", "Set Collection"],
    },
    {
        id: "169786",
        name: "Scythe",
        publisher: "Stonemaier Games",
        yearPublished: 2016,
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/ZpuWhZuKrFry__SY8CTRuQp35rk=/fit-in/200x150/pic3163924.jpg",
        minPlayers: 1,
        maxPlayers: 5,
        categories: ["Economic", "Territory Building"],
    },
];

const Users = [
    {
        id: "1",
        username: "reno",
        bio: "tabltop dev person",
    },
];

const Posts = [
    {
        id: "1",
        author: Users[0],
        game: Games[0],
        caption: "A test post!",
        location: "My House",
    },
    {
        id: "2",
        author: Users[0],
        game: Games[0],
        caption: "Yet another great game of Wingspan",
        location: "My House",
    },
];

// ACTUAL SERVER CODE
const resolvers = {
    Query: {
        posts: () => Posts,
        games: () => Games,
        searchGames: (_: any, args: { query: string }) => {
            return Games.filter((game) =>
                game.name.toLowerCase().includes(args.query.toLowerCase())
            );
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
