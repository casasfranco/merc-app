import React from 'react';
import classnames from 'tailwindcss-classnames';

import Card from '../Card';
import styles from './CardContainer.module.css';

const CardContainer = ({ className, children, card = false }) => {
  // const defaultStyle = useResponsiveVariant({
  //   default: false,
  //   lg: true,
  // });

  const showCard = card;

  return (
    <Card
      className={classnames(styles.container, className, {
        [styles.card]: showCard,
      })}
    >
      {children}
    </Card>
  );
};

export default CardContainer;
