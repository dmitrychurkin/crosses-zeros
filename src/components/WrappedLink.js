import React from 'react';
import { Link } from 'react-router-dom';

export default ({ navigateTo }) => props => <Link to={navigateTo} {...props} />;