import React from 'react';

import './LandingPage.scss';
import MainSearch from './MainSearch';

const LandingPage = () => {
  return (
    <main className='LandingPage page'>
      <section className='hero flex flex-col items-center justify-center'>
        <h1 className='hero-text mb-12'>It's more than just a trip</h1>
        <div className='w-full px-30'>
          <MainSearch />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
