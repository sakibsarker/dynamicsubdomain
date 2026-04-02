import sys

with open('components/Header.tsx', 'r') as f:
    lines = f.readlines()

nav_close_indices = [i for i, line in enumerate(lines) if '</nav>' in line]

# Process in reverse order so line numbers stay valid
# Pattern: pairs of (desktop_nav, mobile_nav)
for i in range(len(nav_close_indices) - 1, -1, -2):
    mobile_idx = nav_close_indices[i]
    desktop_idx = nav_close_indices[i - 1]

    mobile_indent = lines[mobile_idx][:len(
        lines[mobile_idx]) - len(lines[mobile_idx].lstrip())]
    desktop_indent = lines[desktop_idx][:len(
        lines[desktop_idx]) - len(lines[desktop_idx].lstrip())]

    lines.insert(mobile_idx, mobile_indent + '  {renderMobileButtons()}\n')
    lines.insert(desktop_idx, desktop_indent + '  {renderDesktopButtons()}\n')

with open('components/Header.tsx', 'w') as f:
    f.writelines(lines)

print('Done! Inserted buttons into all templates.')
