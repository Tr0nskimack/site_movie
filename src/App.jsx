import React, {useState, useEffect} from 'react'
import axios from 'axios'
import YouTube from 'react-youtube';


const App = () => {
  const API_URL="https://api.themoviedb.org/3/"
  const KEY="19ca1550a775dc7d02c3961aeedc1589"
  const IMAGE_PATH="https://image.tmdb.org/t/p/original"
  const IMAGE_URL="https://image.tmdb.org/t/p/original"

  //variables de estado

  const [movies, setMovies] = useState([])
  const [searchkey, setSearchkey] = useState("")
  const [trailer, setTrailer] = useState(null)
  const [movie, setMovie] = useState({title: "Cargando peliculas"})
  const [playing, setPlaying] = useState(false)


  //realizar la peticion get

  const fetchMovies = async(searchkey) => {
    const type = searchkey ? "search" : "discover"
    const {data : {results}, } = await axios.get(`${API_URL}/${type}/movie`, {
      params : {
        api_key : KEY,
        query: searchkey,
      }
    }) 
    setMovies(results)
    setMovie(results[0])
  }

  useEffect(() => {
    fetchMovies()
  }, [])
  

  return (
    /*contenedor que va a mostrar el poster de las peliculas actuales*/
    <div className="container mt-3">
      <div className="col">
        {
          movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img src={`${IMAGE_URL + movie.poster_path}`} height={600} width="100%" />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App