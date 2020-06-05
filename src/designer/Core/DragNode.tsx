import React from 'react';
import { ISchema } from './Schemas/ISchema';

export class DragNode extends React.Component {

  constructor(props: Readonly<{schema:ISchema}>) {
    super(props);
    this.state = { schema:props.schema };

  }

  render() {
    return <h1>Hello</h1>;
  }
}