import * as React from 'react';
import './bigButton.scss';

export const BigButton = (props: any) => {

  return (
      <a className="big-button">{props.children}</a>
  )
}