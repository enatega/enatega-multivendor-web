'use client';

import React from 'react';

interface FooterLinkItemProps {
  label: string;
  href?: string;
}

const FooterLinkItem: React.FC<FooterLinkItemProps> = ({ label, href = '#' }) => {
  return (
    <li className="text-md text-white hover:underline cursor-pointer">
      <a href={href}>{label}</a>
    </li>
  );
};

export default FooterLinkItem;
