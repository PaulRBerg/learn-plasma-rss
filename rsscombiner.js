const _ = require("lodash");
const RSSCombiner = require("rss-combiner");
const feeds = require("./feeds");


const feedConfig = {
	feeds: _.map([].concat(
		feeds.etheresearch,
		feeds.karldottech,
		feeds.medium,
		feeds.medium
	)),
	size: 20
};

// Promise usage
RSSCombiner(feedConfig)
	.then(combinedFeed => {
		const xml = combinedFeed.xml();
		console.log("xml", xml);
	})
	.catch(err => {
		console.error("err", err);
	});