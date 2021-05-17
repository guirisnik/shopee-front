import React from 'react'
import { Router } from '@reach/router'
import { Layout } from 'components/Layout'
import { MainSales } from 'components/MainSales'
import { SaleForm } from 'components/SaleForm'

const IndexPage = () => (
  <Layout>
    <Router>
      <MainSales path='/' />
      <SaleForm path='/sale/:saleId' />
      <SaleForm path='/sale' />
    </Router>
  </Layout>
)

export default IndexPage
