// MUI Imports
import Box from '@mui/material/Box'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import AboutUs from './AboutUs'
import OpeningHours from './OpeningHours'
import Announcement from './Announcement'
import SpecialOffers from './SpecialOffers'
import Delivery from './Delivery'
import Gallery from './Gallery'
import Jobs from './Jobs'
import Certificates from './Certificates'
import Awards from './Awards'
import Videos from './Videos'
import Articles from './Articles'
import Portals from './Portals'
import SocialMedia from './SocialMedia'
import ContactUs from './ContactUs'

// Styles Imports
import '../../style.module.css'

// Helper Imports
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'

const HomeView = () => {
  // Hooks
  const sections = useSelector((state: any) => state.website.website.sections)

  function getSection(section: any) {
    switch (section?.type) {
      case SECTION_NAME.PROMOTION:
        return <SpecialOffers />;
      case SECTION_NAME.ABOUT:
        return <AboutUs section={section} />;
      case SECTION_NAME.OPENING_HOURS:
        return <OpeningHours />;
      case SECTION_NAME.ANNOUNCEMENT:
        return <Announcement section={section} />;
      case SECTION_NAME.DELIVERY_ZONE:
        return <Delivery section={section} />;
      case SECTION_NAME.GALLERY:
        return <Gallery section={section} />;
      case SECTION_NAME.JOBS:
        return <Jobs section={section} />;
      case SECTION_NAME.AWARDS:
        return <Awards section={section} />;
      case SECTION_NAME.PORTALS:
        return <Portals section={section} />;
      case SECTION_NAME.SOCIAL_MEDIA:
        return <SocialMedia section={section} />;
      case SECTION_NAME.CERTIFICATES:
        return <Certificates section={section} />;
      case SECTION_NAME.VIDEO:
        return <Videos section={section} />;
      case SECTION_NAME.ARTICLE:
        return <Articles section={section} />;
      default:
        return null;
    }
  }


  return (
    <>
      {Array.isArray(sections) &&
        sections?.length > 0 &&
        sections?.map((section: any, index: number) => {
          return <Box key={index}>{section?.isActive && getSection(section)}</Box>
        })}
      <ContactUs />
    </>
  )
}

export default HomeView
