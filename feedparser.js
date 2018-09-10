const FeedParser = require("feedparser");
const request = require("request");

const feedreq = request("https://ethresear.ch/c/plasma.rss");
const feedparser = new FeedParser([]);

feedreq.on("error", function (error) {
	// handle any request errors
	console.error("feedreq.on error", error);
});

feedreq.on("response", function (feedres) {
	const stream = this; // `this` is `feedreq`, which is a stream

	if (feedres.statusCode !== 200) {
		console.log(feedres.statusCode);
		this.emit("error", new Error("Bad status code"));
	}
	else {
		stream.pipe(feedparser);
	}
});

feedparser.on("error", function (error) {
	// always handle errors
	console.error("feedparser.on error", error);
});

feedparser.on("readable", function () {
	// This is where the action is!
	const stream = this; // `this` is `feedparser`, which is a stream
	const meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance

	let item;
	while (item = stream.read()) {
		console.log(item);
	}
});