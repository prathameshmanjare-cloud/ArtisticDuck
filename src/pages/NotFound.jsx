import { Button, PageHero, Seo } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <PageHero eyebrow="404" title="This duck *flew off.*" lede="The page you’re looking for doesn’t exist, or it has moved.">
        <div className="row-gap">
          <Button to="/">Back home</Button>
          <Button to="/contact" variant="light">Contact us</Button>
        </div>
      </PageHero>
    </>
  )
}
