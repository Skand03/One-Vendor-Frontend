import os
import re
import json

html_dir = 'frontend/stitch_screens'

# Specific mapping from downloaded HTML to structured JSX
file_mapping = {
    # Customer
    "One_Vendor_Solutions_About_Us.html": "frontend/src/pages/customer/AboutUs.jsx",
    "One_Vendor_Solutions_Book_a_Service_Slot.html": "frontend/src/pages/customer/BookSlot.jsx",
    "One_Vendor_Solutions_Contact_Us.html": "frontend/src/pages/customer/ContactUs.jsx",
    "One_Vendor_Solutions_Customer_Login.html": "frontend/src/pages/customer/Login.jsx",
    "One_Vendor_Solutions_Customer_Signup.html": "frontend/src/pages/customer/Signup.jsx",
    "One_Vendor_Solutions_Forgot_Password.html": "frontend/src/pages/customer/ForgotPassword.jsx",
    "One_Vendor_Solutions_Home_(Updated).html": "frontend/src/pages/customer/Home.jsx",
    "One_Vendor_Solutions_Product_Catalog.html": "frontend/src/pages/customer/Catalog.jsx",
    "One_Vendor_Solutions_Request_a_Quote.html": "frontend/src/pages/customer/EnquiryForm.jsx",
    
    # Admin
    "One_Vendor_Solutions_Admin_Login.html": "frontend/src/pages/admin/AdminLogin.jsx",
    "One_Vendor_Solutions_Admin_Dashboard_Overview.html": "frontend/src/pages/admin/Dashboard.jsx",
    "One_Vendor_Solutions_Enquiries_Management.html": "frontend/src/pages/admin/Enquiries.jsx",
    "One_Vendor_Solutions_Slot_Bookings_Management.html": "frontend/src/pages/admin/Bookings.jsx",
    "One_Vendor_Solutions_Manage_Catalog.html": "frontend/src/pages/admin/Products.jsx",
    "One_Vendor_Solutions_Admin_Settings_(Team).html": "frontend/src/pages/admin/Settings.jsx",
}

# Map button/link text to routes
route_map = {
    r'\bHome\b': '/',
    r'\bAbout\s+Us\b|\bAbout\b': '/about',
    r'\bContact\s+Us\b|\bContact\b': '/contact',
    r'\bCategories\b|\bCatalog\b|\bProduct\s+Catalog\b|\bView\s+Catalog\b': '/catalog',
    r'\bBook\s+a\s+Service\b|\bBook\s+a\s+Service\s+/\s+Enquiry\b|\bBook\s+Service\b|\bBook\s+a\s+Service\s+Slot\b': '/book-slot',
    r'\bRequest\s+a\s+Quote\b|\bGet\s+a\s+Quote\b': '/enquiry',
    r'\bLogin\b|\bCustomer\s+Login\b|\bAccount\b': '/login',
    r'\bSignup\b|\bCustomer\s+Signup\b|\bCreate\s+Business\s+Account\b|\bCreate\s+Account\b': '/signup',
    r'\bForgot\s+Password\b': '/forgot-password',
    r'\bAdmin\s+Login\b': '/admin/login',
    r'\bOverview\b|\bDashboard\b|\bAdmin\s+Dashboard\b': '/admin/dashboard',
    r'\bSettings\b|\bAdmin\s+Settings\b': '/admin/settings',
    r'\bManage\s+Catalog\b': '/admin/products',
    r'\bEnquiries\b|\bEnquiries\s+Management\b': '/admin/enquiries',
    r'\bSlots\b|\bSlot\s+Bookings\b|\bSlot\s+Bookings\s+Management\b': '/admin/bookings'
}

all_styles = set()

def extract_styles(html_content):
    style_matches = re.findall(r'<style[^>]*>(.*?)</style>', html_content, re.DOTALL | re.IGNORECASE)
    for style in style_matches:
        cleaned = style.strip()
        if cleaned:
            # Fix tailwind-like custom class error
            cleaned = cleaned.replace("shadow-[0px_4px_20px_rgba(10,35,66,0.05)];", "box-shadow: 0px 4px 20px rgba(10, 35, 66, 0.05);")
            cleaned = cleaned.replace(".custom-scrollbar::-webkit-", ".custom-scrollbar::-webkit-scrollbar { width: 4px; }")
            # Strip body specific properties so they don't break scrolling or background colors globally
            cleaned = re.sub(r'body\s*\{[^}]*\}', '', cleaned, flags=re.DOTALL | re.IGNORECASE)
            cleaned = cleaned.strip()
            if cleaned:
                all_styles.add(cleaned)

def convert_style_string(match):
    style_str = match.group(1)
    rules = style_str.split(';')
    jsx_rules = []
    for rule in rules:
        if not rule.strip():
            continue
        parts = rule.split(':', 1)
        if len(parts) != 2:
            continue
        key = parts[0].strip()
        val = parts[1].strip()
        
        # Convert key to camelCase
        camel_key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
        
        # Format values properly for React (wrap in quotes if needed)
        if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
            jsx_rules.append(f"{camel_key}: {val}")
        else:
            clean_val = val.replace('"', '\\"')
            jsx_rules.append(f"{camel_key}: \"{clean_val}\"")
            
    return "style={{" + ", ".join(jsx_rules) + "}}"

def convert_html_to_jsx(html_content, component_name):
    # Extract body
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html_content, re.DOTALL | re.IGNORECASE)
    if not body_match:
        return None
    
    body = body_match.group(1)
    
    # Extract scripts inside body
    script_matches = re.findall(r'<script[^>]*>(.*?)</script>', body, re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<script.*?>.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
    
    # Process scripts into a single block
    script_js = ""
    for script in script_matches:
        script_js += script.strip() + "\n"
    
    # Convert style="background-image: ... " style string to React object
    body = re.sub(r'style="([^"]*)"', convert_style_string, body)
    
    # Standard replacements
    body = body.replace('class=', 'className=')
    body = body.replace('for=', 'htmlFor=')
    
    def fix_self_closing(match):
        tag = match.group(0)
        if not tag.endswith('/>') and not tag.endswith('/ >'):
            return tag[:-1] + ' />'
        return tag
    
    body = re.sub(r'<(img|input|hr|br|meta|link)[^>]*>', fix_self_closing, body, flags=re.IGNORECASE)
    body = re.sub(r'<!--.*?-->', '', body, flags=re.DOTALL)
    
    # Convert links to React Router Links
    def link_replacer(match):
        attrs = match.group(1)
        text = match.group(2)
        
        target_path = '#'
        for pattern, path in route_map.items():
            if re.search(pattern, text, re.IGNORECASE):
                target_path = path
                break
        
        if target_path != '#':
            clean_attrs = re.sub(r'href=["\'][^"\']*["\']', '', attrs).strip()
            clean_attrs = re.sub(r'\s+', ' ', clean_attrs)
            return f'<Link to="{target_path}" {clean_attrs}>{text}</Link>'
        return match.group(0)

    # Convert simple href="#" links
    body = re.sub(r'<a([^>]*\shref=["\'](?:#|javascript:void\(0\))?["\'][^>]*)>(.*?)</a>', 
                  link_replacer, 
                  body, flags=re.DOTALL)

    # In case of other anchor tags, let's do a broader replacement
    def link_replacer_broad(match):
        full_tag = match.group(0)
        attrs = match.group(1)
        text = match.group(2)
        
        target_path = '#'
        for pattern, path in route_map.items():
            if re.search(pattern, text, re.IGNORECASE):
                target_path = path
                break
        
        if target_path != '#':
            attrs = re.sub(r'href=["\'][^"\']*["\']', '', attrs)
            attrs = re.sub(r'\s+', ' ', attrs).strip()
            return f'<Link to="{target_path}" {attrs}>{text}</Link>'
        return full_tag

    # Match remaining links
    body = re.sub(r'<a\s+([^>]+)>(.*?)</a>', link_replacer_broad, body, flags=re.DOTALL)

    # Clean up standard javascript things that crash React
    body = body.replace('viewbox=', 'viewBox=')
    body = body.replace('stroke-width=', 'strokeWidth=')
    body = body.replace('fill-rule=', 'fillRule=')
    body = body.replace('clip-rule=', 'clipRule=')
    body = body.replace('stroke-linecap=', 'strokeLinecap=')
    body = body.replace('stroke-linejoin=', 'strokeLinejoin=')
    body = body.replace('stroke-dasharray=', 'strokeDasharray=')
    
    # Prepare script logic
    effect_hook = ""
    local_js = ""
    
    # Inject page-specific local body styles
    if component_name in ["Login", "Signup", "AdminLogin"]:
        local_js += """
      document.body.style.backgroundColor = '#0a2342';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.backgroundColor = '';
        document.body.style.overflow = '';
      };
"""
    
    if script_js.strip():
        # Check if it has DOMContentLoaded
        has_dom_content = re.search(r'document\.addEventListener\([\'"]DOMContentLoaded[\'"]', script_js)
        if has_dom_content:
            # Clean up DOMContentLoaded listeners
            script_js = re.sub(r'document\.addEventListener\([\'"]DOMContentLoaded[\'"]\s*,\s*\(?\)?\s*=>\s*\{', '', script_js)
            script_js = script_js.strip()
            # Strip matching closing bracket
            end_match = re.search(r'\}\s*\)\s*;?\s*(?://.*|/\*.*\*/)?$', script_js)
            if end_match:
                script_js = script_js[:end_match.start()]
                
        # Manually repair the cut-off javascript in EnquiriesManagement/Enquiries safely
        script_js = script_js.strip()
        if component_name == "Enquiries" and script_js.endswith("drawer.classList.remove('translate-x-"):
            script_js = script_js[:-len("drawer.classList.remove('translate-x-")] + "drawer.classList.remove('translate-x-full');\n                drawer.classList.add('translate-x-0');\n            }\n        }"
        
        # Manually repair the cut-off javascript in RequestaQuote/EnquiryForm safely
        if component_name == "EnquiryForm" and script_js.endswith("setTimeout(() => {"):
            script_js = script_js[:-len("setTimeout(() => {")] + "setTimeout(() => {\n                btn.innerHTML = 'Sent Successfully!';\n                btn.disabled = false;\n            }, 1500);\n        });"

    combined_js = script_js.strip() + "\n" + local_js.strip()
    combined_js = combined_js.strip()

    if combined_js:
        effect_hook = f"""  useEffect(() => {{
    try {{
      {combined_js}
    }} catch (err) {{
      console.error("Error running stitch micro-interactions:", err);
    }}
  }}, []);"""

    import_effect = ", { useEffect }" if effect_hook else ""

    jsx_template = f"""import React{import_effect} from 'react';
import {{ Link }} from 'react-router-dom';

const {component_name} = () => {{
{effect_hook}
  return (
    <>
      {body}
    </>
  );
}};

export default {component_name};
"""
    return jsx_template

# First pass: Extract styles
for filename in os.listdir(html_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(html_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        extract_styles(content)

# Write out stitch.css
stitch_css_path = 'frontend/src/stitch.css'
with open(stitch_css_path, 'w', encoding='utf-8') as f:
    f.write("/* Custom styles from Stitch screens */\n\n")
    for style in sorted(all_styles):
        f.write(style + "\n\n")
print("Created stitch.css")

# Second pass: Generate components based on exact mapping
for filename, dest_path in file_mapping.items():
    filepath = os.path.join(html_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Get component name from the destination file basename (e.g., Home, Catalog)
        comp_name = os.path.basename(dest_path).replace('.jsx', '')
        jsx_code = convert_html_to_jsx(content, comp_name)
        
        if jsx_code:
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(jsx_code)
            print(f"Generated page: {dest_path}")
    else:
        print(f"Warning: HTML file {filename} not found in stitch_screens")
