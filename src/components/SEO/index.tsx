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
        <meta
          property="og:url"
          content="https://decklink-fe-git-integration-martincho32.vercel.app/preview/oneeee"
        />
        <meta property="og:image" content="https://www.tacobell.com/" />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          property="twitter:domain"
          content="decklink-fe-git-integration-martincho32.vercel.app"
        />
        <meta
          property="twitter:url"
          content="https://decklink-fe-git-integration-martincho32.vercel.app/preview/oneeee"
        />
        <meta name="twitter:image" content="https://www.tacobell.com/" />
        {/* End Twitter tags */}
      </Helmet>
    </div>
  );
}

export default SEO;
