import React, { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPeliculasAllActions } from '../../actions/obtenerPeliculasAllActions';
import Spinner from '../Spinner';
import Render from '../Peliculas';
import Pagination from '../Peliculas/Pagination';

const Peliculas = () => {
    // Mandar llamar a la acción principal para retornar los peliculas
    //state locales
    const [currentPage, setCurrentPage] = useState(1);
    const [peliculasPerPage] = useState(12);
    //cargar las peliculas del localstorage como state inicial
    let peliculasIniciales = JSON.parse(localStorage.getItem('peliculas'))

    if (!peliculasIniciales) {
        peliculasIniciales = []
    }
   const [peliculas, savePeliculas] = useState(peliculasIniciales)
    const dispatch = useDispatch();
    useEffect(
        () => {
            //peliculas cuando el componente este listo
            const cargarpeliculas = () => dispatch(obtenerPeliculasAllActions());
            cargarpeliculas();
            //ESTO ES PARA STORAGE
            let peliculasIniciales = JSON.parse(localStorage.getItem('peliculas'))

            if (peliculasIniciales) {
                localStorage.setItem('peliculas', JSON.stringify(peliculas))
            } else {
                localStorage.setItem('peliculas', JSON.stringify([]))
            }
        }, [dispatch,peliculas]
    );

    function crearInstancia(instancia) {
        //Tomar una copia del state y agregar el nuevo paciente
        const nuevasPeliculas = [...peliculas, instancia]
        //almacenar en el state
        savePeliculas(nuevasPeliculas)
        console.log(nuevasPeliculas);
    }

    //Acceder al state
    const loading = useSelector(state => state.peliculasAllReducer.loading);
    const error = useSelector(state => state.peliculasAllReducer.error);
    const peliculasPop = useSelector(state => state.peliculasAllReducer.peliculasAll);
    //console.log(peliculas);
    // Get current movies
    const indexOfLastPelicula = currentPage * peliculasPerPage;
    const indexOfFirstPelicula = indexOfLastPelicula - peliculasPerPage;
    const currentPeliculas = peliculasPop && peliculasPop.slice(indexOfFirstPelicula, indexOfLastPelicula);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const componente = (loading  ) ? <Spinner></Spinner> : null;
    return (
        <React.Fragment>
            {error
                ? <div className="font-weight-bold alert alert-danger text-center mt-4">
                    Hubo un error..
            </div> : null}
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <h3>Popular Movies</h3>
                        <Render peliculas={currentPeliculas} crearInstancia={crearInstancia}></Render>
                        <Pagination
                            peliculasPerPage={peliculasPerPage}
                            totalPeliculas={peliculasPop.length}
                            paginate={paginate}
                            page={'/moviespop'}
                        />
                    </div>
                </div>
            </div>
            {componente}
        </React.Fragment>
    );
};

export default Peliculas;