namespace dhana;

type shortString: String(180);
type longString: String(255);
type int: Integer;
type decimal: Decimal(3,2);

//@cds.persistence.exists
entity Movies{
	key MOVIEID: Integer;
	ratings: association to many Ratings on ratings.MOVIEID = MOVIEID;
	/*links: association[1] to Links on links.movieId = movieId;*/
	TITLE: longString;
	GENRES: longString;
}

//@cds.persistence.exists
entity Ratings{
	key USERID: Integer;
	key MOVIEID: Integer;
	/*e: Association[1] to Movies on e.MOVIEID = MOVIEID;*/
	RATING: Decimal(3,2);
	TIMESTAMP: Integer;
}

//@cds.persistence.exists
entity Tags{
	key USERID: Integer;
	key MOVIEID: Integer;
	key TAG: shortString;
	TIMESTAMP: Integer;
}

//@cds.persistence.exists
entity Links{
	key MOVIEID: Integer;
	/*MHeader: association[1] to Movies on MHeader.movieId = movieId;*/
	IMDBID:Integer;
	TMDBID: Integer;
}

@cds.persistence.exists
entity MovieRates{
	key MOVIEID: Integer;
	TITLE: longString;
	USERCOUNT: int;
	AVGRATES: decimal;
	ratings: association to many Ratings on ratings.MOVIEID = MOVIEID;
};

/*define view MovieLinksView as
	select from Links{
		movieId,
		MHeader.title,
		MHeader.genres,
		imdbId,
		tmdbId
	};


define view MovieSample as select from Movies{
	key MOVIEID,
	TITLE,
	count(ratings.USERID) as totalUsers: int,
	avg(ratings.RATING) as avgRating: decimal,
	ratings
} group by MOVIEID, TITLE;

define view MovieRatingsView as{ 
	select from Ratings{
		key MOVIEID,
		e.TITLE as title,
		count(USERID) as totalUsers : int,
		avg(RATING) as AVGRating : decimal
	} group by MOVIEID, e.TITLE; */