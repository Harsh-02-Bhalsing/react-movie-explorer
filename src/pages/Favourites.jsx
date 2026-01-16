import '../css/Favourites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'
function Favourites(){
    const {favorites} = useMovieContext()

    if (favorites){
        return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            <div className="movies-grid">
                {   
                    favorites.map(
                        (movie)=>
                        (
                        <MovieCard movie={movie} key={movie.id}/>
                        )                    
                    )
                }
            </div>
        </div>
        );
    }
    else{
        return(
            <div className="favorites-empty ">
                <h2>No Favorites Yet</h2>
                <p>start adding movies to favorites list</p>
            </div>
        )
    }
}
export default Favourites