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
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.title}>{ learning.title }</Text>
				<TouchableHighlight style={styles.rightButton} onPress={() => this.removeRow(learning._id)}>
					<Icon name="minus-circle" size={30} color="#00dfff" />
				</TouchableHighlight>
			</View>
		);
	}

	renderLoadingView() {
		return (
			<View style={styles.loadingContainer}>
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
				style={styles.listContainer}
			/>
		);
	}
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		backgroundColor: 'blue',
		justifyContent: 'flex-end',
		padding: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	loadingContainer: {
		backgroundColor: 'green',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightButton: {
		right: 10,
		alignItems: 'flex-end',
		backgroundColor: 'yellow'
	},
	listContainer: {
		backgroundColor: 'brown',
		marginTop: 60,
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
		alignItems: 'flex-start',
		flex: 10,
	}
});

module.exports = LearningList;