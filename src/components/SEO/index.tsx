import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  name: string;
  type: string;
  href: string;
}

function SEO({ title, description, name, type, href }: Props) {
  return (
    <div>
      <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={href} />
        {/* End standard metadata tags */}
        {/* Facebook tags */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.fundraisingtoolbox.io/" />
        <meta
          property="og:image"
          content="https://assets.website-files.com/64a6606fd2e8cb8b1b9e71fb/64a66145d2e8cb8b1b9f589b_Debonne%20Logo.svg"
        />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          property="twitter:domain"
          content="https://www.fundraisingtoolbox.io/"
        />
        <meta
          property="twitter:url"
          content={`https://www.fundraisingtoolbox.io/${href}`}
        />
        <meta
          name="twitter:image"
          content="https://assets.website-files.com/64a6606fd2e8cb8b1b9e71fb/64a66145d2e8cb8b1b9f589b_Debonne%20Logo.svg"
        />
        {/* End Twitter tags */}
      </Helmet>
    </div>
  );
}

export default SEO;
