using dhana.Movies as MoviesTable from '../db/data-model';
using dhana.Ratings as RatingsTable from '../db/data-model';
using dhana.MovieRates as MovieRatesView from '../db/data-model'; 
using dhana.Jack_List as JackView from '../db/data-model';

//using dhana.MovieRatesBis as MovieRatesView from '../db/data-model';
service CatalogService {

	entity Movies @(
		title: '{i18n>moviesService}',
		Capabilities:{
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on MoviesTable;
	
	entity MovieRates @(
		title: '{i18n>movieRatesService}',
		Capabilities:{
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	)as projection on MovieRatesView;
	
	entity JackList @(
		title: '{i18n>jackService}',
		Capabilities:{
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on JackView;
	
	/*extend MovieRatesView with{
		ratings: association[0..*] to Ratings on ratings.MOVIEID = MOVIEID;
	}
	
	entity MovieRates @(
		title: '{i18n>movieRatesService}',
		Capabilities:{
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on MovieRatesView;*/
	
	entity Ratings @(
		title: '{i18n>ratingsService}',
		Capabilities:{
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on RatingsTable;
	
	
}

