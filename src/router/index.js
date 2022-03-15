import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PropertyList from '@/views/property/PropertyList';
import WantedListing from '@/views/Wanted/WantedListing';
import WantedDetail from '@/views/Wanted/WantedDetail';
import WantedListingCreate from '@/views/Wanted/WantedListingCreate';
import WantedEdit from '@/views/Wanted/WantedEdit';
import WantedCreate from '@/views/Wanted/WantedCreate';
import PropertyDetail from '@/views/property/PropertyDetail';

import PropertyImage from '@/views/property/PropertyImage';

import Agent from '@/views/agent/Agent';
import AgentDetail from '@/views/agent/AgentDetail';
import Contact from '@/views/contact/Contact';
import Suggestion from '@/views/contact/Suggestion';

import Auth from '@/views/auth/Auth';
import Forgotpassword from '@/views/auth/Forgotpassword';

import Terms from '@/views/privacy/Terms';
import HomeLoan from '@/views/HomeLoan/HomeLoan';
import PropertyGuide from '@/views/PropertyGuide/PropertyGuide';
import GuideDetail from '@/views/PropertyGuide/GuideDetail';
import News from '@/views/news/News';
import NewsDetail from '@/views/news/NewsDetail';
import Testimonials from '@/views/testimonials/Testimonials';
import Books from '@/views/books/Books';
import BookDetail from '@/views/books/BookDetail';
import FrontDashboard from '@/views/frondend/FrontDashboard';
import AgentDashboard from '@/views/dashboard/AgentDashboard';
import Adcreate from '@/views/uploadads/Adcreate';

import Adedit from '@/views/uploadads/Adedit';

import Uploadphoto from '@/views/uploadads/Uploadphoto';
import MyProperty from '@/views/myproperty/MyProperty';

import MyPropertyList from '@/views/myproperty/MyPropertyList';
import FuaturedMyPropertyList from '@/views/myproperty/FuaturedMyPropertyList';

import SoldOutProperty from '@/views/myproperty/SoldOutProperty';

import MyPropertyDetail from '@/views/myproperty/MyPropertyDetail';
import FeaturedProperty from '@/views/featured/FeaturedProperty';
import RefreshProperty from '@/views/refresh/RefreshProperty';

import ComingSoon from '@/views/ComingSoon/ComingSoon';
import MyWantedList from '@/views/MyWantedList/MyWantedList';
import MyWantedListDetail from '@/views/MyWantedList/MyWantedListDetail';
import Favorites from '@/views/Favorites/Favorites';
import Messages from '@/views/Messages/Messages';
import MessageDetail from '@/views/Messages/MessageDetail';
import Appointment from '@/views/Appointment/Appointment';
import ChangePassword from '@/views/ChangePassword/ChangePassword';
import MyAccount from '@/views/auth/MyAccount';
import MyProfile from '@/views/auth/MyProfile';
import MyLogo from '@/views/auth/MyLogo';
import AppVersion from '@/views/AppVersion/AppVersion';
import Notification from '@/views/Notification/Notification';


import SearchForm from '@/views/SearchForm/SearchForm';
import SearchResult from '@/views/SearchResult/SearchResult';

import History from '@/views/Package/History';
import PackagePlan from '@/views/Package/PackagePlan';
import OrderNow from '@/views/Package/OrderNow';

import PropertyByCompany from '@/views/propertybycompany/PropertyByCompany';




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/property/:propertyType',
    name: 'property',
    component: PropertyList
  },

  {
    path: '/propertybycompany/:propertyType/userId/:userId',
    name: 'PropertyByCompany',
    component: PropertyByCompany
  },

  {
    path: '/wanted_listing/:wanted_type',
    name: 'WantedListing',
    component: WantedListing
  },

  {
    path: "/wanted_detail/:id",
    name: 'WantedDetail',
    component: WantedDetail
  },

  {
    path: '/wantedlistingcreate',
    name: 'WantedListingCreate',
    component: WantedListingCreate
  },

  {
    path: '/wantedcreate/:propertyType',
    name: 'WantedCreate',
    component: WantedCreate
  },

  {
    path: '/wantededit/:id',
    name: 'WantedEdit',
    component: WantedEdit
  },


  {
    path: "/property_detail/:id",
    name: 'propertyDetail',
    component: PropertyDetail
  },


  {
    path: "/property_image/:id",
    name: 'PropertyImage',
    component: PropertyImage
  },




  {
    path: '/agent/:companytype',
    name: 'agent',
    component: Agent
  },

  {
    path: '/agent_detail/:id',
    name: 'agentDetail',
    component: AgentDetail
  },

  {
    path: '/home-loan',
    name: 'HomeLoan',
    component: HomeLoan
  },

  {
    path: '/property-guide',
    name: 'PropertyGuide',
    component: PropertyGuide
  },

  {
    path: '/detail/:id',
    name: 'GuideDetail',
    component: GuideDetail
  },


  {
    path: '/news',
    name: 'News',
    component: News
  },

  {
    path: '/detail/:id',
    name: 'NewsDetail',
    component: NewsDetail
  },


  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials
  },


  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },


  {
    path: '/suggestion',
    name: 'Suggestion',
    component: Suggestion
  },

  {
    path: '/books',
    name: 'Books',
    component: Books
  },

  {
    path: '/detail/:id',
    name: 'BookDetail',
    component: BookDetail
  },


  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },

  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },

  {
    path: '/forgotpassword',
    name: 'Forgotpassword',
    component: Forgotpassword
  },

  {
    path: '/frontdashboard',
    name: 'FrontDashboard',
    component: FrontDashboard
  },


  {
    path: '/dashboard',
    name: 'AgentDashboard',
    component: AgentDashboard
  },

  {
    path: '/adcreated/:propertyType',
    name: 'Adcreate',
    component: Adcreate
  },


  {
    path: '/adedit/:id',
    name: 'Adedit',
    component: Adedit
  },


  {
    path: '/uploadphoto/:propertyId',
    name: 'Uploadphoto',
    component: Uploadphoto
  },

  {
    path: '/myproperty',
    name: 'MyProperty',
    component: MyProperty
  },

  {
    path: '/mylogo',
    name: 'MyLogo',
    component: MyLogo
  },

  {
    path: '/mypropertylist/:propertyType',
    name: 'MyPropertyList',
    component: MyPropertyList
  },


  {
    path: '/fuaturedmypropertylist/:propertyType',
    name: 'FuaturedMyPropertyList',
    component: FuaturedMyPropertyList
  },

  {
    path: '/soldoutproperty/:propertyType',
    name: 'SoldOutProperty',
    component: SoldOutProperty
  },

  {
    path: "/my_property_detail/:id",
    name: 'MyPropertyDetail',
    component: MyPropertyDetail
  },


  {
    path: "/featured_property/:id",
    name: 'FeaturedProperty',
    component: FeaturedProperty
  },

  {
    path: "/refresh_property/:id",
    name: 'RefreshProperty',
    component: RefreshProperty
  },



  {
    path: '/coming',
    name: 'ComingSoon',
    component: ComingSoon
  },


  {
    path: '/mywantedlist',
    name: 'MyWantedList',
    component: MyWantedList
  },


  {
    path: "/mywantedlistdetail/:id",
    name: 'MyWantedListDetail',
    component: MyWantedListDetail
  },

  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },

  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },

  {
    path: "/message_detail/:id",
    name: 'MessageDetail',
    component: MessageDetail
  },


  {
    path: '/appointment',
    name: 'Appointment',
    component: Appointment
  },

  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword
  },

  {
    path: '/myaccount',
    name: 'MyAccount',
    component: MyAccount
  },

  {
    path: '/mypprofile/:id',
    name: 'MyProfile',
    component: MyProfile
  },


  {
    path: '/appversion',
    name: 'AppVersion',
    component: AppVersion
  },

  {
    path: '/notification/:id',
    name: 'Notification',
    component: Notification
  },

  {
    path: '/history',
    name: 'History',
    component: History
  },


  {
    path: '/searchform',
    name: 'SearchForm',
    component: SearchForm
  },


  {
    path: '/searchresult',
    component: SearchResult,
    props(route) {
      return route.query || {}
    }
  },


  {
    path: '/packageplan',
    name: 'PackagePlan',
    component: PackagePlan
  },

  {
    path: '/ordernow/:id',
    name: 'OrderNow',
    component: OrderNow
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'AgentDashboard' || to.name === 'Adcreate' || to.name === 'MyProperty' || to.name === 'MyPropertyList' || to.name === 'WantedCreate' || to.name === 'MyWantedList' || to.name === 'MyWantedListDetail' || to.name === 'Favorites' || to.name === 'Messages' || to.name === 'MessageDetail' || to.name === 'Appointment' || to.name === 'ChangePassword' || to.name === 'MyAccount' || to.name === 'MyProfile' || to.name === 'History' || to.name === 'PackagePlan') {
    let auth = localStorage.getItem('tnwauth');
    if (auth) {
      next()
    } else {
      next('/auth')
    }
  } else {
    next();
  }
})

export default router
