'use client';

import React from 'react';
import FooterLinkItem from './FooterLinkItem';

interface Link {
  label: string;
  href?: string;
}

interface FooterSectionProps {
  title: string;
  links: Link[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-md font-semibold mb-4 text-[#aaaaaa]">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <FooterLinkItem key={link.label} label={link.label} href={link.href} />
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
