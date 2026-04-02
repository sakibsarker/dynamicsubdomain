export interface TimeSlot {
  open: string;
  close: string;
}

export interface BusinessHour {
  day: string;
  is_open: boolean;
  time_slots: TimeSlot[];
}

export interface ServiceLogo {
  id?: number;
  name: string;
  description: string;
  image?: string;
  image_url?: string;
}

export type ThemeName =
  | "template_one"
  | "template_two"
  | "template_three"
  | "template_four"
  | "template_five"
  | "template_six"
  | "template_seven"
  | "template_eight"
  | "template_nine";

export interface WebsiteResponse {
  id: number;
  theme_name: ThemeName;
  isActive: boolean;
  website_url: string;
  status: string;
  website_logo: string;
  hero_image: string;
  headline: string;
  subtitle: string;
  section_title_one: string;
  section_description_one: string;
  section_image_one: string;
  section_title_two: string;
  section_description_two: string;
  section_image_two: string;
  section_title_three: string;
  section_description_three: string;
  section_image_three: string;
  section_title_four: string;
  section_description_four: string;
  section_image_four: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  business_hours: BusinessHour[];
  facebook_url: string;
  tiktok_url: string;
  instagram_url: string;
  linkedin_url: string;
  x_url: string;
  created_by: number;
  service_logo_urls: ServiceLogo[];
  about_heading: string;
  about_description: string;
  about_image: string;
}

export interface BusinessLogoResponse {
  logo: string;
  business_name: string;
}
