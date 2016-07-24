/*
Composant pour afficher la date
*/
var Auj = React.createClass({
  setTime: function(){
    var currentdate = new Date();
    var jour = currentdate.getDate();
    var mois = currentdate.getMonth();
    var annee = currentdate.getFullYear();

    this.setState({
        jour: jour,
        mois: mois,
        annee: annee
      });
  },
  componentWillMount: function(){
    this.setTime();
  },
  render: function() {
    return(
        <span>{this.state.jour}/{this.state.mois}/{this.state.annee}</span>
    )
  }
});

/*
Composant CommentList
*/
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

/*
Composant CommentForm
*/
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      /*<form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>*/
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputName2" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputEmail2" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    );
  }
});

/*
Composant Comment
*/
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
          {this.props.author} : &ldquo; {this.props.children} &rdquo;
      </div>
    );
  }
});

/*
Composant CommentBox
*/
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1><Auj /> 2min shoutbox</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

/*
AFFICHAGE
*/
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
