import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  Switch,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';

const REQUEST_URL = 'http://localhost:8080/learnings/';

class Schedule extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			schedule: 0,
			loaded: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}),
		};
	}

	componentDidMount() {
		this.fetchLearnings();
	}

	fetchLearnings() {
		fetch(REQUEST_URL + this.props.learningID)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					learning: responseData,
					dataSource: this.state.dataSource.cloneWithRows(this.getJsonDayScheduleListFrom(responseData.schedule)),
					loaded: true,
				});
			})
			.done();
	}

	getJsonDayScheduleListFrom(schedule) {
		var dayScheduleJson = [];
		for ( let i = 0; i < 7; i++)
		{
			let remainder = schedule % 8;
			schedule = schedule >> 3;

			dayScheduleJson.push({
				id: i, scheValue: remainder
			});
		}
		return dayScheduleJson;
	}

	recalc(id, timeMoment, value) {
		var newSchedule = value ?  this.state.learning.schedule  + (Math.pow(2, 3 * id + timeMoment)) : this.state.learning.schedule - (Math.pow(2, 3 * id + timeMoment));
		return newSchedule;
	}

	updateSchedule(id, timeMoment, value) {
		this.state.learning.schedule = this.recalc(id, timeMoment, value);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(
				this.getJsonDayScheduleListFrom(this.state.learning.schedule)
			),
		});

		fetch(REQUEST_URL + this.props.learningID, { method: 'PUT', 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				learning: this.state.learning,
			})
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.status == 200)
				{
					this.fetchLearnings();
				}
			})
			.done();
	}

	renderDaySchedule(daySchedule) {
		return (
			<View style={styles.rowContainer}>
				<Text style={styles.dayHeader}>{ weekDays[daySchedule.id] }</Text>
				<View style={styles.timeMoment}>
					<Text>Early Morning</Text>
					<Switch
						onValueChange={(value) => this.updateSchedule(daySchedule.id, 0, value)}
						value={ daySchedule.scheValue % 2 ? true : false }
					/>
				</View>
				<View style={styles.timeMoment}>
					<Text>Lunch Time</Text>
					<Switch
						onValueChange={(value) => this.updateSchedule(daySchedule.id, 1, value)}
						value={ (daySchedule.scheValue >> 1) % 2 ? true : false } 
					/>
				</View>
				<View style={styles.timeMoment}>
					<Text>After Office</Text>
					<Switch
						onValueChange={(value) => this.updateSchedule(daySchedule.id, 2, value)}
						value={ (daySchedule.scheValue >> 2) % 2 ? true : false } 
					/>
				</View>
			</View>
		);
	}

	render() {
		const titleConfig = {
			title: 'Schedule',
		};

		const leftButtonConfig = {
			title: '< Label',
			handler: () => this.props.navigator.pop()
		};

		var content = this.state.loaded ? (
				<ListView 
					dataSource={this.state.dataSource}
					renderRow={this.renderDaySchedule.bind(this)}
					style={styles.weekdays}
				/>
			) : (
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS size='large' />
					<Text>
						Loading My Learnings...
					</Text>
				</View>
			)

		return (
			<View style= {{ flex: 1, }}>
				<NavigationBar
					title={titleConfig}
					leftButton={leftButtonConfig} />
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	weekdays: {

	},
	rowContainer: {

	},
});

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

module.exports = Schedule;