import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

import NavigationBar from 'react-native-navbar';

class MyLearning extends Component {
	render() {
		const titleConfig = {
			title: 'My Learning',
		};

		const rightButtonConfig = {
			title: 'Edit',
			handler: () => this.props.navigator.pop()
		};
		
		return (
			<View style={{ flex: 1, }}>
				<NavigationBar
					title={titleConfig}
					rightButton={rightButtonConfig} />
				<View style={styles.container}>
					<Text>Hey boy!</Text>
				</View>
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