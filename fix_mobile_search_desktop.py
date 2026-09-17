import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

old_search_block = re.compile(
    r'\{/\* Mobile search \*/\}.*?</form>\s*</div>\s*\)\}', re.DOTALL
)

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
                                        className="w-full"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="search"
                                                name="q"
                                                placeholder="Search..."
                                                aria-label="Search"
                                                className="w-full px-4 py-3 pr-12 text-base rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 placeholder-white/70"
                                                style={{
                                                    backgroundColor: theme.colors.primary.DEFAULT,
                                                    borderColor: theme.colors.primary.dark,
                                                    color: theme.colors.text.onDark,
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                aria-label="Submit search"
                                                className="absolute right-3 p-1 transition-colors"
                                                style={{ color: theme.colors.text.onDark }}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}"""

content = old_search_block.sub(new_search_block, content)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
