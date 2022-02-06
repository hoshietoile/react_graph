import React from 'react'
import UserEdit from './../organisms/UserEdit/UserEdit';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({ }) => {
  return (
    <UserEdit />
  );
}