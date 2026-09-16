import { useTheme } from '../theme/ThemeContext';
import { NavDropdown } from './NavDropdown';
import {
    departmentsItems,
    residentsItems,
    visitorsItems,
    businessItems,
    communitiesItems,
    howDoIItems,
} from '../data/countyNavItems';

/**
 * Topbar — Static county-wide utility navigation row.
 *
 * Renders the same set of county.gov section links on every Franklin County site.
 * No props. Hidden on mobile/tablet (lg:flex), visible on desktop only.
 * Include via showTopbar={true} on <Layout> (the default).
 */
export const Topbar = () => {
    const { theme } = useTheme();
    const headerTextColor = theme.colors.text.onDark;

    return (
        <div
            className="hidden xl:flex justify-end gap-2 border-b pb-2"
            style={{ 
                borderColor: 'rgba(255,255,255,0.1)',
                backgroundColor: theme.colors.bg.header 
            }}
        >
            <NavDropdown
                label="Departments"
                url="https://www.franklincountyny.gov/departments/index.php"
                items={departmentsItems}
                columns={3}
                textColor={headerTextColor}
                variant="fullWidth"
            />
            <NavDropdown
                label="Residents"
                url="https://www.franklincountyny.gov/residents/index.php"
                items={residentsItems}
                columns={2}
                textColor={headerTextColor}
                variant="fullWidth"
            />
            <NavDropdown
                label="Visitors"
                url="https://www.franklincountyny.gov/visitors/index.php"
                items={visitorsItems}
                columns={2}
                textColor={headerTextColor}
                variant="fullWidth"
            />
            <NavDropdown
                label="Business"
                url="https://www.franklincountyny.gov/business/index.php"
                items={businessItems}
                columns={1}
                textColor={headerTextColor}
                variant="fullWidth"
            />
            <NavDropdown
                label="Our Communities"
                url="https://www.franklincountyny.gov/our_communities/index.php"
                items={communitiesItems}
                columns={4}
                textColor={headerTextColor}
                variant="fullWidth"
            />
            <NavDropdown
                label="How Do I?"
                url="https://www.franklincountyny.gov/how_do_i/index.php"
                items={howDoIItems}
                columns={3}
                textColor={headerTextColor}
                variant="fullWidth"
            />
        </div>
    );
};
