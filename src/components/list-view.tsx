import React from 'react';
import { MoviesItem } from '../types/api';

interface ListViewProps {
  data: MoviesItem[];
}

export class ListView extends React.Component<ListViewProps> {
  render() {
    const { data } = this.props;

    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    );
  }
}
