import Script from 'next/script';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Schema.org templates for different content types
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Despeja la X",
  "description": "Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos",
  "url": "https://www.despejalax.es",
  "logo": "https://www.despejalax.es/brand/dlx-logo-black.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://www.despejalax.es#contacto"
  },
  "sameAs": [
    "https://instagram.com/despejalax",
    "https://www.linkedin.com/company/despejalax/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Despeja la X",
  "description": "Estudio de arquitectura e interiorismo",
  "url": "https://www.despejalax.es",
  "publisher": {
    "@type": "Organization",
    "name": "Despeja la X"
  }
};

interface ProjectType {
  name: string;
  description: string;
  portrait: string;
  workType: { name: string };
  projectStyle: { name: string };
  location: string;
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Breadcrumb schema interface
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    ...items
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.despejalax.es${item.url}`
    }))
  };
}

export function generateProjectSchema(project: ProjectType) {
  const datePublished = project.createdAt 
    ? (project.createdAt instanceof Date ? project.createdAt.toISOString() : project.createdAt)
    : new Date().toISOString();
  
  const dateModified = project.updatedAt 
    ? (project.updatedAt instanceof Date ? project.updatedAt.toISOString() : project.updatedAt)
    : new Date().toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.name,
    "description": project.description.replace(/<[^>]*>/g, '').substring(0, 200),
    "image": {
      "@type": "ImageObject",
      "url": project.portrait,
      "width": 1200,
      "height": 630,
      "caption": `${project.name} - ${project.workType.name} ${project.projectStyle.name}`
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "Despeja la X",
      "url": "https://www.despejalax.es"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Despeja la X",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.despejalax.es/brand/dlx-logo-black.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.despejalax.es/proyectos/${project.id}`
    },
    "genre": `${project.workType.name} ${project.projectStyle.name}`,
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    }
  };
}

// LocalBusiness schema para mejor SEO local
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.despejalax.es#contacto",
  "name": "Despeja la X",
  "image": "https://www.despejalax.es/brand/dlx-logo-black.png",
  "description": "Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos",
  "url": "https://www.despejalax.es",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES"
  },
  "sameAs": [
    "https://instagram.com/despejalax",
    "https://www.linkedin.com/company/despejalax/"
  ]
};
