let Parser = require("rss-parser");
let parser = new Parser();

(async () => {

	try {
		let feed = await parser.parseURL("https://ethresear.ch/c/plasma.rss");
		console.log(feed.title);

		feed.items.forEach(item => {
			console.log(item.title);
			console.log(item.link + "\n");
		});
	} catch (err) {
		console.error("err", err);
	}

})();