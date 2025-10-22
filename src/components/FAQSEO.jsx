import React from 'react';
import SEO from './SEO';
import { FAQSchema } from './StructuredData';

const FAQSEO = ({ faqs }) => {
  return (
    <>
      <SEO
        title="FAQ | Sumit - Full Stack Developer"
        description="Frequently asked questions about my services, technologies, project timelines, and development process. Get answers to common questions about working with me."
        type="website"
        keywords="FAQ, frequently asked questions, web development, freelance, contact, services, pricing"
        url="https://sumit021196.github.io/sumit/faq"
      />
      <FAQSchema faqs={faqs} />
    </>
  );
};

export default FAQSEO;
