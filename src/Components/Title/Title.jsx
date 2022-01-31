import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
