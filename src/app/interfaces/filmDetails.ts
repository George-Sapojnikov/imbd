export interface FilmDetails {
    Title: string;
    Year: string;
    Poster: string;
    Released: string;
    Runtime: string;
    Actors: string;
    Language: string;
    Country: string;
    Plot: string;
    Ratings?: { Value: string }[];
}