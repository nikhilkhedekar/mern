import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("title", this.state.title);
    let addSongQuery = {
      query: `
        mutation{
          addSong(title: ${this.state.title}){
            title
          }
      }`
    }
    let addSong = fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addSongQuery)
    }).then(resp => {
      resp.json();
      // window.history.push('/')
    });
    console.log("addSong", addSong);
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
          <input type="submit" value="Add Song" />
        </form>
      </div>
    );
  }
}

export default SongCreate;
