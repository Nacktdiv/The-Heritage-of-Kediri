import { createBrowserRouter } from "react-router";
import Home from './Home.tsx';
import Destination from './Destination.tsx';
import Event from "./Event.tsx";
import EventDetailPage from "./components/Event/dynamicArticle.tsx";
import Plan from './Plan.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  }, 
  {
    path: '/destination',
    Component: Destination,
  },
  {
    path: '/event',
    Component: Event,
  }, 
  {
    path: '/event/:id',
    Component: EventDetailPage
  }, 
  {
    path: '/plan',
    Component: Plan
  }
]);