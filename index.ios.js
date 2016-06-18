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

import Ionicon from 'react-native-vector-icons/Ionicons';

class Jourley extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'LearningList',
      navigator: null,
    };
  }

  changeTabSelection(tabName) {
    // debugger;
   //    this.props.navigator.push({
   //      name: tabName,
   //    });
    console.log(tabName);
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
                  <View style={{ flex: 1, }}>
                    
                    <TabBarIOS
                      tintColor="black"
                      barTintColor="#3abeff">
                      <Ionicon.TabBarItemIOS
                        style={ styles.tabBarItem }
                        selected={false}
                        iconName='ios-search'
                        title='Explorer'
                        navigator={navigator}
                        onPress={ this.changeTabSelection('LearningList') }>
                        <View></View>
                      </Ionicon.TabBarItemIOS>
                      <Ionicon.TabBarItemIOS
                        style={{ backgroundColor: 'green' }}
                        selected={true}
                        iconName='ios-list-outline'
                        title='My Learning'
                        navigator={navigator}
                        onPress = { this.changeTabSelection('MyLearning') }>
                        <MyLearning navigator={navigator} />
                      </Ionicon.TabBarItemIOS>
                    </TabBarIOS>
                  </View>
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
