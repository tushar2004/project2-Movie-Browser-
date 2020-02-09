import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, FlatList } from 'react-native'

const styles = StyleSheet.create({
	movie: {
		borderWidth:1,
		borderColor: 'grey',
		borderRadius: 4,
		margin: 2,
		marginBottom: 10,
		marginTop: 10,
		padding: 10,
		flexDirection: 'row'
	},

	title: {
		fontSize: 16,
		textAlign: 'justify'
	},

	year: {
		color: 'grey',
	},
	
	container: {
		flex: 1
	},

	image: {
		width: 90,
		height: 70,	
		marginRight: 10
	}
})

const Movie = props => {
	//<Text>{`(${props.Type})`}</Text>
	return (
		<TouchableOpacity style={styles.movie} onPress={() => props.onMovieSelect(props.imdbID, props.Title)} >
			<Image
				source={{uri: props.Poster}}
				style={styles.image}
			/>
			<Text style={styles.container}>
				<Text style={styles.title}>{props.Title}{'\n'}</Text>
				<Text style={styles.year}>{`~${props.Type}`}{'\n'}</Text>
				<Text style={styles.year}>{`~${props.Year}`}</Text>
			</Text>
		</TouchableOpacity>
	)
}

export default Movie
