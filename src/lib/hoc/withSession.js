import React from 'react';

const withSession = (Component) => {
  const Page = (props) => {
    return (
      <>
        <Component {...props} />
      </>
    );
  };

  Page.displayName = Component.displayName;

  return Page;
};

export default withSession;
