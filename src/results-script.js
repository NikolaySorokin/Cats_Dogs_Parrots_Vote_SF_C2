$(document).ready(function() {

const catsProgress = $("#cats-progress");
const dogsProgress = $("#dogs-progress");
const parrotsProgress = $("#parrots-progress");
const catsBar = $(".cats-bar");
const dogsBar = $(".dogs-bar");
const parrotsBar = $(".parrots-bar");

const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
});

const baseUrl = new URL("https://sf-pyw.mosyag.in");
const resultsUrl = new URL("/sse/vote/stats", baseUrl);
const catsUrl = new URL("/sse/vote/cats", baseUrl);
const dogsUrl = new URL("/sse/vote/dogs", baseUrl);
const parrotsURL = new URL("/sse/vote/parrots", baseUrl);

const es = new EventSource(resultsUrl, header);

es.onerror = error => {
    es.readyState ? catsBar.text("Some error") : null;
}
es.onmessage = message => {
	console.log($.parseJSON(message.data));
	let votes = $.parseJSON(message.data);
	let catsVotes = votes.cats;
	let dogsVotes = votes.dogs;
	let parrotsVotes = votes.parrots;
	maxVotes = Math.max(catsVotes, dogsVotes, parrotsVotes);
	catsBar.text(catsVotes);
	dogsBar.text(dogsVotes);
	parrotsBar.text(parrotsVotes);
	catsProgress.css('width', `${parseInt(catsVotes)/parseInt(maxVotes)*90}%`);
	dogsProgress.css('width', `${parseInt(dogsVotes)/parseInt(maxVotes)*90}%`);
	parrotsProgress.css('width', `${parseInt(parrotsVotes)/parseInt(maxVotes)*90}%`);
	es.close();
}


});