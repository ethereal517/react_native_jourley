import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  Image,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';

const REQUEST_URL = 'http://localhost:8080/learnings/';

class Schedule extends Component {
	render() {
		return (
			<View style= {styles.container}>
				<Text>Schedule Page</Text>
			</View>
		);
		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

module.exports = Schedule;