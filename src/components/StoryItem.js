import React from 'react'
import axios from 'axios'
import '../../src/story.css'



// this is the component for 1 story item in the lsit on the homepage
export default class StoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      story: 'loading',
     
    }
  }

  componentDidMount() {
    let _this = this;
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.storyId}.json`)
      .then(res => {
        console.log(res);
        _this.setState({
          // this sets the ONE found story
          story: res.data
        })
      })
  }
  render() {
    console.log(this.state.stories);
    return (
      this.state.stories === 'loading' ?
        <div>loading</div>
        :
        <div>

          <article className="container story-item">
            <a className="story-item-anchor" href={`/stories/${this.props.storyId}`}>
              {this.state.story.title}
            </a>

            <p>created by: {this.state.story.by}</p>
            <p>Score: {this.state.story.score}</p>

          </article >
        </div>
    )
  }

}