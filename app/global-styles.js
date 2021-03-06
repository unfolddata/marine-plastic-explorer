import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');

  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  .mpx-img {
    max-width: 100%;
  }
  .mpx-layer-lead {
    font-size: 20px;
    font-weight: 600;
    // compare theme.js colors.brand
    color: #009191;
  }
  
  figure {
    margin: 0;
  }


  .leaflet-top .leaflet-control-zoom {
    margin-top: 80px;
  }
`;

export default GlobalStyle;
