/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import StoryPropTypes from '../../types';
import { useUnits } from '../../units';
import { getBorderStyle, shouldDisplayBorder } from './utils';

const borderElementCSS = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DashedBorder = styled.div`
  ${borderElementCSS}
  &:after {
    content: ' ';
    ${({ dash, gap, color, left, top, right, bottom, position }) =>
      getBorderStyle({ dash, gap, color, left, top, right, bottom, position })}
  }
`;

export default function WithBorder({ element, children }) {
  const { dataToEditorX } = useUnits((state) => ({
    dataToEditorX: state.actions.dataToEditorX,
  }));
  if (!shouldDisplayBorder(element)) {
    return children;
  }
  const { border } = element;
  const { gap, left, top, right, bottom } = border;

  // If there's no gap set, let's set the dash to 1 for creating solid border.
  const dash = gap ? border.dash : 1;
  const adjustedProps = {
    ...border,
    left: Math.round(dataToEditorX(left)),
    top: Math.round(dataToEditorX(top)),
    right: Math.round(dataToEditorX(right)),
    bottom: Math.round(dataToEditorX(bottom)),
  };
  return (
    <DashedBorder {...adjustedProps} dash={dash}>
      {children}
    </DashedBorder>
  );
}

WithBorder.propTypes = {
  element: StoryPropTypes.element.isRequired,
  children: PropTypes.node,
};