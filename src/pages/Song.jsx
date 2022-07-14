import React, { useState } from 'react';
import Table from '../components/Table/Table';
import { useQuery, useMutation } from 'react-query';
import * as api from '../api/index';
import { isError } from 'react-query/es/core/utils';
// import ReactLoading from 'react-loading';
import Loading from '../components/loading/Loading';
import Header from '../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../components/Search/Search';
import Login from '../components/Login/Login';
import { useTranslation } from 'react-i18next';
import PopUp from '../components/PopUp/PopUp';
import SongForm from '../components/SongForm/SongForm';
import { useDispatch } from 'react-redux';
import { setSnackbar } from './../redux/ducks/snackbar';
import { set } from 'date-fns';

export const Song = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const textDisplayPopup = t('createsong.header');
  const [openPopup, setOpenPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getSong = async () => {
    const data = await api.getSong();
    return data.object;
  };

  const deleteSong = async (id) => {
    return await api.deleteSong(id);
  };
  const mutation = useMutation((id) => deleteSong(id));

  const { isLoading, isError, data, error } = useQuery('songs', getSong);

  // if (data) {
  //   console.log(data);
  // }
  const hData = [t('No.'), t('Name'), t('Genre'), t('Action')];

  const handleViewDetails = (item) => {
    console.log('item is', item);
    navigate(`/song/${item.id}`);
  };

  const handleDelete = async (index) => {
    const id = data[index].id;

    mutation.mutate(id);

    // if (mutation.isSuccess) {
    //   dispatch(setSnackbar(true, 'success', 'Deleted successfully'));
    //   getSong();
    // } else {
    //   dispatch(setSnackbar(true, 'error', 'Something went wrong'));
    // }
    // const status = await api.deleteSong(id);
    // if (status == 200) {
    //   dispatch(setSnackbar(true, 'success', 'Deleted successfully'));
    //   getSong();
    // } else {
    //   dispatch(setSnackbar(true, 'error', 'Something went wrong'));
    // }
  };

  const handleInfo = async (values, resetForm, songData) => {
    // let data = new FormData()
    let formatData = new FormData();
    formatData.append('src', values.src);
    formatData.append('name', values.songName);
    formatData.append('author', values.author_id);
    formatData.append('genre', values.genre_id);
    formatData.append('thumbnail', values.thumbnail);

    const status = await api.uploadSong(formatData);
    console.log('status is', status);
    if (status != 200) {
      dispatch(setSnackbar(true, 'error', 'There is something wrong!'));
    } else {
      dispatch(setSnackbar(true, 'success', 'Add song successfully!'));
      resetForm();
    }
  };
  return (
    <>
      {/* <h1>{data ? data : 'Hello'}</h1> */}

      {
        <>
          <Header setOpenPopup={setOpenPopup} />
          <Search />{' '}
          {isLoading || mutation.isLoading ? (
            <Loading />
          ) : (
            <>
              {mutation.isSuccess
                ? dispatch(
                    setSnackbar(true, 'success', 'Add song successfully!'),
                  )
                : null}
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
            </>
          )}
          <PopUp
            title={textDisplayPopup}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <SongForm handleInfo={handleInfo} />
          </PopUp>
        </>
      }
    </>
  );
};
