//namespace dhana;

/*type longString: String(255);
type shortString: String(180);

@cds.persistence.exists

entity dhana.Movies{
	key MOVIEID: Integer;
	TITLE: longString;
	GENRES: longString;
};*/

/*@cds.persistence.exists
entity Ratings{
	key userId: Integer;
	key movieId: Integer;
	rating: Decimal(13,3);
	timestamp: Integer;
}

@cds.persistence.exists
entity Tags{
	key userId: Integer;
	key movieId: Integer;
	key tag: shortString;
	timestamp: Integer;
}

@cds.persistence.exists
entity Links{
	key movieId: Integer;
	MHeader: association[1] to Movies on MHeader.movieId = movieId;
	imdbId:Integer;
	tmdbId: Integer;
}

@cds.persistence.exists
entity MovieLinks{
	key movieId: Integer;
	title: String(255);
	imdbId: Integer;
	tmdbId: Integer;
}

@cds.persistence.exists
entity MovieRates{
	key movieId: Integer;
	title: longString;
	UserCount: Integer;
	AVGRates: Decimal(13,3);
}
*/