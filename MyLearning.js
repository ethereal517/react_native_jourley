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
		this.props.navigator.push({
			name: 'Schedule',
			learningID: id,
		});
	}

	renderLearning(learning) {
		return (
			<View style={styles.rowContainer}>
				<View style={styles.infoContainer}>
					<Image 
						source={{ uri: learning.image }}
						style={styles.thumbnail}
					/>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{ learning.title }</Text>
						<View style={styles.counts}>
							<Text style={styles.count}>{ learning.reads ? learning.reads : 'No' } Read{ learning.reads && learning.reads > 0 ? 's' : ''}</Text>
							<Text style={styles.count}>{ learning.practice ? learning.practice : 'No' } Practice{ learning.practice && learning.practice > 0 ? 's' : ''}</Text>
							<Text style={styles.count}>{ learning.learning ? learning.learning : 'No' } Practice{ learning.learning && learning.learning > 0 ? 's' : ''}</Text>
						</View>		
						<View style={styles.verbose}>
							<Text>Focus Areas: None (click refine it to define)</Text>
							<Text>Time Commitment: None (click refine it to define)</Text>
						</View>	
						
					</View>
					<View style={styles.forwardContainer}>
						<Icon name="chevron-right" size={40} color="#00dfff" style={styles.forward} />	
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rowContainer: {

	},
	rightContainer: {
		flex: 1,
		marginLeft: 10,
	},
	forward: {
		alignSelf: 'center',
	},
	forwardContainer: {
		justifyContent: 'center',
	},
	infoContainer: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		flexDirection: 'row',
		flex: 1,
		padding: 5,
	},
	urlsContainer: {
		flexDirection: 'row',
		padding: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	urlItem: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,		
	},
	itemText: {
		textAlign: 'center',
		flex: 1,
		color: 'blue',
		alignSelf: 'center',
	},
	thumbnail: {
		width: 100,
		height: 100,
		borderRadius: 4,
		borderColor: 'blue',
		backgroundColor: 'grey',
	},
	title: {
		fontSize: 30,
	},
	counts: {
		flexDirection: 'row',
	},
	verbose: {
		marginTop: 10,
	},
	count: {
		marginRight: 20,
		color: '#0023f5',
	}
});

module.exports = MyLearning;