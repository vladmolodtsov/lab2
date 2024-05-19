import {category} from "./types/types";
import * as constant from './constants/constants'
import {IMovie} from "./interfaces/interfaces";
import {customMap,customMapper} from "./mappers/mappers";
import {getInnerHTML,randomMovieRender} from "./components/components";
import {setLocalStorageFavouriteItems,getFavouriteItemsFromLocalStorage} from "./helpers/helpers";
import {getMovieUrl,getMovies,getFavMovies} from "./services/services";

let searchValue  = "";
let page = 1;
const popularUrl  = `https://api.themoviedb.org/3/movie/popular?api_key=332c3153ea601b9ab49d32afb2c19347&page=${page}`;
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=332c3153ea601b9ab49d32afb2c19347';
let currentCategory:category = "popular";
function getUrl (type: string , page: number) :string{
    return `https://api.themoviedb.org/3/movie/${type}?api_key=332c3153ea601b9ab49d32afb2c19347&page=${page}`
}

let currentMovies:IMovie[] = [];
let favourite:number[] =  getFavouriteItemsFromLocalStorage("favourite") || [];
let favouriteMovies:IMovie[] = [];


async function getFavouriteMoviesDetails(movieId:number[]){
    for(let i  = 0 ; i<movieId.length; i++){
        const movieUrl = getMovieUrl(favourite[i])
        const movie = await getFavMovies(movieUrl);
        favouriteMovies.push(movie);
    }
}

function outputMovie(movies:Array<IMovie>):void{
    if(constant.filmsContainer){
        constant.filmsContainer.innerHTML = movies.map(movie=>`<div class="col-lg-3 col-md-4 col-12 p-2">${getInnerHTML(movie,favourite,"heart-in-list")}</div>`).join("");
    }
}
function loadMovie(movies:Array<IMovie>):void{
    if(constant.filmsContainer){
        constant.filmsContainer.innerHTML += movies.map(movie=>`<div class="col-lg-3 col-md-4 col-12 p-2">${getInnerHTML(movie,favourite,"heart-in-list")}</div>`).join("");
    }
}
function outputFavouriteMovie(movies:Array<IMovie>):void{
    if(movies.length === 0)
    {
        if(constant.favouriteMoviesContainer){
            constant.favouriteMoviesContainer.innerHTML =`<div class="col-12 p-2"><p>No film was added to favourites</p></div>`;
        }
    }else{
        if(constant.favouriteMoviesContainer) {
            constant.favouriteMoviesContainer.innerHTML = movies.map(movie => `<div class="col-12 p-2">${getInnerHTML(movie, favourite, "heart-in-favourite-list")}</div>`).join("");
        }
        for(let i = 0; i < constant.heartFavouriteBtns.length;i++){
            constant.heartFavouriteBtns[i].addEventListener("click",async function(){
                const id = Number(constant.heartFavouriteBtns[i].id);
                favouriteMovies = favouriteMovies.filter(movie=>Number(movie.id) !== id);
                favourite = favourite.filter(movieId=>movieId !== id);
                setLocalStorageFavouriteItems("favourite",favourite);
                (constant.heartFavouriteBtns[i].parentElement as HTMLElement).style.display = "none";
                outputMovie(currentMovies);
                addHeartsEvent(constant.heartBtns);
            })
        }
    }
}

function addHeartsEvent(heartBtns:HTMLCollectionOf<HTMLElement>){
    for (let i = 0; i < heartBtns.length; i++) {
        heartBtns[i].addEventListener("click",async function(){
            const id = Number(heartBtns[i].id);
            if(favourite.includes(Number(heartBtns[i].id))){
                favourite = favourite.filter(elemId=>elemId !== id);
                favouriteMovies = favouriteMovies.filter(movie=>Number(movie.id) !==id);
                setLocalStorageFavouriteItems("favourite",favourite);
                heartBtns[i].setAttribute("fill-opacity","0.4");
            }else{
                favourite = [...favourite,id];
                setLocalStorageFavouriteItems("favourite",favourite);
                heartBtns[i].setAttribute("fill-opacity","1.0");
                if(constant.favouriteMoviesContainer){
                    const movieUrl = getMovieUrl(id)
                    const movie = await getFavMovies(movieUrl);
                    favouriteMovies.push(movie);
                }
            }
            outputFavouriteMovie(favouriteMovies);
        })
    }
}

export async function render(): Promise<void> {
    await getFavouriteMoviesDetails(favourite);
    outputFavouriteMovie(favouriteMovies)
    currentMovies = await getMovies(popularUrl);
    outputMovie(currentMovies);
    randomMovieRender(currentMovies);
    constant.radioBtns.forEach(radioBtn =>{
        radioBtn.addEventListener('change',async function(e){
            e.preventDefault();
            currentCategory = radioBtn.id as category;
            currentMovies = await getMovies(getUrl(currentCategory,page));
            outputMovie(currentMovies);
            addHeartsEvent(constant.heartBtns);
        })
    })
    constant.submitBtn.addEventListener('click', async function (e){
        e.preventDefault();
        searchValue = constant.search.value;
        if(searchValue){
           const movies: IMovie[] = await getMovies(searchUrl + '&query=' +searchValue);
           outputMovie(movies);
           addHeartsEvent(constant.heartBtns)
        }
    })
    constant.loadBtn.addEventListener('click', async function(e){
        e.preventDefault();
        if(!searchValue)
        {
            page++;
            const url = getUrl(currentCategory,page);
            const loadMovies = await getMovies(url);
            currentMovies = [...currentMovies, ...loadMovies];
            loadMovie(loadMovies);
            addHeartsEvent(constant.heartBtns);
        }else{
            page++;
            const loadMovies = await getMovies(searchUrl + '&query=' +searchValue +'&page='+page);
            currentMovies = [...currentMovies, ...loadMovies];
            loadMovie(loadMovies);
            addHeartsEvent(constant.heartBtns);
        }
    })


    addHeartsEvent(constant.heartBtns);
}
