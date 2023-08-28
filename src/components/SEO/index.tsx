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
          content="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg"
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
          content="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg"
        />
        {/* End Twitter tags */}
      </Helmet>
    </div>
  );
}

export default SEO;
