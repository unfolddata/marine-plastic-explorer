/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import appTheme from 'theme';
import { Grommet, Button } from 'grommet';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getHeaderHeight } from 'utils/responsive';

import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  loadConfig,
  navigateHome,
  navigate,
  setLayerInfo,
} from 'containers/App/actions';
import {
  selectRouterPath,
  selectPageSearch,
  selectInfoSearch,
  selectLocale,
} from 'containers/App/selectors';

import ModuleStories from 'containers/ModuleStories/Loadable';
import ModuleExplore from 'containers/ModuleExplore/Loadable';
import Header from 'containers/Header';
import Map from 'containers/Map';
import Page from 'containers/Page';
import LayerInfo from 'containers/LayerInfo';

import { ROUTES, CONFIG } from 'config';
import GlobalStyle from 'global-styles';
import { appLocales, DEFAULT_LOCALE } from 'i18n';

import commonMessages from 'messages';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  top: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
  }
`;

const Brand = styled(props => <Button {...props} plain />)`
  position: absolute;
  z-index: 3000;
  top: 20px;
  left: 0;
  max-width: 140px;
  padding: 0 ${({ theme }) => theme.global.edgeSize.xsmall};
  font-weight: 600;
  color: ${({ route, theme }) =>
    theme.global.colors[route !== ROUTES.INTRO ? 'white' : 'black']};
  background: ${({ route, theme }) =>
    theme.global.colors[route === ROUTES.INTRO ? 'white' : 'black']};
`;

function App({
  onLoadConfig,
  navHome,
  path,
  page,
  info,
  onClosePage,
  onCloseLayerInfo,
  locale,
}) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'default', saga });
  useEffect(() => {
    onLoadConfig();
  }, []);

  // figure out route for Brand element colours
  const paths = path.split('/');
  const route = paths.length > 1 ? paths[2] : '';
  return (
    <Grommet theme={appTheme}>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Marine Plastic Explorer"
          defaultTitle="Marine Plastic Explorer"
        >
          <meta name="description" content="" />
        </Helmet>
        <Header route={route} />
        <Content>
          <Map />
          <Switch>
            <Route
              path={`/:locale(${appLocales.join('|')})/${ROUTES.INTRO}/`}
              component={ModuleStories}
            />
            <Route
              path={`/:locale(${appLocales.join('|')})/${ROUTES.EXPLORE}/`}
              component={ModuleExplore}
            />
            <Redirect to={`/${locale || DEFAULT_LOCALE}/${ROUTES.INTRO}/`} />
          </Switch>
          {page !== '' && <Page page={page} onClose={() => onClosePage()} />}
          {info !== '' && (
            <LayerInfo id={info} onClose={() => onCloseLayerInfo()} />
          )}
          <Brand
            onClick={() => navHome()}
            label={<FormattedMessage {...commonMessages.appTitle} />}
            route={route}
          />
        </Content>
        <GlobalStyle />
      </AppWrapper>
    </Grommet>
  );
}

App.propTypes = {
  navHome: PropTypes.func,
  onLoadConfig: PropTypes.func,
  onClosePage: PropTypes.func,
  onCloseLayerInfo: PropTypes.func,
  path: PropTypes.string,
  page: PropTypes.string,
  info: PropTypes.string,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  path: state => selectRouterPath(state),
  page: state => selectPageSearch(state),
  info: state => selectInfoSearch(state),
  locale: state => selectLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadConfig: () => {
      Object.keys(CONFIG).forEach(key => {
        dispatch(loadConfig(key));
      });
    },
    onClosePage: () =>
      dispatch(
        navigate(null, {
          deleteSearchParams: ['page'],
        }),
      ),
    onCloseLayerInfo: () => dispatch(setLayerInfo()),
    navHome: () => dispatch(navigateHome()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
