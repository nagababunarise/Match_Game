import './index.css'

const TabItem = props => {
  const {tabDetails, clickTab} = props
  const {tabId, displayText} = tabDetails

  const onClickTabId = () => {
    clickTab(tabId)
  }

  return (
    <li className="tab-list">
      <button className="button" type="button" onClick={onClickTabId}>
        {displayText}
      </button>
    </li>
  )
}
export default TabItem
