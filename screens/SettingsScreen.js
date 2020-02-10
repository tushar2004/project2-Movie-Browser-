import React from 'react';
import { TouchableOpacity, Button, View, Text, StyleSheet, TextInput, Picker, AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwitchActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		flex:1,	
	},
	text: {
		fontSize: 14,
	},
	yearField: {
		borderWidth: 1,
		height: 30,
		width: 70,
		paddingLeft: 10
	},
	displayInline: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
		marginLeft: 10,
	},
	plotPicker: {
		height: 150,
		width: 100,
	},
	itemStyle: {
		fontSize: 16,
	},
	iconMargin: {
		marginRight: 20
	}
})

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		headerTitle: 'Settings',
	}
	
	state = {
		year: '',
		content: 'movie',
	}

	_getData = async() => {
		let [searchYear, searchContentType] = await AsyncStorage.multiGet(['searchYear', 'searchContentType']);
		searchYear = searchYear[1];
		searchContentType = searchContentType[1];	
		return [searchYear, searchContentType];
	}
	
	componentDidMount = async () => {
		const settingsData = await this._getData();
		this.setState(prevState => ({
			year: settingsData[0] ? settingsData[0] : '',
			content: settingsData[1] ? settingsData[1] : this.state.content,
		}));
	}

	handleYearChange = year => {
		this.setState({...this.state, year});
	}

	handleContentChange = content => {
		this.setState({...this.state, content});
	}

	_saveChanges = async () => {
		const currentYear = new Date().getFullYear();
		if((this.state.year <= currentYear && this.state.year.length === 4) || this.state.year === '') { 
			await AsyncStorage.multiSet([['searchYear', this.state.year], ['searchContentType', this.state.content]]);
		} else {
			const settingsData = await this._getData();
			this.setState({year: settingsData[0], content: this.state.content});
		}

	// DOESN'T WORK WITH THESE
		//this.props.navigation.navigate('Movies', {notification: 'Your preferences have been successfully saved.'});
		//this.props.navigation.dispatch(SwitchActions.jumpTo({routeName: 'Movies'}));

	/*
		const navigateAction = NavigationActions.navigate({
			routeName: 'Home',
			params: {type: 'resetSearch'}
		});
		this.props.navigation.dispatch(navigateAction);
	*/
		this.props.navigation.navigate('Home', {type: 'resetSearch'});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.displayInline}>
					<Icon name={'ios-calendar'} style={styles.iconMargin} size={30} color={'black'} />
					<Text style={[styles.text, {marginRight: 10, marginTop: 7}]}>Year:</Text>
					<TextInput placholder="Year" keyboardType="number-pad" value={this.state.year} onChangeText={this.handleYearChange} style={styles.yearField}/>
					{this.state.year !== '' && (
						<TouchableOpacity style={{marginLeft: 20}} onPress={() => this.handleYearChange('')}>
							<Icon name={'ios-close-circle-outline'} size={30} color={'black'} />
						</TouchableOpacity>
					)}
				</View>
				<View style={[styles.displayInline, {marginTop: 20, alignItems: 'center'}]}>
					<Icon style={styles.iconMargin} name={'ios-tv'} color={'black'} size={30} />
					<Text style={styles.text}>Content Type: </Text>
					<Picker itemStyle={[styles.itemStyle, {height: 100}]} style={[{marginTop: 40}, styles.plotPicker]} onValueChange={this.handleContentChange} selectedValue={this.state.content}>
						<Picker.Item label="All" value="" />
						<Picker.Item label="Movie" value="movie" />
						<Picker.Item label="Series" value="series" />
						<Picker.Item label="Game" value="game" />
						<Picker.Item label="Episode" value="episode" />
					</Picker>
				</View>
				<View>
					<Button title="Apply" onPress={() => this._saveChanges()} />
				</View>
			</View>
		)
	}
}
