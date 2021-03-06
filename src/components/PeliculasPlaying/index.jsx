import React, { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPeliculasPlayingAllActions } from '../../actions/obtenerPeliculasPlayingAllActions';
import Spinner from '../Spinner';
import Render from '../Peliculas';
import Pagination from '../Peliculas/Pagination';

const Peliculas = () => {
    // Mandar llamar a la acción principal para retornar los peliculas
    //state locales
    const [currentPage, setCurrentPage] = useState(1);
    const [peliculasPerPage] = useState(12);
    const dispatch = useDispatch();
    useEffect(
        () => {
            //peliculas cuando el componente este listo
            const cargarpeliculas = () => dispatch(obtenerPeliculasPlayingAllActions());
            cargarpeliculas();
            
        }, [dispatch]
    );

    //Acceder al state
    const loading = useSelector(state => state.peliculasPlayingReducer.loading);
    const error = useSelector(state => state.peliculasPlayingReducer.error);
    const peliculasPlaying = useSelector(state => state.peliculasPlayingReducer.peliculasAll);
    //console.log(peliculas);
    // Get current movies
    const indexOfLastPelicula = currentPage * peliculasPerPage;
    const indexOfFirstPelicula = indexOfLastPelicula - peliculasPerPage;
    const currentPeliculas = peliculasPlaying && peliculasPlaying.slice(indexOfFirstPelicula, indexOfLastPelicula);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const componente = (loading) ? <Spinner></Spinner> : null;
    return (
        <React.Fragment>
            {error
                ? <div className="font-weight-bold alert alert-danger text-center mt-4">
                    Hubo un error..
            </div> : null}
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <h3>Now Playing Movies</h3>
                        <Render peliculas={currentPeliculas} ></Render>
                        <Pagination
                            peliculasPerPage={peliculasPerPage}
                            totalPeliculas={peliculasPlaying.length}
                            paginate={paginate}
                            page={'/moviesplay'}
                        />
                    </div>
                </div>
            </div>
            {componente}
        </React.Fragment>
    );
};

export default Peliculas;