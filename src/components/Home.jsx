import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n/i18n';

const Home = props => (
  <div className="container" style={{ paddingTop: '100px' }}>
    <div className="jumbotron mt-0 py-1 text-center border pb-2">
      <h1><img src={`${process.env.PUBLIC_URL}/images/LogoModelCanvasVertical.svg`} alt={props.title} style={{ maxHeight: '300px', height: '100%', width: '100%' }} /></h1>
      <p className="lead">{i18n.t('home_lead.label')}</p>
      <hr className="my-4 d-none d-sm-block" />
      {/* <p className="d-none d-sm-block">The following canvas types are natively available, with support to many more to come...</p>
      <ul className="list-unstyle d-none d-sm-block">
        <li>Project Model Canvas</li>
        <li>Business Model Canvas</li>
        <li>Lean Canvas</li>
        <li>Swot Canvas</li>
      </ul> */}
      <p className="d-none d-sm-block">{i18n.t('home_explanation.label')}</p>
      <button className="btn btn-primary btn-lg">{i18n.t('home_learn_more.label')}</button>
      {/* <div className="text-right">
        <p>Photo by <a href="https://unsplash.com/photos/u5XiXcOq2Tw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">rawpixel</a> on <a href="https://unsplash.com/search/photos/business?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
      </div> */}
    </div>
  </div>

);

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
