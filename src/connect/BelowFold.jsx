import { useEffect } from 'react'
import ServiceUniverse from './components/ServiceUniverse'
import CompanyIntroduction from './components/CompanyIntroduction'
import BrandPhilosophy from './components/BrandPhilosophy'
import PortfolioShowcase from './components/PortfolioShowcase'
import WhyArtisticDuckk from './components/WhyArtisticDuckk'
import ProjectEnquiry from './components/ProjectEnquiry'
import CompanyContact from './components/CompanyContact'

/** Visitor journey after the intro: services → about → philosophy → work → why → enquiry → contact. */
export default function BelowFold() {
  // honour a deep link (e.g. /connect#contact) once the lazily loaded sections exist
  useEffect(() => {
    const { hash } = window.location
    if (hash && hash !== '#home') document.querySelector(hash)?.scrollIntoView()
  }, [])

  return (
    <>
      <ServiceUniverse />
      <CompanyIntroduction />
      <BrandPhilosophy />
      <PortfolioShowcase />
      <WhyArtisticDuckk />
      <ProjectEnquiry />
      <CompanyContact />
    </>
  )
}
