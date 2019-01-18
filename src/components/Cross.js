import React from 'react';

export default () => (
  <svg className="weapon" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <path style={{ animation: '2s ease-out forwards draw' }} d="M20 130 130 20" stroke="red" />
    <path style={{ animation: '2s ease-out 1s forwards draw' }} d="M20 20 130 130" stroke="red" />
  </svg>
);