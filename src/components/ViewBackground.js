import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import commonStyle from '../utils/commonStyle';

const ViewBackground = (props) => {
  const { children } = props;
  return (
    <ImageBackground
      source={require('../../assets/imgs/background_1.jpg')}
      style={commonStyle.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

ViewBackground.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ViewBackground;
