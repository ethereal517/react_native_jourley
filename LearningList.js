import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const REQUEST_URL = 'http://localhost:8080/learnings/';

class LearningList extends Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,			
		});
		this.state = {
			dataSource: dataSource,
			loaded: false,
			newLearningText: '',
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
		fetch(REQUEST_URL + id, { method: "DELETE" })
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.status == 200)
				{
					this.fetchLearnings();
				}
			})
	}

	addRow() {
		fetch(REQUEST_URL, { method: "POST", 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: this.state.newLearningText,
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.status == 200)
				{
					this.setState({
						newLearningText: ''
					});
					
					this.fetchLearnings();
				}
			})

	}

	changeText(text) {
		this.setState({
			newLearningText: text
		});
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
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderLearning.bind(this)}
					style={styles.listContainer}
				/>
				<View style={styles.rowContainer}>
					<TextInput style={styles.title} onChangeText={(text) => this.changeText(text)} value={this.state.newLearningText} />
					<TouchableHighlight style={styles.rightButton} onPress={() => this.addRow()}>
						<Icon name="plus-circle" size={30} color="#0000ff" />
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightButton: {
		right: 10,
		alignItems: 'flex-end',
	},
	listContainer: {
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