/*
 * ModuleStories
 *
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import {
  selectLayersConfig,
  selectStoriesConfig,
  selectChapterSearch,
  selectStorySearch,
} from 'containers/App/selectors';
// import { setUIState, setChapter, setStory } from 'containers/App/actions';
import { setChapter, setStory } from 'containers/App/actions';

import PanelChapter from 'containers/PanelChapter';
import ModuleWrap from 'components/ModuleWrap';

// import commonMessages from 'messages';
// import messages from './messages';

const Styled = styled.div``;

export function ModuleStories({
  layersConfig,
  storiesConfig,
  onPrevious,
  onNext,
  story,
  chapter,
  onSetStory,
  onSetChapter,
}) {
  useEffect(() => {
    if (!story) {
      onSetStory(0);
    }
    if (!chapter) {
      onSetChapter(0);
    }
  });

  if (!storiesConfig) return null;

  const storyConfig =
    storiesConfig.length === 1 ? storiesConfig[0] : storiesConfig[story];
  const chapterConfig =
    storyConfig.chapters &&
    storyConfig.chapters.length > 0 &&
    storyConfig.chapters[chapter];
  // prettier-ignore
  return (
    <Styled>
      <Helmet>
        <title>Module Stories</title>
        <meta name="description" content="stories" />
      </Helmet>
      <ModuleWrap>
        {layersConfig &&
          storyConfig.chapters &&
          chapter < storyConfig.chapters.length && (
          <PanelChapter
            onPrevious={() => onPrevious(chapter)}
            onNext={() => {
              onNext(chapter, storyConfig.chapters.length);
            }}
            chapter={chapterConfig}
            isFirst={chapter === 0}
            isLast={chapter === storyConfig.chapters.length - 1}
            layers={layersConfig.filter(
              layer =>
                chapterConfig &&
                chapterConfig.layers &&
                chapterConfig.layers.indexOf(layer.id) > -1,
            )}
          />
        )}
      </ModuleWrap>
    </Styled>
  );
}

ModuleStories.propTypes = {
  layersConfig: PropTypes.array,
  storiesConfig: PropTypes.array,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onSetChapter: PropTypes.func,
  onSetStory: PropTypes.func,
  story: PropTypes.number,
  chapter: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  layersConfig: state => selectLayersConfig(state),
  storiesConfig: state => selectStoriesConfig(state),
  story: state => selectStorySearch(state),
  chapter: state => selectChapterSearch(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onNext: (current, max) => dispatch(setChapter(Math.min(current + 1, max))),
    onPrevious: current => dispatch(setChapter(Math.max(current - 1, 0))),
    onSetChapter: chapter => dispatch(setChapter(chapter)),
    onSetStory: chapter => dispatch(setStory(chapter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ModuleStories);
