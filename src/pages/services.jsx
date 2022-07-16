import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import Service from '../components/services/services2'
import InnerHero from '../components/hero/InnerHero'
import Cta from '../components/cta/cta1'

const Services = () => {
  return (
    <Layout>
      <Seo
        title="Services"
        description="We offer a wide variety of landscaping and softscaping services in Kemptville and North Grenville"
      />
      <InnerHero pageName="Services" />
      <Service />
      <Cta/>
    </Layout>
  )
}

export default Services
