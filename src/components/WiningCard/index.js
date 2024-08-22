const WiningCard = props => {
  const {score, reset} = props

  const onReset = () => {
    reset()
  }

  return (
    <div>
      <h1>Your Score</h1>
      <p>{score}</p>
      <p>Well Try</p>
      <div>
        <button type="button" onClick={onReset}>
          Retry
        </button>
      </div>
    </div>
  )
}

export default WiningCard
