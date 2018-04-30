import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import '../../src/story.css'

export default class Story extends React.Component {
  constructor(props) {
    super(props);

    //console.log(this.props);
    this.state = {

      story: 'loading',


    }

  }
  componentDidMount() {
    let _this = this;
    // props are never inside state
    // state is never inside props
    // this.props
    // this.state
    // both props and state are objects
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.storyId}.json`)
      .then(res => {

        console.log(res);

        _this.setState({
          story: res.data
        });
      })

  }


  render() {
    return (
      this.state.story === 'loading'
        ?
        <div>Loading story</div>
        :
        <div className="container">
          <a className="story-anchor" href={`${this.state.story.url}`}>{this.state.story.title}</a>
          <p>by: {this.state.story.by}</p>

          <h3>Comments</h3>

          <div>{this.state.story.kids.map(commentId => {
            return <p key={commentId}><Comment commentId={commentId} /></p>

          })}
          </div>

          {/* <a href={`${this.state.story.url}`}> </a> */}

        </div>
    )
  }
}