const catsBtn = $(".btn-cats");
const dogsBtn = $(".btn-dogs");
const parrotsBtn = $(".btn-parrots");
const voteBtns = $(".vote-btns");
const resultBtn = $(".result-btn");

const baseUrl = new URL("https://sf-pyw.mosyag.in");
const catsUrl = new URL("/sse/vote/cats", baseUrl);
const dogsUrl = new URL("/sse/vote/dogs", baseUrl);
const parrotsURL = new URL("/sse/vote/parrots", baseUrl);

function vote(eventObject) {
	voteBtns.css('display', 'none');
	resultBtn.css('visibility', 'visible');
	fetch(eventObject.data.url, {
		method: 'POST'
	})
	.then(function(response) {
		return response.json();
	}).then(function(response) {
		alert(response.message + "! Голос принят!");
	});
}

function init() {
	catsBtn.click({url: catsUrl}, vote);
	dogsBtn.click({url: dogsUrl}, vote);
	parrotsBtn.click({url: parrotsURL}, vote);
}

$(document).ready(init);