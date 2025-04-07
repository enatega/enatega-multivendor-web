/* eslint-disable @next/next/no-img-element */
"use client";

import AppLinks from "@/lib/ui/useable-components/Footer/AppLinks";
import FooterLinks from "@/lib/ui/useable-components/Footer/FooterLinks";

const partnerWithWolt = {
  title: "Partner with Wolt",
  links: [
    { label: "For couriers", href: "#" },
    { label: "For merchants", href: "#" },
    { label: "For affiliates", href: "#" },
  ],
};

const company = {
  title: "Company",
  links: [
    { label: "About us", href: "#" },
    { label: "What we stand for", href: "#" },
    { label: "Jobs", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Security", href: "#" },
    { label: "Investors", href: "#" },
  ],
};

const products = {
  title: "Products",
  links: [
    { label: "Wolt Drive", href: "#" },
    { label: "Wolt Market", href: "#" },
    { label: "Wolt+", href: "#" },
    { label: "Wolt for Work", href: "#" },
    { label: "Wolt Ads", href: "#" },
  ],
};

const usefulLinks = {
  title: "Useful links",
  links: [
    { label: "Support", href: "#" },
    { label: "Newsroom", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Speak up", href: "#" },
    { label: "Promo codes", href: "#" },
    { label: "Developers", href: "#" },
    { label: "Product safety recalls", href: "#" },
  ],
};

const followUs = {
  title: "Follow us",
  links: [
    { label: "Blog", href: "#" },
    { label: "Engineering Blog", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Wolt Life", href: "#" },
  ],
};

const AppFooter = () => {
  return (
    <div className="w-full h-auto bg-[#141414] flex items-center justify-center">
      <div className=" mx-auto mt-[60px] mb-[60px] p-4 flex md:items-center md:justify-center flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-screen">
          <div className="p-2">
            <AppLinks/>
          </div>
          <div className="p-2">
            <FooterLinks section={partnerWithWolt} />
          </div>
          <div className="p-2">
            <FooterLinks section={company} />
          </div>
          <div className="p-2">
            <FooterLinks section={products} />
          </div>
          <div className="p-2">
            <FooterLinks section={usefulLinks} />
          </div>
          <div className="p-2">
            <FooterLinks section={followUs} />
          </div>
        </div>

        <div>Header Bottom</div>
      </div>
    </div>
  );
};

AppFooter.displayName = "AppFooter";

export default AppFooter;
