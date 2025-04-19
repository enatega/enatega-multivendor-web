'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/lib/utils/interfaces/footer.interface';

const FooterLinkItem: React.FC<Link> = ({ label, link, internal }) => {
  const router = useRouter();

  function navigate() {

  console.log(label,link,internal)
    if (internal) {
      router.push(link);
    } else {
      window.open(link, '_blank');
    }


    console.log(internal)
  }

  return (
    <li className="text-md text-white hover:underline cursor-pointer">
      <button onClick={navigate}>{label}</button>
    </li>
  );
};

export default FooterLinkItem;
