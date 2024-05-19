import {IMovie} from "../interfaces/interfaces";

export const customMap = function (array: any[]) :IMovie[]{
    const newArr = [];
    for(const el of array){
        const {id,poster_path,overview,release_date,backdrop_path,title} = el;
        newArr.push({id,poster_path,overview,release_date,backdrop_path,title});
    }
    return newArr;
}
export const customMapper = function (elem: any) :IMovie{
    const {id,poster_path,overview,release_date,backdrop_path,title} = elem;
    return  {id,poster_path,overview,release_date,backdrop_path,title};
}