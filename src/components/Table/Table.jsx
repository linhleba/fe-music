import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { disableDelete } from '../../redux/ducks/disableDelete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InfoIcon from '@mui/icons-material/Info';
// import { EmployeeContext } from '../../pages/Employee';
import moment from 'moment';

const Table = ({
  headData,
  bodyData,
  isCheckedBox = true,
  ignoredData = [],
  specialData = [],
  limit = 5,
  isDetail = true,
  isDelete = true,
  handleDelete,
  handleViewDetails,
}) => {
  //   const setOpenPopup = useContext(EmployeeContext);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const keywordSearch = useSelector((state) => state.searching.keyword);
  const [slicedData, setslicedData] = useState(
    limit && bodyData ? bodyData.slice(0, limit) : bodyData,
  );
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [searchColumns, setSearchColumns] = useState(['name']);

  const [formatData, setFormatData] = useState(bodyData);
  const [range, setRange] = useState(1);
  const isFetch = useSelector((state) => state.fetchApi?.fetchEmployee);

  //   const checkedBox = useRef();

  useEffect(() => {
    setIsCheck([]);
  }, [isFetch]);

  useEffect(() => {
    // console.log(isCheck);
    if (isCheck.length == 0) {
      dispatch(disableDelete(true));
    } else {
      const data = formatData.filter((item, index) => isCheck.includes(index));
      dispatch(disableDelete(false, data));
    }
  }, [isCheck]);

  useEffect(() => {
    setFormatData(bodyData);
    setslicedData(formatData.slice(0, limit));

    formatData
      ? setRange([...Array(Math.ceil(formatData.length / limit)).keys()])
      : setRange(1);
  }, [bodyData]);

  useEffect(() => {
    const result = bodyData.filter((row) =>
      searchColumns.some((column) => {
        return (
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(keywordSearch.toLowerCase()) > -1
        );
      }),
    );
    setFormatData(result);
    setcurrentPage(0);
  }, [keywordSearch]);

  useEffect(() => {
    setslicedData(formatData.slice(0, limit));
    formatData
      ? setRange([...Array(Math.ceil(formatData.length / limit)).keys()])
      : setRange(1);
  }, [formatData]);

  const [currentPage, setcurrentPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);
    setslicedData(formatData.slice(start, end));
    setcurrentPage(page);
  };

  const handleAllCheckboxes = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(formatData.map((data, index) => index));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleCheckBox = (e) => {
    const { id, checked } = e.target;
    setIsCheck((state) => [...state, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
    }
  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          key="thead"
        >
          <tr>
            {isCheckedBox ? (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    checked={isCheckAll}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      handleAllCheckboxes(e);
                    }}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            ) : null}

            {headData &&
              headData.map((data, index) => {
                return (
                  <th scope="col" className="px-6 py-3" key={index}>
                    {data}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody key="tbody">
          {slicedData &&
            slicedData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {isCheckedBox ? (
                    <td className="w-4 p-4" key={index}>
                      <div className="flex items-center">
                        <input
                          checked={isCheck.includes(
                            index + currentPage * limit,
                          )}
                          onChange={handleCheckBox}
                          id={index + currentPage * limit}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                  ) : null}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>

                  {Object.entries(item).map((value, index) => {
                    if (specialData.includes(value[0])) {
                      if (value[0] === 'date') {
                        return (
                          <td
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            key={index}
                          >
                            {value[1].split('T')[0]}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            key={index}
                          >
                            {value[1].name}
                          </td>
                        );
                      }
                    } else if (!ignoredData.includes(value[0])) {
                      return (
                        <td
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          key={index}
                        >
                          {value[1]}
                        </td>
                      );
                    }
                  })}
                  {/* <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {item.fullName}
                </td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.team}</td> */}

                  <td className="px-6 py-4">
                    {isDetail ? (
                      <InfoIcon
                        className="icon"
                        onClick={() => handleViewDetails(slicedData[index])}
                      />
                    ) : (
                      ''
                    )}

                    {isDelete ? (
                      <DeleteRoundedIcon
                        className="icon"
                        onClick={() =>
                          handleDelete(index + currentPage * limit)
                        }
                      />
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        color="primary"
        count={range.length}
        size="large"
        page={currentPage + 1}
        onChange={(event, page) => selectPage(page - 1)}
      />
    </>
  );
};
export default Table;
