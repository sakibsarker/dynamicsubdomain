#!/usr/bin/env python3
"""
Transform Frontend React pages to Next.js client components.
Extracts main content (between headers and footers) and adapts for Next.js.
"""
import re
import os

BASE = '/Users/sakibsarker/Desktop/dev/eligant'
FRONTEND = os.path.join(BASE, 'Frontend/src')
NEXTJS = os.path.join(BASE, 'dynamicsubdomain')


def read_file(path):
    with open(path, 'r') as f:
        return f.read()


def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f"  Written: {path} ({len(content.splitlines())} lines)")


def transform_jsx(content):
    """Apply transformations from React/Redux to Next.js"""
    # Replace popup state calls with context functions
    content = content.replace('setIsDialogOpen(true)', 'onBookAppointment()')
    content = content.replace(
        'setIsEstimatePopupOpen(true)', 'onGetEstimate()')
    # Replace Link imports (react-router to next/link)
    content = content.replace('<Link to="/"', '<Link href="/"')
    content = content.replace('<Link to="/contact"', '<Link href="/contact"')
    content = content.replace('<Link to="/services"', '<Link href="/services"')
    content = content.replace('<Link to="/aboutus"', '<Link href="/about"')
    content = content.replace('to="/aboutus"', 'href="/about"')
    content = content.replace('to="/"', 'href="/"')
    content = content.replace('to="/contact"', 'href="/contact"')
    content = content.replace('to="/services"', 'href="/services"')
    return content


def extract_home_content(home_src):
    """Extract main content from Webpage.tsx (between headers and footers)"""
    lines = home_src.split('\n')

    # Find where template main content starts (after last header)
    # Template One main content starts after its header closing
    # Look for "Template One Homepage" comment
    main_start = None
    for i, line in enumerate(lines):
        if '{/* Template One Homepage */}' in line:
            main_start = i
            break

    # Find where footers start
    footer_start = None
    for i, line in enumerate(lines):
        if '{/* Footer - Template One */}' in line:
            footer_start = i
            break

    if main_start is None or footer_start is None:
        print(
            f"  WARNING: Could not find boundaries. main_start={main_start}, footer_start={footer_start}")
        return None

    # Extract main content lines
    main_lines = lines[main_start:footer_start]
    content = '\n'.join(main_lines)
    return content


def extract_about_main_content(about_src):
    """Extract just the <main> blocks from each template in AboutusWebPage.tsx"""
    lines = about_src.split('\n')

    # For About page, each template has header+main+footer grouped together
    # We need to extract just the <main> portion from each template
    result_lines = []
    in_main = False
    main_depth = 0

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Detect start of main tag
        if '<main' in stripped and not in_main:
            in_main = True
            main_depth = 1
            result_lines.append(line)
            continue

        if in_main:
            result_lines.append(line)
            # Count opening/closing main tags
            main_depth += stripped.count('<main')
            main_depth -= stripped.count('</main>')
            if main_depth <= 0:
                in_main = False
                main_depth = 0

    return '\n'.join(result_lines)


def extract_services_main_content(src):
    """Extract main content sections from ServicesWebPage.tsx"""
    lines = src.split('\n')

    # For services page, main content includes headers (we skip) and template-specific main content
    # Find template main content after headers, before footers
    # Look for: Template 1: Red Theme
    main_start = None
    for i, line in enumerate(lines):
        if "Template 1: Red Theme" in line or "Template One" in line:
            if '<main' in lines[i+1] if i+1 < len(lines) else False:
                pass
            # Check if this is the main content section (not header)
            # Main sections start with {/* Template 1: Red Theme */}
            # followed by {themeName ===
            for j in range(max(0, i-2), min(len(lines), i+3)):
                if '<main' in lines[j]:
                    main_start = i
                    break
            if main_start:
                break

    # Find where footers start
    footer_start = None
    for i, line in enumerate(lines):
        if '{/* Footer - Template One */}' in line or ('{/* Line' in line and 'Footer' in line):
            footer_start = i
            break
        # Also check for actual footer tag patterns in services
        if "themeName === \"template_one\" && (" in line and i > len(lines)//2:
            # Check if next lines contain footer
            for j in range(i, min(len(lines), i+5)):
                if '<footer' in lines[j]:
                    footer_start = i - 1
                    break

    return None  # We'll handle services differently


def build_home_page():
    """Build the home page client component"""
    home_src = read_file(os.path.join(FRONTEND, 'pages/webpage/Webpage.tsx'))
    lines = home_src.split('\n')

    # Find main content boundaries
    main_start = None
    for i, line in enumerate(lines):
        if 'Template One Homepage' in line:
            main_start = i
            break

    # Find image popup modal (include it) and footer start (exclude)
    image_popup_end = None
    for i, line in enumerate(lines):
        if '{/* Footer - Template One */}' in line:
            image_popup_end = i
            break

    if not main_start or not image_popup_end:
        print(
            f"ERROR: Could not find home page boundaries. start={main_start}, end={image_popup_end}")
        return

    # Extract the content (main + services + CTA + gallery + image popup)
    main_content = '\n'.join(lines[main_start:image_popup_end])
    main_content = transform_jsx(main_content)

    # Build the complete client component
    component = '''"use client";

import { useState } from "react";
import Link from "next/link";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { FadeInSection, SlideIn, BounceIn } from "@/components/Animations";

interface Props {
  data: WebsiteResponse;
}

export default function HomeContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const [openImage, setOpenImage] = useState<string | null>(null);
  const themeName = data?.theme_name ?? "template_one";

  return (
    <>
''' + main_content + '''
    </>
  );
}
'''
    write_file(os.path.join(
        NEXTJS, 'components/pages/HomeContent.tsx'), component)


def build_about_page():
    """Build the about page client component"""
    about_src = read_file(os.path.join(
        FRONTEND, 'components/webpage/pages/AboutusWebPage.tsx'))
    lines = about_src.split('\n')

    # Extract main blocks from each template
    # Each template has: header -> main -> footer (or floating buttons for t3)
    # We want just the main+floating buttons content

    result_blocks = []
    in_main = False
    main_depth = 0
    current_template = None
    capture_lines = []

    # Also capture floating action buttons (template three)
    in_floating = False

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Track which template we're in
        if 'themeName === "template_' in stripped:
            match = re.search(r'themeName === "(template_\w+)"', stripped)
            if match:
                current_template = match.group(1)

        # Detect start of main tag
        if '<main' in stripped and not in_main:
            in_main = True
            main_depth = stripped.count('<main')
            main_depth -= stripped.count('</main>')
            capture_lines.append(line)
            if main_depth <= 0:
                in_main = False
                result_blocks.append(
                    (current_template, '\n'.join(capture_lines)))
                capture_lines = []
            continue

        if in_main:
            capture_lines.append(line)
            main_depth += stripped.count('<main')
            main_depth -= stripped.count('</main>')
            if main_depth <= 0:
                in_main = False
                result_blocks.append(
                    (current_template, '\n'.join(capture_lines)))
                capture_lines = []

        # Capture floating buttons (template three)
        if 'Floating Action Buttons' in stripped:
            in_floating = True
            capture_lines = [line]
            continue
        if in_floating:
            capture_lines.append(line)
            if '</div>' in stripped and capture_lines[-1].strip().startswith('</div>'):
                # Count divs to find close
                div_depth = 0
                for cl in capture_lines:
                    div_depth += cl.count('<div')
                    div_depth -= cl.count('</div>')
                if div_depth <= 0:
                    in_floating = False
                    result_blocks.append(
                        ('floating_three', '\n'.join(capture_lines)))
                    capture_lines = []

    # Assemble the page content
    # Group by template - each template gets its conditional main block
    template_mains = {}
    floating = None
    for tpl, content in result_blocks:
        if tpl == 'floating_three':
            floating = content
        elif tpl:
            template_mains[tpl] = content

    # Build conditional rendering
    main_jsx = ""
    for tpl in ['template_one', 'template_two', 'template_three', 'template_four',
                'template_five', 'template_six', 'template_seven', 'template_eight', 'template_nine']:
        if tpl in template_mains:
            block = transform_jsx(template_mains[tpl])
            main_jsx += f'      {{themeName === "{tpl}" && (\n{block}\n      )}}\n'
            if tpl == 'template_three' and floating:
                main_jsx += f'      {{themeName === "template_three" && (\n{transform_jsx(floating)}\n      )}}\n'

    component = '''"use client";

import Link from "next/link";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";

interface Props {
  data: WebsiteResponse;
}

export default function AboutContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  const aboutPageSection = {
    heading: data?.about_heading || "About Us",
    description: data?.about_description || "Welcome to our business",
    image: data?.about_image,
  };

  return (
    <>
''' + main_jsx + '''    </>
  );
}
'''
    write_file(os.path.join(
        NEXTJS, 'components/pages/AboutContent.tsx'), component)


def build_services_page():
    """Build the services page client component"""
    src = read_file(os.path.join(
        FRONTEND, 'components/webpage/pages/ServicesWebPage.tsx'))
    lines = src.split('\n')

    # Find all main tag sections and footer sections
    # Services has: headers -> mains -> footers
    # Main sections contain: {/* Template 1: Red Theme */} or similar markers

    # Find where main content starts (after headers, look for first <main)
    # that's inside template_one's content section

    # Approach: find ALL main blocks and footer blocks separately
    main_blocks = []
    footer_blocks = []

    in_main = False
    in_footer = False
    depth = 0
    current_lines = []
    current_template = None

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Track template from conditional
        if 'themeName === "template_' in stripped and '{' in stripped:
            match = re.search(r'themeName === "(template_\w+)"', stripped)
            if match:
                current_template = match.group(1)

        # Detect <main blocks
        if '<main' in stripped and not in_main and not in_footer:
            in_main = True
            depth = stripped.count('<main') - stripped.count('</main>')
            current_lines = [line]
            if depth <= 0:
                in_main = False
                main_blocks.append(
                    (current_template, '\n'.join(current_lines)))
                current_lines = []
            continue

        if in_main:
            current_lines.append(line)
            depth += stripped.count('<main') - stripped.count('</main>')
            if depth <= 0:
                in_main = False
                main_blocks.append(
                    (current_template, '\n'.join(current_lines)))
                current_lines = []
            continue

        # Detect <footer blocks
        if '<footer' in stripped and not in_footer and not in_main:
            in_footer = True
            depth = stripped.count('<footer') - stripped.count('</footer>')
            current_lines = [line]
            if depth <= 0:
                in_footer = False
                current_lines = []
            continue

        if in_footer:
            current_lines.append(line)
            depth += stripped.count('<footer') - stripped.count('</footer>')
            if depth <= 0:
                in_footer = False
                current_lines = []
            continue

    # Also find floating buttons for template_three
    floating_lines = []
    in_floating = False
    float_depth = 0
    for i, line in enumerate(lines):
        if 'Floating Action Buttons' in line:
            in_floating = True
            float_depth = 0
            floating_lines = []
        if in_floating:
            floating_lines.append(line)
            float_depth += line.count('<div') - line.count('</div>')
            if float_depth <= 0 and len(floating_lines) > 1:
                in_floating = False

    # Build the component
    main_jsx = ""
    seen = set()
    for tpl, content in main_blocks:
        if tpl and tpl not in seen:
            seen.add(tpl)
            block = transform_jsx(content)
            main_jsx += f'      {{themeName === "{tpl}" && (\n{block}\n      )}}\n'
            if tpl == 'template_three' and floating_lines:
                fb = transform_jsx('\n'.join(floating_lines))
                main_jsx += f'      {{themeName === "template_three" && (\n{fb}\n      )}}\n'

    component = '''"use client";

import Link from "next/link";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";

interface Props {
  data: WebsiteResponse;
}

export default function ServicesContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  return (
    <>
''' + main_jsx + '''    </>
  );
}
'''
    write_file(os.path.join(
        NEXTJS, 'components/pages/ServicesContent.tsx'), component)


def build_contact_page():
    """Build the contact page client component"""
    src = read_file(os.path.join(
        FRONTEND, 'components/webpage/pages/ContactUsWebPage.tsx'))
    lines = src.split('\n')

    # Extract all <main blocks
    main_blocks = []
    in_main = False
    depth = 0
    current_lines = []
    current_template = None

    for i, line in enumerate(lines):
        stripped = line.strip()

        if 'themeName === "template_' in stripped:
            match = re.search(r'themeName === "(template_\w+)"', stripped)
            if match:
                current_template = match.group(1)

        if '<main' in stripped and not in_main:
            in_main = True
            depth = stripped.count('<main') - stripped.count('</main>')
            current_lines = [line]
            if depth <= 0:
                in_main = False
                main_blocks.append(
                    (current_template, '\n'.join(current_lines)))
                current_lines = []
            continue

        if in_main:
            current_lines.append(line)
            depth += stripped.count('<main') - stripped.count('</main>')
            if depth <= 0:
                in_main = False
                main_blocks.append(
                    (current_template, '\n'.join(current_lines)))
                current_lines = []
            continue

    # Also check for sections inside <main className="flex-1"> wrapper
    # Contact page may use a different structure

    # Build the component
    main_jsx = ""
    seen = set()
    for tpl, content in main_blocks:
        if tpl and tpl not in seen:
            seen.add(tpl)
            block = transform_jsx(content)
            main_jsx += f'      {{themeName === "{tpl}" && (\n{block}\n      )}}\n'

    # If no main blocks found, extract the main content differently
    if not main_blocks:
        print("  WARNING: No <main> blocks found in contact page, trying alternative extraction")

    component = '''"use client";

import Link from "next/link";
import type { WebsiteResponse, BusinessHour } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";

function formatBusinessHours(businessHours: BusinessHour[]) {
  return businessHours.map((day) => {
    const dayName = day.day.charAt(0) + day.day.slice(1).toLowerCase();
    if (!day.is_open) return dayName + ": Closed";
    const timeSlots = day.time_slots.map((slot) => slot.open + " - " + slot.close).join(", ");
    return dayName + ": " + timeSlots;
  });
}

interface Props {
  data: WebsiteResponse;
}

export default function ContactContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  const contactInfo = {
    address: data?.contact_address || "Address not available",
    phone: data?.contact_phone || "Phone not available",
    email: data?.contact_email || "Email not available",
    hours: data?.business_hours ? formatBusinessHours(data.business_hours) : ["Hours not available"],
  };

  return (
    <>
''' + main_jsx + '''    </>
  );
}
'''
    write_file(os.path.join(
        NEXTJS, 'components/pages/ContactContent.tsx'), component)


# Run all builders
print("Building Home page...")
build_home_page()
print("Building About page...")
build_about_page()
print("Building Services page...")
build_services_page()
print("Building Contact page...")
build_contact_page()
print("Done!")
