import * as React from 'react';
import './gameTitle.scss';

export const GameTitle = (props: any) => {

  return (
      <h2>{props.children}</h2>
  )
}