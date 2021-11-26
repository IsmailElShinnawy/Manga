import React from 'react';

import './LandingPage.scss';

const LandingPage = () => {
  return (
    <main className='LandingPage'>
      <section className='hero flex items-center justify-center'>
        <div className='hero-text-outer-container'>
          <div className='hero-text-container'>
            <h1 className='hero-text'>It's more than just a trip</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
