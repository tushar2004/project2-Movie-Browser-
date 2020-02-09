import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { searchMovies } from './api'

import Movie from './Movie'

const styles = StyleSheet.create({
	searchResultHeading: {
		color: 'grey',
		textAlign: 'center',
		marginTop: 5
	},
})

export default class MovieList extends React.Component {
	state = {
		movies: this.props.data.movies,
		page: 1,
	}

	componentWillReceiveProps(nextProps) {
		this.setState({movies: nextProps.data.movies})
	}

	//static getDerivedStateFromProps(props, state) {
		/*
		const data = state.movies === true ? state.movies : props.data.movies
		return {
			movies: [...data]
		}
		*/
	
	/*
		return {
			movies: [...props.data.movies, ...state.movies]
		}		
	*/
	
		/*
		return {
			movies: [...props.data.movies]
		}
		*/
	//}

	renderItem = ({ item }) => <Movie onMovieSelect={this.props.movieDetails} {...item}/> 

	loadMoreMovies = async () => {
		const result = await this.props.moreMovies(this.props.data.keywords, this.state.page)
		if(result) {
			const { Search, totalResults } = result;
			this.setState(prevState => ({movies: [...prevState.movies, ...Search]}))
		}
	}
	
	onEndReached = (something) => {
		//console.log(something);
		this.setState({
			page: this.state.page + 1
		}, () => this.loadMoreMovies())
	}
	
	render() {
		return (	
			<View>
				<Text style={styles.searchResultHeading}>{this.props.data.movies ? `${this.props.data.totalResults} results found for '${this.props.data.keywords}'` : ''}</Text>
				<FlatList
					onEndReachedThreshold={0.9}
					onEndReached={() => this.onEndReached()}
					renderItem={this.renderItem}
					data={this.state.movies}
					extraData={this.state}
					keyExtractor={(item, index) => `${index+1}`}
				/>
			</View>
		)
	}
}

