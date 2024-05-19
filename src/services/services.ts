import {customMap, customMapper} from "../mappers/mappers";

export function getMovieUrl(movieId:number){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=332c3153ea601b9ab49d32afb2c19347`
}
export async function getMovies(URL:string){
    return await fetch(URL)
        .then(element=>element.json())
        .then(data => customMap(data.results));
}
export async function getFavMovies(URL:string){
    return await fetch(URL)
        .then(element => element.json())
        .then(data => {
            return customMapper(data);
        });
}