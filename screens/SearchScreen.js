import React from 'react'
import { Button, Modal, View, Text, TextInput, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import { search }  from '.././mockData'
import { searchMovies } from './../api'
import MovieList from './../MovieList'

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		margin: 20
	},
	inputField: {
		padding: 5,
	}
})

export default class SearchScreen extends React.Component {
	state = {
		keywords: '',
		data: null,
		page: 1,
		err: '',
	}

	componentDidMount() {
		this.navigationEvent = this.props.navigation.addListener('didFocus', payload => {
			if(payload.action.type === 'Navigation/NAVIGATE' || this.props.navigation.getParam('type') !== undefined) {
				this.props.navigation.getParam('type') !== undefined ? this.props.navigation.setParams({type: undefined}) : '';
				this.setState({keywords: '', data: null, page: 1, err: ''});
			}
		});
	}

	componentWillUnmount() {
		// remove the event listener
		this.navigationEvent.remove();
	}

	showMovieDetails = async (movieID, movieTitle) => {
		let [, searchContentType ] = await this._getData();
		searchContentType = searchContentType[1];
		this.props.navigation.navigate('MovieDetails', {searchContentType, movieID, movieTitle})
	}	

	updatePage = () => {
		this.setState({page: this.state.page + 1}, () => this.handleSearch(this.state.keywords))
	}

	_getData = async () => {
		const data = await AsyncStorage.multiGet(['searchYear', 'searchContentType']);
		return data;
	}

	queryMovies = async (keywords, page=null) => {
		try {
			let [searchYear, searchContentType] = await this._getData();
			searchYear = searchYear[1];	
			searchContentType = searchContentType[1];
			const { Search, totalResults } = await searchMovies(searchYear, searchContentType, keywords, page)
			if(Search) {
				return {Search, totalResults, keywords}
			}
			return null;
				//this.setState({err});
					// OR
				// this.setState({err: 'Something went wrong, please try again after some time.'});
		} catch(err) {
			return;
			//throw new Error(err);
		}
	}

	handleSearch = async keywords => {
		this.setState({keywords})
		try {
			const result = await this.queryMovies(keywords)
			if (result) {
				const { Search, keywords, totalResults } = result;
				this.setState({data: { movies: [...Search], totalResults, keywords }});
			} else {
				if(this.state.data) this.setState({data: null})
			}
		} catch(err) {
			this.setState({err})
		}
	}

	render() {
		/*
		-- WILL WORK ON THIS LATER ON --
				<Modal visible={this.state.modalVisibility} animationType={'slide'} transparent={true}>
					<View>
						<Text style={{justifyContent: 'center', alignItems: 'center'}}>{this.props.navigation.getParam('notification')}</Text>
						<Button title="OK" onPress={() => this.setState({modalVisibility: false})} />
					</View>	
				</Modal>
		*/

		{ this.state.err ? alert(this.state.err) : '' }

		return (
			<View style={styles.Container}>
				<TextInput 
					autoFocus={true} 
					placeholder='Search movies....' 
					style={styles.inputField} 
					value={this.state.keywords} 
					onChangeText={this.handleSearch} 
					borderWidth={2} 
					borderColor='grey' 
				/>

			{this.state.data === null && (<Text style={{marginTop: 20, fontSize: 20, textAlign: 'center'}}>No results...</Text>)}

			{this.state.data && (
				<MovieList data={this.state.data} moreMovies={this.queryMovies} movieDetails={this.showMovieDetails}/>
			)}
			</View>
		)
	}
	
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: 'Movie Browser'
		}
	}








































}
