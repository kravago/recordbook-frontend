import React, {useEffect, useState} from 'react';
// import SearchForm from './SearchForm';
import RBApi from '../../api';
import AnimeCard from './AnimeCard';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {

    console.log("get animes has run");
    
    getAnimes();
  }, []);

  const getAnimes = async () => {
    const req = await RBApi.getTopAnimes();
    setAnimes(req);
  }

//   const updateCompanies = (filteredCompanies) => {
//     setCompanies([...filteredCompanies]);
//   }

  return (
    <>
      {/* <SearchForm updateCompanies={updateCompanies}/> */}
      <div>
        {animes.map(anime => (
          <div>
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </>
  )
}

export default AnimeList;