/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import LearningList from './LearningList';
import MyLearning from './MyLearning';

class Jourley extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'LearningList', index: 0}}
        renderScene={(route, navigator) =>
          {
            if (route.name == 'LearningList') {
              return (
                <LearningList navigator={navigator} />
              );
            }
            if (route.name == 'MyLearning') {
              return (
                <MyLearning navigator={navigator} />
              );
            }            
          }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Jourley', () => Jourley);
