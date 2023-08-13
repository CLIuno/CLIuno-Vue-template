import AdministratorView from '@/views/Management/Admin/AdministratorView.vue'
import DatabaseView from '@/views/pages/Database/DatabaseView.vue'
import AlertView from '@/views/pages/Alert/AlertView.vue'

export default [
  {
    path: 'administrator',
    name: 'administrator',
    component: AdministratorView,
    meta: {
      title: 'Administrator Page'
    }
  },
  {
    path: 'database',
    name: 'database',
    component: DatabaseView,
    meta: {
      title: 'Database Page'
    }
  },
  {
    path: 'training',
    name: 'training',
    component: () => import('@/views/pages/Training/TrainView.vue'),
    meta: {
      title: 'training Page'
    }
  },
  {
    path: 'alert',
    name: 'alert',
    component: AlertView,
    meta: {
      title: 'Alert Page'
    }
  }
]
