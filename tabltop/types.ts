export interface User {
    id: string;
    username: string;
    profilePictureURL: string
    bio: string
}

export interface Game {
    id: string;
    name: string;
    publisher: string
    yearPublished: number
    thumbnailURL: string
    minPlayers: number
    maxPlayers: number
    categories: string[]
}

export interface Post {
    id: string
    author: User
    game: Game
    caption: string
    taggedFriends: User[]
    location: string
    images: string[]
}