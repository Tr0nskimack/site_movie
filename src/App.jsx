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
    if(results.length) {
      await fetchmovie(results[0].id)
    }
  }

  //funcion para la reproduccion de video si se selecciona una pelicula

  const fetchmovie = async(id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: KEY,
        append_to_respond: "videos"
      }
    })

    //estan sentecia de abajo es para no tener resultados con error al momento de realizar la busqueda
    if(data.videos && data.videos.results) {
      const trailer = daa.video.results(find(
        (vid) = vid.name === "Official Trailer"
      ))
      setTrailer(trailer ? trailer : data.videos.results[0]) 
    }
    setMovie(data)
  }
  const selectMovie = async(movie) =>{
    fetchmovie(movie.id)
    setMovie(movie)
    window.scrollTo(0,0)
  }


  //implementando la funcion buscar 
  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchkey)


  }

  useEffect(() => {
    fetchMovies()
  }, [])
  

  return (
    
    /*contenedor que va a mostrar el poster de las peliculas actuales*/
    <>
      <div>
        <main>
          {movie ? (
            <div className='viewtrailer' style={{backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,}}>
                {playing ? (
                <>
                  <YouTube videoId={trailer.key} className="Reproductor container" containerClassName={"youtube-container"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        tv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() =>setPlaying(false)} className="boton">Cerrar</button>
                </>
            ): (
              <div className="container">
                <div className="">
                  {trailer ? (
                    <button className='boton' onClick={() =>setPlaying(true)} type="button">Play </button>
                  ) : (
                    <h5 className='text-white'>Disculpe, no existe este trailer</h5>
                  )}
                  <h1 className='text-white'>{movie.title}</h1>
                  <p className='text-white'>{movie.overview}</p>
                </div>
              </div>
            )}
            </div>
            ) : null}
          
        </main>
      </div>
    
      <div className="container mt-3">
        <h2 className='text-center mt-3 mb-5'>Trailers de Peliculas</h2>
        {/*Buscador*/}
          <div className="row ">
            <div className="col-md-4 d-flex">
              <form className='container mb-4 d-flex' onSubmit={searchMovies}>
                <input type="text" placeholder='Busqueda' className='form-control' onChange={(e)=>setSearchkey(e.target.value)} />
                <button className='btn btn-primary'>Buscar</button>
              </form>
            </div>
          </div>
      {/*aqui va todo el contenedor del banner y video*/}

        <div className="row">
          {
            movies.map((movie) => (
              <div key={movie.id} className="col-md-3 mb-3" onClick={() =>selectMovie()}>
                <img src={`${IMAGE_URL + movie.poster_path}`} height={450} width="100%" />
                <h4 className='text-center'>{movie.title}</h4>
              </div>
            ))
          }
        </div>

      </div>
    
    </>
  )
}

export default App