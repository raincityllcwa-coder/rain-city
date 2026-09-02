// Site-wide facts from the Site Settings document (id siteSettings): phone,
// address, hours, Google rating, license, owner. Every value falls back to
// the string the site used to have in its code, so an empty field never
// breaks a page. Fetched once per build.
import { sanityClient } from "./sanity";

export interface SiteInfo {
  companyName: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: { street: string; city: string; state: string; zip: string };
  hours: {
    weekdaysLabel: string;
    weekdaysOpen: string;
    weekdaysClose: string;
    saturdayLabel: string;
    saturdayOpen: string;
    saturdayClose: string;
    sundayLabel: string;
  };
  licenseNumber: string;
  instagramUrl: string;
  googleReviewsUrl: string;
  reviewCount: number;
  rating: string;
  ownerName: string;
  ownerRole: string;
  ownerPhoto: any;
  ownerQuote: string;
}

const FALLBACK: SiteInfo = {
  companyName: "Rain City Kitchen & Bath",
  phone: "(253) 466-8709",
  phoneHref: "tel:2534668709",
  email: "raincityllcwa@gmail.com",
  address: { street: "10900 NE 4th St Unit 2300", city: "Bellevue", state: "WA", zip: "98004" },
  hours: {
    weekdaysLabel: "Monday - Friday: 8:00 AM - 6:00 PM",
    weekdaysOpen: "08:00",
    weekdaysClose: "18:00",
    saturdayLabel: "Saturday: 9:00 AM - 4:00 PM",
    saturdayOpen: "09:00",
    saturdayClose: "16:00",
    sundayLabel: "Sunday: Closed",
  },
  licenseNumber: "BIRIUCL808C6",
  instagramUrl: "https://www.instagram.com/alex_biriuk/",
  googleReviewsUrl: "",
  reviewCount: 140,
  rating: "5.0",
  ownerName: "Aleksandr Biriuk",
  ownerRole: "Owner / General Chief Operating Officer",
  ownerPhoto: null,
  ownerQuote: "",
};

const text = (v: any, fallback: string) => (typeof v === "string" && v.trim() ? v : fallback);

let cache: Promise<SiteInfo> | null = null;

export function getSite(): Promise<SiteInfo> {
  if (!cache) {
    cache = sanityClient
      .fetch(`*[_id == "siteSettings"][0]`)
      .then((s: any) => {
        if (!s) return FALLBACK;
        const phone = text(s.phone, FALLBACK.phone);
        const digits = phone.replace(/\D/g, "");
        const h = s.hours || {};
        const a = s.address || {};
        return {
          companyName: text(s.companyName, FALLBACK.companyName),
          phone,
          phoneHref: digits ? `tel:${digits}` : FALLBACK.phoneHref,
          email: text(s.email, FALLBACK.email),
          address: {
            street: text(a.street, FALLBACK.address.street),
            city: text(a.city, FALLBACK.address.city),
            state: text(a.state, FALLBACK.address.state),
            zip: text(a.zip, FALLBACK.address.zip),
          },
          hours: {
            weekdaysLabel: text(h.weekdaysLabel, FALLBACK.hours.weekdaysLabel),
            weekdaysOpen: text(h.weekdaysOpen, FALLBACK.hours.weekdaysOpen),
            weekdaysClose: text(h.weekdaysClose, FALLBACK.hours.weekdaysClose),
            saturdayLabel: text(h.saturdayLabel, FALLBACK.hours.saturdayLabel),
            saturdayOpen: text(h.saturdayOpen, FALLBACK.hours.saturdayOpen),
            saturdayClose: text(h.saturdayClose, FALLBACK.hours.saturdayClose),
            sundayLabel: text(h.sundayLabel, FALLBACK.hours.sundayLabel),
          },
          licenseNumber: text(s.licenseNumber, FALLBACK.licenseNumber),
          instagramUrl: text(s.instagramUrl, FALLBACK.instagramUrl),
          googleReviewsUrl: text(s.googleReviewsUrl, FALLBACK.googleReviewsUrl),
          reviewCount: typeof s.reviewCount === "number" && s.reviewCount > 0 ? s.reviewCount : FALLBACK.reviewCount,
          rating: text(s.rating, FALLBACK.rating),
          ownerName: text(s.ownerName, FALLBACK.ownerName),
          ownerRole: text(s.ownerRole, FALLBACK.ownerRole),
          ownerPhoto: s.ownerPhoto?.asset ? s.ownerPhoto : null,
          ownerQuote: text(s.ownerQuote, FALLBACK.ownerQuote),
        } as SiteInfo;
      })
      .catch((e: any) => {
        console.warn("[Sanity] siteSettings fetch failed:", e?.message);
        return FALLBACK;
      });
  }
  return cache;
}

// schema.org pieces shared by several pages.
export function postalAddress(site: SiteInfo) {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  };
}

export function openingHours(site: SiteInfo) {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: site.hours.weekdaysOpen,
      closes: site.hours.weekdaysClose,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: site.hours.saturdayOpen,
      closes: site.hours.saturdayClose,
    },
  ];
}
