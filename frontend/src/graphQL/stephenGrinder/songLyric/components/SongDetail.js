import React, { Component } from 'react';
// import fetchSong from '../queries/fetchSong';
// import LyricCreate from './LyricCreate';
// import LyricList from './LyricList';

class SongDetail extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("id", this.props);

    // const getSongQuery = {
    //   query: `{
    //     song(id: ${this.props.params.id}){
    //       title
    //     }
    //   }`
    // }
    // let getSong = fetch("http://localhost:8080/graphql", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(getSongQuery)
    // }).then(resp => resp.json());
    // //630e3384e9412b80a36fefe1
    // console.log("getSong", getSong);

    return (
      <div>
        {/* <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} /> */}
      </div>
    );
  }
}

//withRouter
export default SongDetail;
