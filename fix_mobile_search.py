import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

old_search_block = """                            {/* Mobile search */}
                            {showSearch && (
                                <div className="px-6 w-full max-w-md mx-auto mb-6">
                                    <form
                                        role="search"
                                        aria-label="Site search"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const input = (e.currentTarget.elements.namedItem('q') as HTMLInputElement);
                                            if (input.value.trim() && onSearch) { onSearch(input.value.trim()); input.value = ''; }
                                        }}
                                        className="w-full"
                                    >
                                        <input
                                            type="search"
                                            name="q"
                                            placeholder="Search..."
                                            aria-label="Search"
                                            className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2"
                                            style={{ borderColor: theme.colors.border, color: theme.colors.text.primary }}
                                        />
                                    </form>
                                </div>
                            )}"""

new_search_block = """                            {/* Mobile search */}
                            {showSearch && (
                                <div className="px-6 w-full max-w-md mx-auto mb-10">
                                    <form
                                        role="search"
                                        aria-label="Site search"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const input = (e.currentTarget.elements.namedItem('q') as HTMLInputElement);
                                            if (input.value.trim() && onSearch) { onSearch(input.value.trim()); input.value = ''; }
                                        }}
                                        className="relative group w-full"
                                    >
                                        <div 
                                            className="relative flex items-center w-full rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-sm focus-within:shadow-md"
                                            style={{ 
                                                borderColor: `${theme.colors.primary.DEFAULT}33`,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        >
                                            <div className="pl-4 pr-2 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 transition-colors" style={{ color: theme.colors.primary.DEFAULT }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                name="q"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                className="w-full py-3.5 pr-2 text-base bg-transparent border-none focus:outline-none focus:ring-0"
                                                style={{ color: theme.colors.text.primary }}
                                            />
                                            <button
                                                type="submit"
                                                className="mr-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors interactive-effect shrink-0"
                                                style={{
                                                    backgroundColor: theme.colors.primary.DEFAULT,
                                                    color: '#ffffff'
                                                }}
                                            >
                                                Go
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}"""

if old_search_block in content:
    content = content.replace(old_search_block, new_search_block)
else:
    print("Could not find the exact old search block! Trying regex...")
    # fallback regex
    pattern = re.compile(r'\{/\* Mobile search \*/\}.*?</form>\s*</div>\s*\)\}', re.DOTALL)
    content = pattern.sub(new_search_block, content)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
