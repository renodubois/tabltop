import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    scalar Timestamp

    type User {
        id: ID!
        username: String!
        profilePictureURL: String
        bio: String
        followers: [User]
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
        averageRating: String
    }

    type Post {
        id: ID!
        author: User!
        game: Game!
        caption: String
        rating: String
        date: String
        taggedUsers: [User]
        # TODO: make a location type
        location: String
        # TODO: make image type
        images: [String]
    }

    type List {
        id: ID!
        userIDs: [String]
        name: String
        editable: Boolean
        public: Boolean
        contents: [Game]
    }

    type Query {
        posts: [Post]
        postsByUser(userID: String): [Post]
        postsByGame(gameID: String): [Post]
        games: [Game]
        gameByID(gameID: String): Game
        listsForUser(userID: String): [List]
        user(userID: String): User
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
        rating: String!
        date: String!
        taggedUsers: [ID]
        location: String
        images: [String]
    }
    type CreatePostPayload {
        post: Post!
    }

    input EditProfileInput {
        userId: ID!
        bio: String
        photo: String
    }
    type EditProfilePayload {
        user: User!
    }

    input ListEditInput {
        listId: ID!
        gameId: ID!
    }
    type ListEditPayload {
        list: List
    }

    type Mutation {
        createPost(postInfo: CreatePostInput): CreatePostPayload
        editProfile(profileInfo: EditProfileInput): EditProfilePayload
        addGameToList(listEditInfo: ListEditInput): ListEditPayload
        removeGameFromList(listEditInfo: ListEditInput): ListEditPayload
    }
`;
// SAMPLE DATA
interface Game {
    id: string;
    name: string;
    publisher: string;
    yearPublished: number;
    thumbnailURL: string;
    minPlayers: number;
    maxPlayers: number;
    categories: string[];
}
const Games: Game[] = [
    {
        id: "174430",
        name: "Gloomhaven",
        publisher: "Cephalofair Games",
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/e7GyV4PaNtwmalU-EQAGecwoBSI=/fit-in/200x150/pic2437871.jpg",
        categories: ["Cooperative", "Legacy Game"],
        minPlayers: 1,
        maxPlayers: 4,
        yearPublished: 2017,
    },
    {
        id: "162886",
        name: "Spirit Island",
        publisher: "Greater Than Games",
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/t9mRnhW6swyL2nPSScv9iroCyZQ=/fit-in/200x150/pic3615739.png",
        categories: ["Cooperative", "Territory Building"],
        minPlayers: 1,
        maxPlayers: 4,
        yearPublished: 2017,
    },
    {
        id: "224517",
        name: "Brass: Birmingham",
        publisher: "Roxly",
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/t9mRnhW6swyL2nPSScv9iroCyZQ=/fit-in/200x150/pic3615739.png",
        categories: ["Economic", "Hand Management"],
        minPlayers: 2,
        maxPlayers: 4,
        yearPublished: 2018,
    },
    {
        id: "167791",
        name: "Terraforming Mars",
        publisher: "FryxGames",
        thumbnailURL:
            "https://cf.geekdo-images.com/thumb/img/yFqQ569DfL8NSTGTUw0vF9SCR7k=/fit-in/200x150/pic3536616.jpg",
        categories: ["Economic", "Territory Building"],
        minPlayers: 1,
        maxPlayers: 5,
        yearPublished: 2016,
    },
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

interface Rating {
    rawTotalScore: number;
    numRatings: number;
    averageRating: number;
}
const Ratings: { [gameID: string]: Rating } = {
    "266192": {
        rawTotalScore: 0,
        numRatings: 0,
        averageRating: 0,
    },
};

interface User {
    id: string;
    username: string;
    bio: string;
    profilePictureURL: string;
}
const Users: User[] = [
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
        profilePictureURL: "https://www.placecage.com/100/100",
    },
    {
        id: "3",
        username: "kochan",
        bio: "@adam",
        profilePictureURL: "https://www.placecage.com/g/100/100",
    },
    {
        id: "4",
        username: "MopMan",
        bio: "slugma",
        profilePictureURL: "https://www.fillmurray.com/100/100",
    },
];

const Followage = [
    ["1", "2"],
    ["2", "1"],
    ["3", "1"],
    ["4", "1"],
    ["1", "3"],
    ["1", "4"],
];
interface Post {
    id: string;
    author: User;
    caption: string;
    game: Game;
    date: string;
    rating: string;
    location: string;
    taggedUsers: User[];
}
const Posts: Post[] = [];
interface List {
    id: string;
    userIDs: string[];
    name: string;
    editable: boolean;
    public: boolean;
    contents: Game[];
}
const Lists: List[] = [
    {
        id: "1",
        userIDs: ["1"],
        editable: false,
        name: "Want To Play",
        public: true,
        contents: [Games[0], Games[1]],
    },
];

interface CreatePostInput {
    authorId: string;
    gameId: string;
    caption: string;
    rating: string;
    date: string;
    taggedUsers: string[];
    location: string;
    images: string[];
}

interface EditProfileInput {
    userId: string;
    bio: string;
    photo: string;
}

interface ListEditInput {
    listId: string;
    gameId: string;
}

const formatGame = (game: any) => {
    game.averageRating = 0;
    if (game.id in Ratings) {
        game.averageRating = Ratings[game.id].averageRating.toString();
    }
    return game;
};

const getUserByID = (userID: string) => {
    return Users.find((user) => user.id === userID);
};

const computeFollowers = (userID: string): any[] => {
    const returnValue = [];
    Followage.forEach((followData: string[]) => {
        if (followData[1] === userID) {
            const follower = getUserByID(followData[0]);
            if (!follower) {
                console.error("User not found");
            }
            returnValue.push(follower);
        }
    });
    return returnValue;
};

// ACTUAL SERVER CODE
const resolvers = {
    Query: {
        posts: () =>
            [...Posts].sort((a, b) => parseInt(b.date) - parseInt(a.date)),
        postsByUser: (_: any, args: { userID: string }) =>
            Posts.filter((post) => {
                if (post.author.id === args.userID) {
                    return true;
                }
                if (
                    post.taggedUsers.findIndex(
                        (user) => user.id === args.userID
                    ) >= 0
                ) {
                    return true;
                }
                return false;
            }).sort((a, b) => parseInt(b.date) - parseInt(a.date)),
        postsByGame: (_: any, args: { gameID: string }) =>
            Posts.filter((post) => {
                if (post.game.id === args.gameID) {
                    return true;
                }
                return false;
            }).sort((a, b) => parseInt(b.date) - parseInt(a.date)),
        games: () => {
            const returnData: any[] = [];
            Games.forEach((game) => {
                returnData.push(formatGame(game));
            });
            return returnData;
        },
        gameByID: (_: any, args: { gameID: string }) => {
            const game = Games.find((game) => game.id === args.gameID);
            return game ? formatGame(game) : null;
        },
        user: (_: any, args: { userID: string }) => {
            const user = Users.find((user) => user.id === args.userID);
            if (!user) {
                return null;
            }
            // Compute follwers
            // TODO: Actually type the server file
            // @ts-ignore
            user.followers = computeFollowers(user.id);
            return user;
        },
        searchGames: (_: any, args: { query: string }) => {
            return Games.filter((game) =>
                game.name.toLowerCase().includes(args.query.toLowerCase())
            );
        },
        searchUsers: (_: any, args: { query: string }) => {
            return Users.filter(
                (user) =>
                    // Replace my username with the currently logged in user @tasksforauth
                    user.username !== "reno" &&
                    user.username
                        .toLowerCase()
                        .includes(args.query.toLowerCase())
            );
        },
        listsForUser: (_: any, args: { userID: string }) => {
            return Lists.filter((list) => list.userIDs.includes(args.userID));
        },
    },
    Mutation: {
        createPost: (_: any, args: { postInfo: CreatePostInput }) => {
            const { postInfo } = args;
            const lastPost = Posts[Posts.length - 1];
            // Update ratings
            let currentRating: Rating;
            if (postInfo.gameId in Ratings) {
                currentRating = Ratings[postInfo.gameId];
            } else {
                currentRating = {
                    averageRating: 0,
                    rawTotalScore: 0,
                    numRatings: 0,
                };
            }
            currentRating.numRatings++;
            currentRating.rawTotalScore += parseFloat(postInfo.rating);
            currentRating.averageRating =
                currentRating.rawTotalScore / currentRating.numRatings;
            Ratings[postInfo.gameId] = currentRating;

            const game = Games.find((game) => game.id === postInfo.gameId);
            if (!game) {
                console.error("Couldn't find a game");
            }

            const newPost = {
                id: lastPost ? (parseInt(lastPost.id) + 1).toString() : "1",
                author: Users.find((user) => user.id === postInfo.authorId),
                caption: postInfo.caption,
                game: formatGame(game),
                date: postInfo.date,
                rating: postInfo.rating,
                location: postInfo.location,
                taggedUsers: postInfo.taggedUsers.map((id) =>
                    Users.find((user) => user.id === id)
                ),
            };

            Posts.push(newPost);
            return { post: newPost };
        },
        editProfile: (_: any, args: { profileInfo: EditProfileInput }) => {
            const { profileInfo } = args;
            const indexOfUser = Users.findIndex(
                (user) => user.id === profileInfo.userId
            );
            if (indexOfUser >= 0) {
                // Make edits to user
                Users[indexOfUser].bio = profileInfo.bio;
                Users[indexOfUser].profilePictureURL = profileInfo.photo;

                return { user: Users[indexOfUser] };
            }
            console.error("DIDN'T FIND USER w/ USERID ", profileInfo.userId);
        },
        addGameToList: (_: any, args: { listEditInfo: ListEditInput }) => {
            const { listId, gameId } = args.listEditInfo;
            const targetList = Lists.find((list) => list.id === listId);
            if (!targetList) {
                console.error("List ID wasn't valid");
                return false;
            }
            const targetGame = Games.find((game) => game.id === gameId);
            if (!targetGame) {
                console.error("Game ID wasn't valid");
                return false;
                // return { list: targetList };
            }

            targetList.contents.push(targetGame);
            return { list: targetList };
        },
        removeGameFromList: (_: any, args: { listEditInfo: ListEditInput }) => {
            const { listId, gameId } = args.listEditInfo;
            const targetList = Lists.find((list) => list.id === listId);
            if (!targetList) {
                console.error("List ID wasn't valid");
                return false;
            }
            const targetIndex = targetList.contents.findIndex(
                (game) => game.id === gameId
            );
            if (targetIndex < 0) {
                return { list: targetList };
            }
            targetList.contents.splice(targetIndex);
            return { list: targetList };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers, debug: true });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
