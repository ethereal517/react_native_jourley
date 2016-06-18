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
import Schedule from './Schedule';

class Jourley extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'LearningList',
      navigator: null,
    };
  }

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
              if (route.name == 'Schedule') {
                return (
                  <Schedule navigator={navigator} learningID={ route.learningID } />
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
  },  
  tabBarItem: {
    backgroundColor: 'red',
  },
});

AppRegistry.registerComponent('Jourley', () => Jourley);
