import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailImage from '../ThumbnailImage'
import WiningCard from '../WiningCard'

import './index.css'

class MatchGame extends Component {
  state = {
    imageMatch: 0,
    score: 0,
    timer: 60,
    activeTabId: 'FRUIT',
    isTimerRunning: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    this.onClearInterval()
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      this.onClearInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  onClearInterval = () => {
    clearInterval(this.timerId)
  }

  getActiveTabList = category => {
    const {imagesList} = this.props
    return imagesList.filter(eachImage => eachImage.category === category)
  }

  checkMatchImage = checkId => {
    const {imageMatch} = this.state
    const {imagesList} = this.props
    const {id} = imagesList[imageMatch]

    const randomIndex = Math.floor(Math.random() * imagesList.length)

    if (checkId === id) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        imageMatch: randomIndex,
      }))
    } else {
      this.onClearInterval()
      this.setState({
        isTimerRunning: false,
      })
    }
  }

  clickTab = tabId => {
    this.setState({
      activeTabId: tabId,
    })
  }

  reset = () => {
    this.setState({
      score: 0,
      timer: 60,
      isTimerRunning: true,
      imageMatch: 0,
    })
    this.timerId = setInterval(this.tick, 1000)
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {imageMatch, score, timer, activeTabId, isTimerRunning} = this.state

    const {imageUrl} = imagesList[imageMatch]
    const filteredList = this.getActiveTabList(activeTabId)
    return (
      <div className="bg-container">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website-logo"
            className="logo-image"
          />
          <div className="logo-timer-card">
            <p className="score">
              Score<span className="span">{score}</span>
            </p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-image"
            />
            <p className="timer-sec">{timer} sec</p>
          </div>
        </nav>
        <div>
          {isTimerRunning && (
            <div>
              <img src={imageUrl} alt="mainImage" />
              <ul>
                {tabsList.map(eachTab => (
                  <TabItem
                    key={eachTab.tabId}
                    tabDetails={eachTab}
                    clickTab={this.clickTab}
                  />
                ))}
              </ul>
              <ul>
                {filteredList.map(eachItem => (
                  <ThumbnailImage
                    key={eachItem.id}
                    thumbnailDetails={eachItem}
                    checkMatchImage={this.checkMatchImage}
                  />
                ))}
              </ul>
            </div>
          )}
          {!isTimerRunning && <WiningCard score={score} reset={this.reset} />}
        </div>
      </div>
    )
  }
}

export default MatchGame
