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
  TabBarIOS,
  Text,
  View
} from 'react-native';

import LearningList from './LearningList';
import MyLearning from './MyLearning';
import Schedule from './Schedule';

import Icon from 'react-native-vector-icons/Ionicons';

class Jourley extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'LearningList'
    };
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
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

        <TabBarIOS selectedTab={this.state.selectedTab}>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'LearningList'}
            iconName='search'
            title='Explorer'
            onPress={() => {
              this.setState({
                selectedTab: 'LearningList'
              });
            }}>
              <View><Text>ABC</Text></View>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'MyLearning'}
            iconName='ios-list-outline'
            title='My Learning'
            onPress = {() => {
              this.setState({
                selectedTab: 'MyLearning'
              });
            }}>
              <View><Text>EFG</Text></View>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Jourley', () => Jourley);
