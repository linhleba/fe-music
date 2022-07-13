import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div
      style={{
        color: '#101010',
        width: '100wh',
        height: '100wh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <div className="loading-center">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Loading;
