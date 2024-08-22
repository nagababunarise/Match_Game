import './index.css'

const ThumbnailImage = props => {
  const {ImageDetails, checkMatchImage} = props
  const {id, thumbnailUrl} = ImageDetails

  const onCheckImage = () => {
    checkMatchImage(id)
  }

  return (
    <li>
      <button type="button" onClick={onCheckImage}>
        <img src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ThumbnailImage
