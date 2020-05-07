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
        taggedUsers: [User]
        # TODO: make a location type
        location: String
        # TODO: make image type
        images: [String]
    }

    type Query {
        posts: [Post]
        games: [Game]
        searchGames(query: String): [Game]
        searchUsers(query: String): [User]
    }

    # TODO: for the input here, i think having only IDs given will make this process really slow since we have to do a DB lookup on each one -
    # I should look into how I can mitigate that, basically search for how to do an insert with a few linked objects (keeping in mind these are just Foreign Keys in the DB)
    # In theory you could just add the Ids here, but I need to validate that they're real, and that's where this gets complicated, I think.
    # Also worth noting that I could do a slightly shittier version and then worry about performance when I have a DB setup, and we have a better idea of how long this will take in a real world situation
    input CreatePostInput {
        authorId: ID!
        gameId: ID!
        caption: String!
        taggedUsers: [ID]
        location: String
        images: [String]
    }
    type CreatePostPayload {
        post: Post!
    }

    type Mutation {
        createPost(postInfo: CreatePostInput): CreatePostPayload
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
        profilePictureURL:
            "https://avatars0.githubusercontent.com/u/8910031?s=400&u=10b0121598ef09b8d6beeb897835bd940d0c2a4d&v=4",
    },
    {
        id: "2",
        username: "nikki",
        bio: "number 1 tabltop supporter",
    },
    {
        id: "3",
        username: "kochan",
        bio: "@adam",
    },
    {
        id: "4",
        username: "MopMan",
        bio: "slugma",
    },
];

const Posts = [
    {
        id: "1",
        author: Users[0],
        game: Games[0],
        caption: "A test post!",
        location: "My House",
        taggedUsers: [],
    },
    {
        id: "2",
        author: Users[0],
        game: Games[0],
        caption: "Yet another great game of Wingspan",
        location: "My House",
        taggedUsers: [],
    },
];

interface CreatePostInput {
    authorId: string;
    gameId: string;
    caption: string;
    taggedUsers: string[];
    location: string;
    images: string[];
}

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
        searchUsers: (_: any, args: { query: string }) => {
            return Users.filter((user) =>
                user.username.toLowerCase().includes(args.query.toLowerCase())
            );
        },
    },
    Mutation: {
        createPost: (_: any, args: { postInfo: CreatePostInput }) => {
            const { postInfo } = args;
            const lastPost = Posts[Posts.length - 1];
            const newPost = {
                id: (parseInt(lastPost.id) + 1).toString(),
                author: Users.find((user) => user.id === postInfo.authorId),
                caption: postInfo.caption,
                game: Games.find((game) => game.id === postInfo.gameId),
                location: postInfo.location,
                taggedUsers: postInfo.taggedUsers,
            };
            Posts.push(newPost);
            return { post: newPost };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
