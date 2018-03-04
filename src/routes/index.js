import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Login,
  Register,
  SinglePoll,
  Polls,
  CreatePoll
} from '../Views';

const LOGIN = "/login"; 

export default [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={LOGIN} />,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/poll/:id',
    component: SinglePoll,
  },
  {
    path: '/polls',
    component: Polls,
  },
  {
    path: '/create_poll',
    component: CreatePoll,
  },
];
