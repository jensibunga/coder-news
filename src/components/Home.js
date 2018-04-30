import React, { Component } from "react";


import axios from "axios";
// import StoryItem from './StoryItem'
import '../story-item.css'

function sortByScore(storyA, storyB) {
  if (storyA.score < storyB.score) {
    return 1;
  }
  if (storyA.score > storyB.score) {
    return -1;
  }
  // a must be equal to b
  return 0;
}

function sortByCommentCount(storyA, storyB){
  if (storyA.kids.length < storyB.kids.length){
    return 1;
  }
  if (storyB.kids.length > storyA.kids.length){
    return -1
  }
  return 0;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: "loading"
    };
  }

  componentDidMount() {
    let _this = this;

    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => {
        //console.log(res.data.slice(0, 10));
        let firstTenStories = res.data.slice(0, 10)
        let stories = [];

        firstTenStories.forEach(storyId => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then(response => {
              stories.push(response.data)
              _this.setState({
                topStories: stories
              });
            })
        });

        
      });
  }

  render() {
    return (
      <div >

        <div className="container">


          {this.state.topStories === "loading" ?
            <div>loading</div>
            :
            <div>
              <h1>Coder Hut</h1>
              <ul>
                {this.state.topStories.sort(sortByCommentCount).map(story => {
                  //console.log(story);
                  return <li className="list-group-item home-list" key={story.id}>
                    <article className="container story-item">
                      <a className="story-item-anchor" href={`/stories/${story.id}`}>
                        {story.title}
                      </a>

                      <p>created by: {story.by}</p>
                      <p>Score: {story.score}</p>
                      <p>Comment count: {story.kids.length}</p>

                    </article >
                  </li>
                })}

              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Home;
