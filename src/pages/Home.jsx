import MovieCard from "../components/MovieCard";

import '../css/Home.css'
import { searchMovies,getPopularMovies } from "../services/api";
import {useState,useEffect} from "react"
function Home(){
    const[searchQuery,setSearchQuery]=useState("");
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        const loadPopularMovies=async ()=>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies);
            }
            catch(err){
                console.log(err);
                setError("failed to load movies");
            }
            finally{
                setLoading(false);
            }
        }
        loadPopularMovies();
    },[])
    const handlesearch=async (e) => {
        e.preventDefault()
        
        if(!searchQuery.trim()) return 
        if(loading) return 

        try{
            const searchResults= await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch(err){
            console.log(err);
                setError("failed to load movies");
        }
        finally{
            setLoading(false);
        }

    };
    return(
        <div className="home">
            <form onSubmit={handlesearch} className="search-form">
                <input 
                type="text" 
                className="search-input" 
                placeholder="search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
               
                
                <button className="search-button" type="submit">submit</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading"> 
                    loading....
                </div>
            ):( 
                <div className="movies-grid">
                {   
                    movies.map(

                        (movie)=>
                        (
                        <MovieCard movie={movie} key={movie.id}/>
                        )
                    
                    )
                }
                </div>
             )
            }
            
        </div>
    );
} 
export default Home