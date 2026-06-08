import ScrollDrivenProgressDemo from '../components/demos/motion/ScrollDrivenProgressDemo'
import StartingStyleDialogDemo from '../components/demos/motion/StartingStyleDialogDemo'
import ViewTimelineRevealDemo from '../components/demos/motion/ViewTimelineRevealDemo'
import CategoryPage from './CategoryPage'

function MotionPage() {
  return (
    <CategoryPage
      categoryId="motion"
      demos={
        <>
          <StartingStyleDialogDemo />
          <ScrollDrivenProgressDemo />
          <ViewTimelineRevealDemo />
        </>
      }
    />
  )
}

export default MotionPage
