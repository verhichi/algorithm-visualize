import Home from 'pages/Home'
import Sort from 'pages/Sort'
import { RouteType } from '.'

const routes: RouteType[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/sort',
    component: Sort,
  },
]

export default routes
