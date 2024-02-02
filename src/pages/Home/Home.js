import React from 'react';
import { Page } from '../../components';
import styles from './Home.module.css';

const Home = () => {
  return (
    <Page>
      <div className="flex w-full justify-around">
        <div className="flex flex-col flex-wrap justify-between w-full">
          <Page.Section cardStyle={true} className={styles.card}>
            <h2>Solicitudes de contratos pendientes</h2>
            <p>Contrato 0-04</p>
            <p>Contrato 0-05</p>
          </Page.Section>

          <Page.Section cardStyle={true} className={styles.card}>
            <h2>Contratos pendiente de firma Mexico</h2>
            <p>Contrato 0-03</p>
          </Page.Section>
        </div>
        <div className="flex flex-col flex-wrap justify-between w-full">
          <Page.Section cardStyle={true} className={styles.card}>
            <h2>Contratos en proceso de comprobación</h2>
            <p>Contrato 0-02</p>
          </Page.Section>

          <Page.Section cardStyle={true} className={styles.card}>
            <h2>Contratos en viaje</h2>
            <p>Contrato 0-01</p>
          </Page.Section>
        </div>
      </div>
    </Page>
  );
};

export default Home;
