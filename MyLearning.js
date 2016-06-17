import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

class MyLearning extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Hey boy!</Text>
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

module.exports = MyLearning;