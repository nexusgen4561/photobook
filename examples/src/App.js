import React from 'react'
import './App.css'
import OrgChart from './components/reactorgchart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { tree } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'
import DepartmentPage from './pages/DepartmentPage'
import Navbar from './components/Navbar'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  getChild = (id) => {
    return console.log('no children')
  }

  getParent = (d) => {
    return d
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = (config) => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  handleNodeClick = (node) => {
    this.props.history.push(`/department/${node.id}`)
  }

  render() {
    const { tree } = this.state

    return (
      <Router basename="/react-org-chart">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <React.Fragment>
              <h1 className="org-chart-title">
                JGC Philippines, Inc. Organizational Chart
              </h1>{' '}
              {/* Add title here */}
              <OrgChart
                tree={tree}
                onConfigChange={(config) => {
                  this.handleOnChangeConfig(config)
                }}
                loadConfig={(d) => {
                  let configuration = this.handleLoadConfig(d)
                  if (configuration) {
                    return configuration
                  }
                }}
                loadImage={(d) => {
                  return Promise.resolve(avatarPersonnel)
                }}
                loadParent={(d) => {
                  const parentData = this.getParent(d)
                  return parentData
                }}
                loadChildren={(d) => {
                  const childrenData = this.getChild(d.id)
                  return childrenData
                }}
                onClickNode={this.handleNodeClick}
              />
            </React.Fragment>
          </Route>
          <Route path="/department/:id" component={DepartmentPage} />
        </Switch>
      </Router>
    )
  }
}
