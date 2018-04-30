import React from 'react'
import axios from 'axios'

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: 'loading',
    }
  }
  componentDidMount() {
    let _this = this;
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.commentId}.json`)
      .then(res => {
        console.log(res);
        _this.setState(
          {
            comment: res.data,
          }
        )
      })
  }
  render() {
    return (
      <div className="conatiner">
        {this.state.comment === 'loading' ?
          <div>Loading</div>
          :
          <div className="container">
            {this.state.comment &&
              <div className="container">
                <ul>
                  <li className="list-group-item">
                    {this.state.comment.by}
                    {this.state.comment.text}
                  </li>
                </ul>
              </div>
            }
          </div>
        }


      </div>
    )
  }
}