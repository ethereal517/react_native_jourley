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

import NavigationBar from 'react-native-navbar';

const REQUEST_URL = 'http://localhost:8080/learnings/';

class MyLearning extends Component {
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

	refine(id) {
		console.log("refine");
	}

	showLearningPlan(id) {
		console.log("showLearningPlan");
	}

	showLog(id) {
		console.log("showLog");
	}

	showSchedule(id) {
		console.log("showSchedule");
	}

	renderLearning(learning) {
		return (
			<View style={styles.rowContainer}>
				<View style={styles.infoContainer}>
					<Image 
						source={{uri: learning.image}}
						style={styles.thumbnail}
					/>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{ learning.title }</Text>
						<View>
							<Text>{ learning.reads ? learning.reads : 'No' } Reads</Text>
						</View>			
					</View>
				</View>
				<View style={styles.urlsContainer}>
					<View style={styles.urlItem}>
						<TouchableHighlight
							underlayColor='#99f48c'
							onPress={() => this.refine(learning._id)}>
							<Text style={styles.itemText}>Refine{"\n"}it</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.urlItem}>
						<TouchableHighlight
							onPress={() => this.showLearningPlan(learning._id)}>
							<Text style={styles.itemText}>My{"\n"}Learning Plan</Text>
						</TouchableHighlight>
					</View>					
					<View style={styles.urlItem}>
						<TouchableHighlight
							onPress={() => this.showLog(learning._id)}>
							<Text style={styles.itemText}>My Learning/{"\n"}Practice Log</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.urlItem}>
						<TouchableHighlight
							onPress={() => this.showSchedule(learning._id)}>
							<Text style={styles.itemText}>Schedule</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
			
		);
	}

	render() {
		const titleConfig = {
			title: 'My Learning',
		};

		const rightButtonConfig = {
			title: 'Edit',
			handler: () => this.props.navigator.pop()
		};

		var content;

		if (!this.state.loaded) {
			content = (
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS size='large' />
					<Text>
						Loading My Learnings...
					</Text>
				</View>
			);
		}

		else {
			content = (
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderLearning.bind(this)}
					style={styles.listContainer}
				/>
			);
		}

		return (
			<View style={{ flex: 1, }}>
				<NavigationBar
					title={titleConfig}
					rightButton={rightButtonConfig} />
				{ content }				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listContainer: {

	},
	rowContainer: {

	},
	rightContainer: {

	},
	infoContainer: {

	},
	urlsContainer: {
		flexDirection: 'row',
		padding: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	urlItem: {
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,		
	},
	itemText: {
		textAlign: 'center',
		flex: 1,
		backgroundColor: 'green',
		alignSelf: 'center',
	},
	thumbnail: {
		width: 100,
		height: 100,
		borderRadius: 4,
		borderColor: 'blue',
	},
	title: {

	},
});

module.exports = MyLearning;