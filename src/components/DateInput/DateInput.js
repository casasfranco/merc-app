import React from 'react';
import { Input } from '..';

const DateInput = React.forwardRef(({ containerClassName, ...props }, ref) => (
  <Input
    ref={ref}
    type="date"
    containerClassName={containerClassName}
    {...props}
  />
));

DateInput.displayName = 'DateInput';

export default DateInput;
