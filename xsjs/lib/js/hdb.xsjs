"use strict"

const conn = $.hdb.getConnection();
const query = `SELECT TOP 1000 "movieId", "title", "genres", "UserCount", "AVGRating" FROM "COMPLETEEXERCISE_COMPLETEEXERCISE_HDI_CONTAINER_1"."MovieRatings" GROUP BY "movieId", "title", "genres", "UserCount","AVGRating";`;
const rs = conn.executeQuery(query);
$.response.setBody(JSON.stringify(rs));
$.response.contentType = 'application/json';
$.response.status = $.net.http.OK;
