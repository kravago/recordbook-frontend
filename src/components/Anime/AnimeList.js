import React, {useEffect, useState} from 'react';
// import SearchForm from './SearchForm';
import RBApi from '../../api';
import AnimeCard from './AnimeCard';

function AnimeList(animes) {


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