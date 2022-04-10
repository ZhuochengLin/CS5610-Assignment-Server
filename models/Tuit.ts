export default interface Tuit {
    tuit: string;
    postedBy: {
        username: string;
    };
    stats: {
        retuits: number;
        likes: number;
        dislikes: number;
        replies: number;
    }
}