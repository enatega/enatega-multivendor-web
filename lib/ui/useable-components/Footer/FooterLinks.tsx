'use client';

import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FooterSection from './FooterSection';
import FooterLinkItem from './FooterLinkItem';
import 'primeicons/primeicons.css'; 

interface Link {
  label: string;
  href?: string;
}

interface FooterSectionData {
  title: string;
  links: Link[];
}

interface FooterLinksProps {
  section?: FooterSectionData;
}

const defaultFooterData: FooterSectionData = 
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  }

const FooterLinks: React.FC<FooterLinksProps> = ({ section = defaultFooterData }) => {
  return (
    <div className="w-full">
      {/* Grid for medium and up */}
      <div className="hidden md:grid ">
          <FooterSection key={section.title} title={section.title} links={section.links} />
      </div>

      {/* Accordion for small screens */}
      <div className="md:hidden">
        <Accordion className="custom-accordion bg-green" >
            <AccordionTab key={section.title} header={
            <div className="flex justify-between w-[90%]">
              <span>{section.title}</span>
              <i className="pi pi-chevron-down"></i>
            </div>
          }
        >  
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <FooterLinkItem key={link.label} label={link.label} href={link.href} />
                ))}
              </ul>
            </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default FooterLinks;
