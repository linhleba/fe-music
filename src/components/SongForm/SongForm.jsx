import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm/useForm';
// import * as employeeService from '../../services/employeeService';
import { Autocomplete } from '@material-ui/lab';
import * as api from '../../api/index';
import moment from 'moment';
import Axios from 'axios';
// import * as ImageConfig from '../../constants/ImageConfig';
import { useTranslation } from 'react-i18next';
import Creatable, { useCreatable } from 'react-select/creatable';

const SongForm = ({ songData, handleInfo }) => {
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [src, setsrc] = useState();
  const [songThumbnail, setSongThumbnail] = useState();
  const { t } = useTranslation();
  const [isAddNewAuthor, setIsAddNewAuthor] = useState(false);
  const [isAddNewGenre, setIsAddNewGenre] = useState(false);

  async function getGenre() {
    const data = await api.getGenre();
    setGenre(data);
  }
  async function getAuthor() {
    const data = await api.getAuthor();
    setAuthor(data);
  }
  useEffect(() => {
    getGenre();
    getAuthor();
  }, []);

  //   useEffect(() => {
  //     console.log('genre is', genre);
  //   }, [genre]);
  let initialFValues;

  let currentDate = moment().format('MM-DD-YYYY');

  if (songData) {
    initialFValues = {
      songName: songData?.songName,
      genre_id: songData?.genreId,
      author_id: songData?.author_id,
      thumbnail: songData?.thumbnail,
    };
  } else {
    initialFValues = {
      songName: '',
      genre_id: '',
      author_id: '',
      thumbnail: '',
      newAuthor: '',
      newGenre: '',
    };
  }
  // setIsAddingForm(true);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('songName' in fieldValues)
      temp.songName = fieldValues.songName
        ? ''
        : 'The field shoud not be blank.';
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //   console.log('vao trong nay');
      handleInfo(values, resetForm, songData);
    }
  };

  const uploadAudio = (file) => {};

  const addAuthor = () => {};

  const addNewAuthor = async () => {
    let resp = await api.addAuthor({
      name: values.newAuthor,
    });
    getAuthor();
    setIsAddNewAuthor(false);
    setValues({
      ...values,
      ['author_id']: resp.id,
    });
  };

  const addNewGenre = async () => {
    let resp = await api.addGenre({
      name: values.newGenre,
    });
    console.log('resp is', resp);
    getGenre();
    setIsAddNewGenre(false);
    setValues({
      ...values,
      ['genre_id']: resp.id,
    });
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleAutoCompleteChange,
    handleCreatableInput,
    resetForm,
  } = useForm(initialFValues, true, validate);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="songName"
            label={t('name.popup')}
            value={values.songName}
            onChange={handleInputChange}
            error={errors.songName}
          />

          <div className="mt-2  ml-2">
            <p className="mb-0 me-2">{t('audio.popup')}</p>
            <input
              multiple={false}
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  setsrc(files[0]);
                  setValues({
                    ...values,
                    ['src']: files[0],
                  });
                } else {
                  setsrc(null);
                }
              }}
            ></input>
          </div>

          <div className="mt-2  ml-2">
            <p className="mb-0 me-2">{t('thumbnail.popup')}</p>
            <input
              multiple={false}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  console.log(files[0]);
                  setSongThumbnail(files[0]);
                  setValues({
                    ...values,
                    ['thumbnail']: files[0],
                  });
                } else {
                  setSongThumbnail(null);
                }
              }}
            ></input>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            {isAddNewGenre ? (
              <>
                <Controls.Input
                  name="newGenre"
                  label={t('genre.popup')}
                  value={values.newGenre}
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
                  type="text"
                  defaultValue={''}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  class="ml-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => addNewGenre()}
                >
                  {t('addBtn.popup')}
                </button>
                <p
                  className="ml-2 text-sm italic hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setIsAddNewGenre(false);
                  }}
                >
                  {t('existedGenre.popup')}
                </p>
                <br />
              </>
            ) : (
              <>
                <Controls.Select
                  name="genre_id"
                  label={t('genre.popup')}
                  value={values.genre_id}
                  onChange={handleInputChange}
                  error={errors.genre_id}
                  options={genre}
                />
                <p
                  className="ml-2 text-sm italic hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setIsAddNewGenre(true);
                  }}
                >
                  {t('addNewGenre.popup')}
                </p>
              </>
            )}

            {isAddNewAuthor ? (
              <>
                <Controls.Input
                  name="newAuthor"
                  label={t('author.popup')}
                  value={values.newAuthor}
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
                  type="text"
                  defaultValue={''}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  class="ml-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => addNewAuthor()}
                >
                  {t('addBtn.popup')}
                </button>
                <p
                  className="ml-2 text-sm italic hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setIsAddNewAuthor(false);
                  }}
                >
                  {t('existedAuthor.popup')}
                </p>
                <br />
              </>
            ) : (
              <>
                <Controls.Select
                  name="author_id"
                  label={t('author.popup')}
                  value={values.author_id}
                  onChange={handleInputChange}
                  error={errors.author_id}
                  options={author}
                />
                <p
                  className="ml-2 text-sm italic hover:underline hover:cursor-pointer"
                  onClick={() => {
                    setIsAddNewAuthor(true);
                  }}
                >
                  {t('addNewAuthor.popup')}
                </p>
              </>
            )}

            <Controls.Button
              type="submit"
              text={songData ? t('update.popup') : t('confirm.popup')}
            />
            <Controls.Button
              className="ml-2"
              text={t('reset.popup')}
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SongForm;
