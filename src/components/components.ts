import {IMovie} from "../interfaces/interfaces";

export function getInnerHTML(movie :IMovie,favourite:number[],heartClass?:string){
    return `
                            <div class="card shadow-sm">
                                <img
                                    src="https://image.tmdb.org/t/p/original//${movie.poster_path}"
                                />
                 
                            <svg
                                    style="cursor:pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id='${movie.id}'
                                    stroke="red"
                                    fill="red"
                                    fill-opacity=${favourite.includes(Number(movie.id))?"1.0":"0.4"}
                                    width="50"
                                    height="50"
                                    class="bi bi-heart-fill position-absolute p-2 ${heartClass?heartClass:''}"
                                    viewBox="0 -2 18 22"
                            >
                                <path
                                        fill-rule="evenodd"
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                        
                                <div class="card-body">
                                    <p class="card-text truncate">
                                        ${movie.overview}
                                    </p>
                                    <div
                                        class="
                                            d-flex
                                            justify-content-between
                                            align-items-center
                                        "
                                    >
                                        <small class="text-muted">${movie.release_date}</small>
                                    </div>
                                </div>
                            </div>
        `;
}
export function randomMovieRender(movies:IMovie[]):void{
    const randomMovieContainer = document.querySelector("#random-movie") as HTMLElement;
    const randomMoviePosition = Math.round(Math.random() * movies.length);
    const randomMovie:IMovie = movies[randomMoviePosition];
    if(randomMovieContainer){
        randomMovieContainer.style.backgroundImage = (randomMovie.backdrop_path)?`url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`:"white";
        randomMovieContainer.style.backgroundSize = `cover`;
        randomMovieContainer.style.backgroundPosition = `center`;
        randomMovieContainer.innerHTML =  `
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto" style="background: #2525254f" >
                <h1 id="random-movie-name" class="fw-light text-light">${randomMovie.title}</h1>
                <p id="random-movie-description" class="lead text-white">${randomMovie.overview}</p>
            </div>
        </div>`;
    }
}