import { DocumentText, Layer } from 'grommet-icons';
import React from 'react';

// application routes and paths
export const ROUTES = {
  INTRO: 'intro',
  EXPLORE: 'explore',
  ANALYSE: 'analyse',
};

export const PAGES = {
  about: {
    path: 'about',
  },
};
export const MODULES = {
  intro: {
    path: ROUTES.INTRO,
    icon: <DocumentText color="white" />,
  },
  explore: {
    path: ROUTES.EXPLORE,
    icon: <Layer color="white" />,
  },
};

// data/config & content locations

// use local, relative resources for production and remote resources during development
export const RESOURCES = {
  // TODO: consider local resource for data
  DATA:
    process && process.env && process.env.NODE_ENV === 'production'
      ? './data'
      : 'https://unfolddata.github.io/marine-plastic-explorer/data',
  // resources are generated by jekyll as a static site, path is determined by resource permalink
  CONTENT:
    process && process.env && process.env.NODE_ENV === 'production'
      ? './content'
      : 'https://unfolddata.github.io/marine-plastic-explorer/content',
  IMAGES:
    process && process.env && process.env.NODE_ENV === 'production'
      ? './assets/uploads'
      : 'https://unfolddata.github.io/marine-plastic-explorer/assets/uploads',
};

export const CONFIG = {
  stories: 'stories.json',
  explore: 'explore.json',
  layers: 'layers.json',
};

export const MAX_LOAD_ATTEMPTS = 5;

// map config

export const MAPBOX = {
  TOKEN: 'pk.eyJ1IjoidG1mcm56IiwiYSI6IkRNZURKUHcifQ._ljgPcF75Yig1Of8adL93A',
  USER: 'tmfrnz',
  RASTER_URL_TEMPLATE:
    'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}',
  STYLE_URL_TEMPLATE:
    'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
};
