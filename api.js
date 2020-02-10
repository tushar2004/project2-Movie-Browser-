const apiKey = 'API_KEY'

export const searchMovies = async (searchYear, searchContentType, searchKeywords, page=1) => {
	const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchKeywords}&page=${page}&y=${searchYear}&type=${searchContentType}`;
	const response = await fetch(url);
	const result = await response.json();
	if(result.Response === 'True') {
		return result;
	}
	/*
	if(result.Search !== undefined) {
		const data = result.Search.map(movie => {
			console.log(movie);
		});
		return result;
	}
	*/
}

export const searchMovie = async (imdbID) => {
	const plot = 'short';
	const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=${plot}`;
	const response = await fetch(url);
	const result = await response.json();
	if(result.Response === 'True') {
		console.log(result);
		return result;
	}
	
	const err = result.Error;
	throw new Error(err);
}
