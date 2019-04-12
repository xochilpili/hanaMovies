"use strict"

const conn = $.hdb.getConnection();
const query = `select SESSION_CONTEXT('XS_CLIENT') from DUMMY;`;
const rs = conn.executeQuery(query);

$.response.setBody(JSON.stringify(rs));
$.response.contentType = 'application/json';
$.response.status = $.net.http.OK;
