import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from 'router'
import Sidebar from './Sidebar'
import Body from './Body'

const pages = routes.map((route, idx) => <Route exact key={idx} {...route} />)

const Layout = () => (
  <Router>
    <Sidebar />
    <Body>
      <Switch>{pages}</Switch>
    </Body>
  </Router>
)

export default Layout
