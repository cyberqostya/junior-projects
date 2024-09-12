'use client';

import Search from '@com/Search/Search';
import styles from './style.module.scss';
import { useState, useRef } from 'react';
import AfterText from '@com/AfterText/AfterText';
import Images from '@com/Images/Images';
import detectLanguage from '@/helpers/detectLanguage';
import { url, PER_PAGE } from '@/helpers/variables';

export default function Content() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseStatus, setApiResponseStatus] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [displayedImages, setDisplayedImages] = useState([]);

  const [searchPhrase, setSearchPrase] = useState('');
  const typeSearchPhrase = (e) => { setSearchPrase(e.target.value) }
  const clearSearchPhrase = () => { setSearchPrase('') }

  const [page, setPage] = useState(1);

  const fetchURL = useRef('');

  const getImages = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setDisplayedImages([]);
    await new Promise((res) => { setTimeout(res, 700) });

    fetchURL.current = url + `&query=${encodeURI(searchPhrase)}&lang=${detectLanguage(searchPhrase)}&per_page=${PER_PAGE}`;

    fetch(fetchURL.current)
      .then((res) => {
        setApiResponseStatus(res.status);
        if (res.ok) return res.json();
      })
      .then(res => {
        // console.log(res);
        setApiResponse(res);
        setDisplayedImages(res.results);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
        setPage(1);
      })
  }

  const loadMoreImages = async () => {
    setIsLoading(true);
    await new Promise((res) => { setTimeout(res, 700) });

    fetch(fetchURL.current + `&page=${page + 1}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(res => {
        // console.log(res);
        setDisplayedImages([...displayedImages, ...res.results]);
        setPage(page + 1)
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <main className={styles.main}>

      <Search
        searchPhrase={searchPhrase}
        typeSearchPhrase={typeSearchPhrase}
        clearSearchPhrase={clearSearchPhrase}
        getImages={getImages}
        isLoading={isLoading}
        isFirstLoad={isFirstLoad}
      />

      {displayedImages.length > 0 &&
        <Images
          apiResponse={apiResponse}
          displayedImages={displayedImages}
          loadMoreImages={loadMoreImages}
          isLoading={isLoading}
        />}

      <AfterText
        apiResponse={apiResponse} isLoading={isLoading}
        apiResponseStatus={apiResponseStatus}
        isFirstLoad={isFirstLoad}
      />

    </main>
  )
}