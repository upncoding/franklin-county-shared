/**
 * ADA Preview App for the shared package.
 * This is a minimal React app that renders every shared component
 * in both desktop and mobile states so the ADA test script can scan them.
 * It is NEVER included in the library build — only used by scripts/test-ada.js.
 */
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import "../styles/index.css";
import { APP_THEME } from '../theme/theme.config';
import {
    departmentsItems,
    residentsItems,
    visitorsItems,
    businessItems,
} from '../data/countyNavItems';

const NAV_ITEMS = [
    { label: 'Departments', items: departmentsItems, variant: 'fullWidth' as const, columns: 2 },
    { label: 'Residents', items: residentsItems, variant: 'fullWidth' as const, columns: 2 },
    { label: 'Visitors', items: visitorsItems, variant: 'fullWidth' as const, columns: 2 },
    { label: 'Business', items: businessItems, variant: 'fullWidth' as const, columns: 2 },
];

function PreviewApp() {
    return (
        <MemoryRouter>
            <Layout
                siteTitle="Component Preview"
                theme={APP_THEME}
                showTopbar={true}
                showNavbar={true}
                navItems={NAV_ITEMS}
                showFooter={true}
            >
                <div className="p-8 space-y-6" id="preview-content">
                    <h1>ADA Preview — Shared Components</h1>
                    <p>
                        This page renders all shared components so axe-core can scan them.
                        It is only served during the ADA test run.
                    </p>
                    <a href="#preview-content">Skip to content link test</a>
                    <section aria-labelledby="section-heading">
                        <h2 id="section-heading">Sample Section</h2>
                        <p>Paragraph content for context.</p>
                        <button type="button">Sample Button</button>
                    </section>
                </div>
            </Layout>
        </MemoryRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PreviewApp />
    </React.StrictMode>
);
