import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar';
import facebookMetaTagsImage from '../../assets/images/FacebookMetaTags.png';
import twitterMetaTagsImage from '../../assets/images/TwitterMetaTags.png';
import linkedinMetaTagsImage from '../../assets/images/linkedinMetaTags.png';
import msApplicationMetaTagsImage from '../../assets/images/MSApplicationMetaTags.png';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>Fundraisingtoolbox</title>
        <meta property="og:locale" content="en_GB" />
        <meta name="description" content="Fundraisingtoolbox" />
        <meta name="author" content="Fundraisingtoolbox" />

        {/* Open Graph (OG) meta tags (Facebook) */}
        <meta property="og:title" content="Fundraisingtoolbox" />
        <meta property="og:description" content="Fundraisingtoolbox" />
        <meta property="og:image" content={facebookMetaTagsImage} />
        <meta property="og:image:alt" content="Fundraisingtoolbox" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fundraisingtoolbox" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:title" content="Fundraisingtoolbox" />
        <meta name="twitter:description" content="Fundraisingtoolbox" />
        <meta name="twitter:image" content={twitterMetaTagsImage} />
        <meta name="twitter:site" content="@debonne_" />
        <meta name="twitter:creator" content="@debonne_" />

        {/* Linkedin meta tags */}
        <meta name="linkedin:title" content="Fundraisingtoolbox" />
        <meta name="linkedin:description" content="Fundraisingtoolbox" />
        <meta name="linkedin:image" content={linkedinMetaTagsImage} />
        <meta name="linkedin:url" content={currentUrl} />

        {/* Other meta tags */}
        <link rel="canonical" href={currentUrl} />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name="theme-color" content="#FFF" />

        {/* Additional meta tags specific to Apple devices */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Fundraisingtoolbox" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Microsoft application tile */}
        <meta
          name="msapplication-TileImage"
          content={msApplicationMetaTagsImage}
        />
        <meta name="msapplication-TileColor" content="#FFF" />
      </Helmet>
      <div className="w-full desktop:px-16 tablet:px-8 mobileh:px-5 mobilev:px-4">
        <div className="desktop:pt-8 tablet:pt-6 pt-2 mx-auto w-full max-w-custom">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
