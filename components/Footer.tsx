import type { ThemeName, WebsiteResponse, BusinessLogoResponse } from "@/lib/types";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./Icons";

interface FooterProps {
  data: WebsiteResponse;
  logoData: BusinessLogoResponse | null;
  themeName: ThemeName;
}

export default function Footer({ data, logoData, themeName }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = `\u00A9 ${year} ${logoData?.business_name || data.website_url}. All rights reserved.`;

  // Shared service list
  const ServicesList = ({ hoverClass }: { hoverClass: string }) => (
    <ul className="space-y-2 text-gray-400">
      {data.service_logo_urls?.slice(0, 4).map((service, index) => (
        <li key={index}><a href="/services" className={`${hoverClass} transition-colors`}>{service.name}</a></li>
      ))}
    </ul>
  );

  // Shared hours list
  const HoursList = ({ textClass }: { textClass: string }) => (
    <ul className="space-y-2">
      {data?.business_hours?.map((day) => (
        <li key={day.day} className={textClass}>
          {day.day}:{" "}
          {day.is_open
            ? day.time_slots.map((slot, index) => (
                <span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>
              ))
            : "Closed"}
        </li>
      ))}
    </ul>
  );

  // Templates 1-3: Social icons in first column, 4-column grid
  if (themeName === "template_one") {
    return (
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="/services" className="hover:text-red-500 transition-colors">{service.name}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <HoursList textClass="text-gray-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-red-500 transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  if (themeName === "template_two") {
    return (
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="hover:text-blue-400">{service.name}</a></li>))}</ul>
          </div>
          <div><h4 className="font-bold text-lg mb-4">Hours</h4><HoursList textClass="text-gray-400" /></div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-blue-400 transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  if (themeName === "template_three") {
    return (
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Footer Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="hover:text-[#FF6B35] transition-colors">{service.name}</a></li>))}</ul>
          </div>
          <div><h4 className="font-bold text-lg mb-4">Hours</h4><HoursList textClass="text-gray-400" /></div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-[#FF6B35] transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  // Templates 4-9: Social icons in Contact column, different layout structure
  if (themeName === "template_four") {
    return (
      <footer id="contact" className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-10 mb-4" />}
              {data.website_url && <p className="text-xl font-light mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-sm text-slate-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-sm text-slate-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-sm text-slate-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-sm text-slate-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center"><p className="text-sm text-slate-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_five") {
    return (
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-gray-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-gray-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-gray-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-gray-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-gray-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center"><p className="text-gray-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_six") {
    return (
      <footer id="contact" className="bg-gradient-to-br from-teal-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-teal-100">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-teal-100 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-teal-100">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-teal-100 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-teal-100 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-teal-600 pt-8 text-center"><p className="text-teal-200">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_seven") {
    return (
      <footer id="contact" className="bg-neutral-950 text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-neutral-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-neutral-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-neutral-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-neutral-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-neutral-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center"><p className="text-neutral-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_eight") {
    return (
      <footer id="contact" className="bg-zinc-950 text-white border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-zinc-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-zinc-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-zinc-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-zinc-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-zinc-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center"><p className="text-zinc-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  // Template Nine (default)
  return (
    <footer id="contact" className="bg-rose-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
            {data.website_url && <p className="text-2xl font-bold mb-4">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-rose-300/60">{data.contact_address}</p>}
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Services</h4>
            <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-rose-300/60 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Hours</h4>
            <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-rose-300/60">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Contact</h4>
            <ul className="space-y-2">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-rose-300/60 hover:text-white transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-rose-300/60 hover:text-white transition-colors">{data.contact_email}</a></li>}
            </ul>
            <div className="flex gap-4 mt-6">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>
        <div className="border-t border-rose-800 pt-8 text-center"><p className="text-rose-300/40">{copyright}</p></div>
      </div>
    </footer>
  );
}
