/* eslint-disable */
// Added views
import ListWorkers from "views/ListWorkers.js"
import CreateWorker from "views/CreateWorker.js"
import ListClients from "views/ListClients.js"
import CreateClient from "views/CreateClient.js"
import CreateCategory from "views/CreateCategory.js"

// Template views
// import Dashboard from "views/Dashboard.js";
// import Icons from "views/Icons.js";
// import Map from "views/Map.js";
// import Notifications from "views/Notifications.js";
// import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
// import UserProfile from "views/UserProfile.js";
import CreateTenant from "views/CreateTenat.js"


var routes = [  
  {
    path: "/list-workers",
    name: "List Workers",
    icon: "tim-icons icon-badge",
    component: ListWorkers,
    layout: "/admin"
  },
  {
    path: "/create-worker",
    name: "Create Worker",
    icon: "tim-icons icon-single-copy-04",
    component: CreateWorker,
    layout: "/admin"
  },
  {
    path: "/list-clients",
    name: "List Clients",
    icon: "tim-icons icon-bullet-list-67",
    component: ListClients,
    layout: "/admin"
  },
  {
    path: "/create-client",
    name: "Create Client",
    icon: "tim-icons icon-single-02",
    component: CreateClient,
    layout: "/admin"
  },
  {
    path: "/create-tenant",
    name: "Create Tenant",
    icon: "tim-icons icon-chart-pie-36",
    component: CreateTenant,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Create category",
    icon: "tim-icons icon-single-copy-04",
    component: CreateCategory,
    layout: "/admin"
  },


  // Template views
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",    
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/map",
  //   name: "Map",    
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",    
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",    
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",    
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // },  
];

export default routes;
