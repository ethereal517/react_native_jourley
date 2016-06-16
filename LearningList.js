import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const REQUEST_URL = 'http://localhost:8080/learnings';

class LearningList extends Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,			
		});
		this.state = {
			dataSource: dataSource,
			loaded: false,
		};
	}

	componentDidMount() {
		this.fetchLearnings();
	}

	fetchLearnings() {
		fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {
				debugger;
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	}

	removeRow(id) {
		console.log(id);
	}

	renderLearning(learning) {
		debugger;
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.title}>{ learning.title }</Text>
				<TouchableHighlight onPress={() => this.removeRow(learning.id)}>
					<Icon name="minus-circle" size={30} color="#00dfff" />
				</TouchableHighlight>
			</View>
		);
	}

	renderLoadingView() {
		return (
			<View style={styles.container}>
				<ActivityIndicatorIOS size='large' />
				<Text>
					Loading Learnings...
				</Text>
			</View>
		);
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderLearning.bind(this)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		padding: 10,
	},
	container: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
	}
});

module.exports = LearningList;