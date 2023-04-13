import React, {useEffect, useState} from 'react';
// import SearchForm from './SearchForm';
import RBApi from '../../api';
import AnimeCard from './AnimeCard';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const getAnimes = async () => {
      const req = await RBApi.getTopAnimes();
      setAnimes(req);
    }
    getAnimes();
  }, []);

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