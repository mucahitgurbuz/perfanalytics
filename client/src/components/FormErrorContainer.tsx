import { Alert } from 'antd';
import React from 'react';
import { CustomError } from '../types';

export interface ErrorContainerProps {
  error: CustomError | null,
  style?: object | null,
}

const ErrorContainer: React.SFC<ErrorContainerProps> = ({ error, style, ...rest }) => {
  if (!error) { return null; }

  const alertStyle = Object.assign(
    {
      marginBottom: 20,
    },
    style || {}
  );

  if (error.details && error.details.length) {
    return (
      <Alert
        {...rest}
        style={alertStyle}
        type="error"
        message={error.type}
        description={error.details.map(errorDetail => (
          <div key={errorDetail.message}>{errorDetail.message}</div>
        ))}
        showIcon={true}
      />
    );
  }

  return <Alert {...rest} style={alertStyle} type="error" message={error.type} showIcon={true} />;
};


export default ErrorContainer;
