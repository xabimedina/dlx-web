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
  "url": "https://www.despejalax.com",
  "logo": "https://www.despejalax.com/brand/dlx-logo-black.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://www.despejalax.com#contacto"
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
  "url": "https://www.despejalax.com",
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
}

export function generateProjectSchema(project: ProjectType) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description.replace(/<[^>]*>/g, '').substring(0, 200),
    "image": project.portrait,
    "creator": {
      "@type": "Organization",
      "name": "Despeja la X"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Despeja la X"
    },
    "dateCreated": "2025",
    "genre": `${project.workType.name} ${project.projectStyle.name}`,
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    }
  };
}
