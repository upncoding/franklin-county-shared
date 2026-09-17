import re

with open('src/components/Sidebar.tsx', 'r') as f:
    content = f.read()

old_wrapper = 'className="flex justify-between items-center px-4 mb-6 sticky top-0 bg-white/80 backdrop-blur-md pt-4 pb-2 z-10 lg:hidden"'
new_wrapper = 'className="flex justify-between items-center px-4 mb-6 sticky top-0 bg-white/80 backdrop-blur-md pt-4 pb-2 z-10"'

content = content.replace(old_wrapper, new_wrapper)

with open('src/components/Sidebar.tsx', 'w') as f:
    f.write(content)

