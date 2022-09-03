import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongList extends Component {
  onSongDelete(id) {
    const mutation = {
      query: `mutation{
        deleteSong(id: ${id}) {
          id
        }
      }`
    };
    const deleteSong = fetch("http://localhost:8080/graphql", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mutation)
    }).then(resp => resp.json());
    console.log("deleteSong", deleteSong);
  }

  renderSongs() {
    const songsQuery = {
      query: `{
        songs{
          title
        }
      }`
    }
    let getSongs = fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(songsQuery)
    }).then(resp => resp.json());
    console.log("getSongs", getSongs);
    // return getSongs.data.songs.map(({ title }, i) => {
    //   return (
    //     <li key={i} className="collection-item">
    //       {/* <Link to={`/songs/${id}`}> */}
    //       {title}
    //       {/* </Link> */}
    //       {/* <i onClick={() => this.onSongDelete(id)}> delete </i> */}
    //     </li>
    //   );
    // });
  }

  render() {

    return (
      <div>
        <ul >
          {this.renderSongs()}
        </ul>
        <Link to="/songs/new">
          <i >add</i>
        </Link>
      </div>
    );
  }
}

export default SongList;
