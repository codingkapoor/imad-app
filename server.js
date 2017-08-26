var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'mailtoshivamk',
    database: 'mailtoshivamk',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

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
	  <div>${date.toDateString()}</div>
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

var names = [];
app.get('/addName/:name', function (req, res) {
  var name = req.params.name;
  names.push(name);
  
  res.send(JSON.stringify(names));
});

app.get('/addName', function (req, res) {
  var name = req.query.name;
  names.push(name);
  
  res.send(JSON.stringify(names));
});

app.get('/articles/article-two', function (req, res) {
  res.send(createArticleTemplate(articles[article-two]))
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1
  res.send(counter.toString())
});

app.get('/articles/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  
  pool.query("SELECT * FROM article WHERE title = '" + articleName + "'", function(err, result) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0) {
              res.status(404).send('Article not found');
          } else {
              var articleData = result.rows[0];
              res.send(createArticleTemplate(articleData));
          }
      }
  });
});

app.get('/text', function (req, res) {
  res.send('This is text message.');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
