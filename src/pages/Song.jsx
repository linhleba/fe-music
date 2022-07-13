import React, { useState } from 'react';
import Table from '../components/Table/Table';
import { useQuery } from 'react-query';
import * as api from '../api/index';
import { isError } from 'react-query/es/core/utils';
// import ReactLoading from 'react-loading';
import Loading from '../components/loading/Loading';
import Header from '../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../components/Search/Search';
import Login from '../components/Login/Login';
import { useTranslation } from 'react-i18next';

export const Song = () => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const getSong = async () => {
    const data = await api.getSong();
    console.log('data', data);
    return data.object;
  };

  const { isLoading, isError, data, error } = useQuery('songs', getSong);

  // if (data) {
  //   console.log(data);
  // }
  const hData = [t('No.'), t('Name'), t('Genre'), t('Action')];

  const handleViewDetails = (item) => {
    console.log('item is', item);
    navigate(`/song/${item.id}`);
  };

  const handleDelete = (index) => {};

  return (
    <>
      {/* <h1>{data ? data : 'Hello'}</h1> */}

      {
        <>
          <Header />
          <Search />{' '}
          {isLoading ? (
            <Loading />
          ) : (
            <Table
              headData={hData}
              bodyData={data ? data : []}
              ignoredData={[
                'author',
                'genre',
                'id',
                'src',
                'thumbnail',
                'updateAt',
              ]}
              specialData={['genre']}
              limit="5"
              handleViewDetails={(index) => handleViewDetails(index)}
              handleDelete={(index) => handleDelete(index)}
            />
          )}
        </>
      }
    </>
  );
};
