import React, { Component } from 'react';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    const likeLyricQuery = {
      query: `
      mutation {
        likeLyric(id: ${"630e3699ae09a805543d00f5"}) {
          likes
        }
      }
    `}
    let likeLyric = fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(likeLyricQuery)
    }).then(resp => {
      resp.json();
      // window.history.push('/')
    });
    console.log("likeLyric", likeLyric);
    
    // return this.props.lyrics.map(({ id, content, likes }) => {
    //   return (
    //     <li key={id} className="collection-item">
    //       {content}
    //       <div className="vote-box">
    //         <i
    //           className="material-icons"
    //           onClick={() => this.onLike(id, likes)}
    //         >
    //           thumb_up
    //         </i>
    //         {likes}
    //       </div>
    //     </li>
    //   );
    // });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}



export default LyricList;
