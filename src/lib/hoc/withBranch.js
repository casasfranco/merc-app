import React from 'react';
import { useFeatureFlags } from '../hooks';

const withBranch = (flagNames, WhenTrue, WhenFalse) => {
  const Branch = (props) => {
    const flags = useFeatureFlags();

    let isTrue = true;
    if (Array.isArray(flags)) {
      flagNames.forEach((flag) => {
        isTrue = flags[flag] && isTrue;
      });

      return isTrue ? <WhenTrue {...props} /> : <WhenFalse {...props} />;
    }

    return flags[flagNames] ? (
      <WhenTrue {...props} />
    ) : (
      <WhenFalse {...props} />
    );
  };

  return Branch;
};

export default withBranch;
