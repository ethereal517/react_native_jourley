/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

import LearningList from './LearningList';
import MyLearning from './MyLearning';

class Jourley extends Component {
  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'What do you want to learn?',
          component: LearningList,
          rightButtonTitle: 'Next >',
          onRightButtonPress: () => {
            this.refs.nav.navigator.push({
              title: 'My Learning',
              component: MyLearning,
              rightButtonTitle: 'Edit',
              onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
            });
          }
        }}
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
