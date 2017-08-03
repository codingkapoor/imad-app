var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
      title: 'Article One | Shivam Kapoor',
      heading: 'Article One',
      date: 'Aug 3, 2017',
      content: `
	<p>This is content from article one. Paragraph I.</p>
	<p>This is content from article one. Paragraph II.</p>
	`
    },
    'article-two': {
      title: 'Article Two | Shivam Kapoor',
      heading: 'Article Two',
      date: 'Aug 14, 2017',
      content: `
	<p>This is content from article two. Paragraph I.</p>
	<p>This is content from article two. Paragraph II.</p>
	`
    }
};

function createArticleTemplate(data) {
  var title = data.title;
  var heading = data.heading;
  var date = data.date;
  var content = data.content;

  var articleTemplate =	`
    <html>
      <head>
	<title>${title}</title>
	<meta name="viewport" content="width-device-width, initial-scale=1"/>
	<link href="/ui/style.css" rel="stylesheet"/>
      </head>
      <body>
	<div class="container">
	  <div><a href="/">Home</a></div>
	  <hr/>
	  <h3>${heading}</h3>
	  <div>${date}</div>
	  <div>${content}</div>
	</div>
      </body>
    </html>
    `;

    return articleTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  Res.send(createArticleTemplate(articles[articleName]))
});

// app.get('/article-two', function (req, res) {
//   res.send(createArticleTemplate(articles[article-two]))
// });

app.get('/text', function (req, res) {
  res.send('This is text message.');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8081;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
