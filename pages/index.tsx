import Shops from "../components/Shops"
import ShopsShelf from "../components/ShopsShelf"

const Home = () => {
  return (
    <div className="flex space-x-2 h-content-height pb-1">
      <Shops />
      <ShopsShelf />
    </div>
  )
}

export default Home