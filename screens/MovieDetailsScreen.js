import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native'

import { searchMovie } from './../api'

const styles = StyleSheet.create({
	title: {
		textAlign: 'justify',
		fontSize: 22,
		fontWeight: 'bold',
		padding: 10
	},
	image: {
		width: '100%',
		height: undefined,
		//overflow: 'hidden',
		aspectRatio: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	greyText: {
		margin: 10,
		color: 'grey',
	},
	body: {
		textAlign: 'justify',
		margin: 10,
		marginBottom: 20
	},
	rating: {
		width: '100%',
		backgroundColor: '#ddd',
		margin: 10,
	},
	ratingSource: {
		marginLeft: 10
	},
	ratingValue: {
		backgroundColor: 'green',
		textAlign: 'right',
		color: '#fff',
	}
})

export default class MovieDetailsScreen extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: navigation.getParam('movieTitle'),
		}
	}
	
	state = {
		Loading: true,
		Title: '',
		Poster: '',
		Plot: '',
		Ratings: [],
		err: '',
	}

	componentDidMount() {
		this.getMovieDetails()
	}

	getMovieDetails = async () => {
		const movieID = this.props.navigation.getParam('movieID')
		//const searchContentType = this.props.navigation.getParam('searchContentType');
		let movie;
		try {
			movie = await searchMovie(movieID);
			this.setState({...movie});
			setTimeout(() => this.setState({Loading: false}), 1000)
		} catch(err) {
			this.setState({err});
			 // OR
			// this.setState({err: 'Something went wrong, please try again after some time.'});
		}
	}

	processRating = rating  => {
		const specialChar = rating.indexOf('/')
		const substr = rating.substring(0, specialChar)
		let newRating = '';	
		
		if(rating.indexOf('%') !== -1) {
			newRating = rating.substring(0, rating.indexOf('%'))
		} else if(substr.indexOf('.') === -1) {
			newRating = substr;
		} else {
			newRating = (parseFloat(substr) * 10)
		}
		newRating = `${newRating}%`
		return (newRating.toString());
	}

	render () {
		if(this.state.err !== '') {
			alert(this.state.err);
			return null	
		}
	
		if(this.state.Loading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large"/>
				</View>
			)
		}else{
			return (
				<View style={styles.container}>
					<ScrollView> 
						<View>
							<Image
								source={{uri: `${this.state.Poster} ? ${this.state.Poster} : './assets/placeholder.png'`}}
								style={styles.image}
							/>
						</View>
						<Text style={styles.title}>{this.state.Title}</Text>
						<Text style={styles.greyText}>{`~${this.state.Type}`}</Text>
						<Text style={{margin: 10}}>Year: {this.state.Year}</Text>
						<Text style={styles.body}>{this.state.Plot}</Text>
						{this.state.Ratings.map((rating, index) => {
							return (
								<View key={index} style={{marginBottom: 10}}>
									<Text style={styles.ratingSource}>{rating.Source}</Text>
									<View style={styles.rating}>
										<Text style={[styles.ratingValue, {width: this.processRating(rating.Value)} ]}>{rating.Value}</Text>
									</View>
								</View>
							)
						})}
					</ScrollView>
				</View>
			)
		}
	}
}
