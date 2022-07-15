import React, { useState, useEffect } from 'react';
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
  const [songData, setSongData] = useState(null);

  const deleteSong = async (id) => {
    return await api.deleteSong(id);
  };
  const mutation = useMutation((id) => deleteSong(id), {
    onSuccess: async () => {
      dispatch(setSnackbar(true, 'success', 'Deleted successfully'));
      let fetchData = await getSong();
      setSongData(fetchData);
    },
  });

  const { isLoading, isError, data, error } = useQuery('songs', getSong);

  useEffect(() => {
    setSongData(data);
  }, [data]);

  const hData = [t('No.'), t('Name'), t('Genre'), t('Action')];

  const handleViewDetails = (item) => {
    console.log('item is', item);
    navigate(`/song/${item.id}`);
  };

  useEffect(() => {
    console.log('song data is', songData);
  }, [songData]);

  const handleDelete = async (index) => {
    const id = data[index].id;

    mutation.mutate(id);
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
      let updatedData = await getSong();
      setSongData(updatedData);
      resetForm();
    }
  };
  return (
    <>
      {
        <>
          <Header setOpenPopup={setOpenPopup} />
          <Search />{' '}
          {isLoading || mutation.isLoading ? (
            <Loading />
          ) : (
            <>
              {songData && (
                <Table
                  headData={hData}
                  bodyData={songData ? songData : []}
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
