import { jsx as v, jsxs as F, Fragment as ue } from "react/jsx-runtime";
import * as k from "react";
import { createContext as Kt, useEffect as X, useContext as Z, forwardRef as Uo, useState as rt, useRef as D, useLayoutEffect as Ci, useId as Ai, useInsertionEffect as hi, useMemo as Ft, useCallback as No, Children as Xa, isValidElement as _a, Fragment as Ko, createElement as $a, Component as tl } from "react";
import { Link as el, useLocation as Lo, NavLink as Mn } from "react-router-dom";
import * as Vo from "react-dom";
const nl = {
  name: "Vibrant Adirondack",
  colors: {
    // =====================================================
    // PRIMARY BRAND COLORS
    // =====================================================
    primary: {
      DEFAULT: "#166534",
      // Forest Green 800 (High Contrast)
      light: "#15803d",
      // Green 700
      dark: "#14532d"
      // Green 900
    },
    secondary: {
      DEFAULT: "#eab308",
      // Golden Yellow (Accents)
      light: "#facc15",
      dark: "#ca8a04"
      // Darkened for better contrast
    },
    // =====================================================
    // BACKGROUNDS
    // =====================================================
    bg: {
      main: "linear-gradient(to bottom right, #f0fdf4, #dcfce7, #f7fee7)",
      mainFrom: "#f0fdf4",
      mainVia: "#dcfce7",
      mainTo: "#f7fee7",
      card: "#ffffff",
      cardAlt: "linear-gradient(to bottom right, #ffffff, #fefefe, #ecfccb)",
      sidebar: "rgba(255, 255, 255, 0.95)",
      header: "linear-gradient(to right, #166534, #14532d, #166534)",
      footer: "#166534"
    },
    // =====================================================
    // TEXT COLORS
    // =====================================================
    text: {
      primary: "#052e16",
      // Main Text (Very Dark Green)
      secondary: "#14532d",
      // Secondary Text (Dark Green)
      muted: "#365314",
      // Muted Text
      onDark: "#ffffff"
      // Text on dark backgrounds (Header/Footer)
    },
    // =====================================================
    // INTERACTIVE STATES
    // =====================================================
    hover: {
      card: "#f0fdf4",
      // Card hover tint
      sidebar: "#ffffff",
      // Sidebar hover
      button: "#dcfce7",
      // Button hover
      link: "#ca8a04"
      // Link hover
    },
    // =====================================================
    // EFFECTS (Borders, Shadows, Glows)
    // =====================================================
    shadow: "rgba(21, 128, 61, 0.12)",
    shadowDark: "rgba(21, 128, 61, 0.3)",
    glow: "rgba(50, 205, 50, 0.4)",
    border: "rgba(22, 163, 74, 0.2)"
  }
}, il = () => nl, Do = Kt(void 0);
function sl({ children: t, theme: e }) {
  const n = e ?? il();
  return X(() => {
    const i = document.documentElement, s = n.colors;
    i.style.setProperty("--theme-bg-main", s.bg.main), i.style.setProperty("--theme-bg-main-from", s.bg.mainFrom), i.style.setProperty("--theme-bg-main-via", s.bg.mainVia), i.style.setProperty("--theme-bg-main-to", s.bg.mainTo), i.style.setProperty("--theme-bg-card", s.bg.card), i.style.setProperty("--theme-bg-card-alt", s.bg.cardAlt), i.style.setProperty("--theme-bg-sidebar", s.bg.sidebar), i.style.setProperty("--theme-bg-header", s.bg.header), i.style.setProperty("--theme-bg-footer", s.bg.footer), i.style.setProperty("--theme-text-primary", s.text.primary), i.style.setProperty("--theme-text-secondary", s.text.secondary), i.style.setProperty("--theme-text-muted", s.text.muted), i.style.setProperty("--theme-text-on-dark", s.text.onDark), i.style.setProperty("--theme-primary", s.primary.DEFAULT), i.style.setProperty("--theme-primary-light", s.primary.light), i.style.setProperty("--theme-primary-dark", s.primary.dark), i.style.setProperty("--theme-secondary", s.secondary.DEFAULT), i.style.setProperty("--theme-secondary-light", s.secondary.light), i.style.setProperty("--theme-secondary-dark", s.secondary.dark), i.style.setProperty("--theme-hover-card", s.hover.card), i.style.setProperty("--theme-hover-sidebar", s.hover.sidebar), i.style.setProperty("--theme-hover-button", s.hover.button), i.style.setProperty("--theme-hover-link", s.hover.link), i.style.setProperty("--theme-shadow", s.shadow), i.style.setProperty("--theme-shadow-dark", s.shadowDark), i.style.setProperty("--theme-glow", s.glow), i.style.setProperty("--theme-border", s.border);
  }, [n]), /* @__PURE__ */ v(Do.Provider, { value: { theme: n }, children: t });
}
function ft() {
  const t = Z(Do);
  if (t === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return t;
}
const Vt = Uo(
  ({ item: t, className: e, style: n, children: i, ...s }, r) => t.url.startsWith("http") ? /* @__PURE__ */ v(
    "a",
    {
      ref: r,
      href: t.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: e,
      style: n,
      ...s,
      children: i
    }
  ) : /* @__PURE__ */ v(
    el,
    {
      ref: r,
      to: t.url,
      className: e,
      style: n,
      ...s,
      children: i
    }
  )
);
Vt.displayName = "NavLinkOrA";
const Et = ({
  label: t,
  url: e = "#",
  items: n,
  columns: i = 1,
  textColor: s,
  variant: r = "standard"
}) => {
  const [o, a] = rt(!1), [c, g] = rt(null), l = D(null), I = D(null), u = D(null), C = D(null), A = D(null), h = D(!1), { theme: f } = ft(), d = Lo(), p = `nav-menu-${t.replace(/\s+/g, "-").toLowerCase()}`, y = n.some((E) => d.pathname === E.url ? !0 : E.subItems ? E.subItems.some((j) => d.pathname === j.url) : !1), x = d.pathname === e || y, R = () => {
    if (I.current) {
      const E = I.current.getBoundingClientRect();
      g(E.bottom + 8);
    }
    window.dispatchEvent(new CustomEvent("navdropdown:opened", { detail: { menuId: p } })), a(!0);
  }, S = () => {
    a(!1), h.current = !1, I.current?.focus();
  };
  X(() => {
    const E = (j) => {
      j.detail.menuId !== p && (a(!1), h.current = !1);
    };
    return window.addEventListener("navdropdown:opened", E), () => window.removeEventListener("navdropdown:opened", E);
  }, [p]), X(() => {
    const E = (j) => {
      l.current && !l.current.contains(j.target) && (a(!1), h.current = !1);
    };
    return o && document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [o]), X(() => {
    o && h.current && u.current && u.current.querySelector("a, button")?.focus();
  }, [o]);
  const m = (E) => {
    E.key === " " || E.key === "ArrowDown" ? (E.preventDefault(), h.current = !0, R()) : E.key === "Escape" && (a(!1), h.current = !1);
  }, w = (E) => {
    E.key === "Enter" || E.key === " " || E.key === "ArrowDown" ? (E.preventDefault(), h.current = !0, o ? a(!1) : R()) : E.key === "Escape" && (a(!1), h.current = !1);
  }, P = (E) => {
    if (E.key === "Escape") {
      E.preventDefault(), S();
      return;
    }
    if (E.key === "ArrowDown" || E.key === "ArrowUp") {
      if (E.preventDefault(), !u.current) return;
      const j = Array.from(u.current.querySelectorAll("a, button")), L = j.indexOf(document.activeElement);
      E.key === "ArrowDown" ? j[(L + 1) % j.length]?.focus() : j[(L - 1 + j.length) % j.length]?.focus();
    }
    if (E.key === "Tab") {
      const j = Array.from(u.current?.querySelectorAll("a, button") ?? []), L = j[j.length - 1];
      !E.shiftKey && document.activeElement === L && a(!1), E.shiftKey && document.activeElement === j[0] && (E.preventDefault(), S());
    }
  }, T = () => {
    C.current && (window.clearTimeout(C.current), C.current = null), !o && !A.current && (A.current = window.setTimeout(() => {
      R(), A.current = null;
    }, 150));
  }, N = () => {
    A.current && (window.clearTimeout(A.current), A.current = null), C.current = window.setTimeout(() => {
      a(!1), C.current = null;
    }, 300);
  }, Q = () => {
    switch (i) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-4";
      default:
        return "md:grid-cols-1";
    }
  }, Y = o || x ? f.colors.secondary.DEFAULT : s || "rgba(255, 255, 255, 0.9)", M = "mx-4 my-2 text-xs font-bold uppercase tracking-widest transition-colors inline-block relative z-20 bg-transparent border-0 cursor-pointer p-0";
  return /* @__PURE__ */ F("div", { ref: l, className: "relative inline-block", onMouseLeave: N, children: [
    e !== "#" ? /* @__PURE__ */ v(
      Vt,
      {
        ref: I,
        item: { label: t, url: e },
        "aria-expanded": o,
        "aria-controls": p,
        className: M,
        style: { color: Y },
        onMouseEnter: T,
        onKeyDown: m,
        children: t
      }
    ) : /* @__PURE__ */ v(
      "button",
      {
        ref: I,
        type: "button",
        "aria-expanded": o,
        "aria-controls": p,
        className: M,
        style: { color: Y },
        onMouseEnter: T,
        onKeyDown: w,
        onClick: () => a((E) => !E),
        children: t
      }
    ),
    r === "fullWidth" ? (
      /* ── Mega Menu (Full Width) ── */
      /* @__PURE__ */ v(
        "div",
        {
          id: p,
          ref: u,
          "aria-label": t,
          ...o ? {} : { inert: !0 },
          className: `fixed left-0 w-full z-[100] transition-all duration-300 ease-out ${o ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-2 invisible pointer-events-none"}`,
          style: { top: c ? `${c}px` : "var(--fc-header-height, 50px)" },
          onMouseEnter: T,
          onKeyDown: P,
          children: /* @__PURE__ */ v("div", { className: "container mx-auto px-6", onMouseLeave: N, children: /* @__PURE__ */ v(
            "div",
            {
              className: "rounded-b-lg shadow-2xl elevation-xl border-t overflow-hidden text-left mt-0",
              style: { backgroundColor: f.colors.bg.card, borderTopColor: f.colors.border },
              children: /* @__PURE__ */ v("div", { className: `grid ${Q()} gap-4 p-8`, children: n.map((E, j) => /* @__PURE__ */ F("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ v(
                  Vt,
                  {
                    item: E,
                    tabIndex: o ? 0 : -1,
                    className: "block px-4 py-2 text-sm font-medium rounded transition-all duration-200 interactive-effect border border-transparent",
                    style: { color: f.colors.text.primary },
                    children: E.label
                  }
                ),
                E.subItems && E.subItems.length > 0 && /* @__PURE__ */ v(
                  "div",
                  {
                    className: "flex flex-col ml-4 mt-1 border-l-2 pl-2",
                    style: { borderColor: `${f.colors.border || "#e5e7eb"}80` },
                    children: E.subItems.map((L, O) => /* @__PURE__ */ v(
                      Vt,
                      {
                        item: L,
                        tabIndex: o ? 0 : -1,
                        className: "block px-4 py-1.5 text-xs rounded transition-all duration-200 opacity-90 interactive-effect border border-transparent",
                        style: { color: f.colors.text.primary },
                        children: L.label
                      },
                      O
                    ))
                  }
                )
              ] }, j)) })
            }
          ) })
        }
      )
    ) : (
      /* ── Standard Dropdown (Absolute) ── */
      /* @__PURE__ */ v(
        "div",
        {
          id: p,
          ref: u,
          "aria-label": t,
          ...o ? {} : { inert: !0 },
          className: `absolute left-1/2 -translate-x-1/2 top-full pt-4 z-[100] transition-all duration-300 ease-out ${o ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-2 invisible pointer-events-none"}`,
          onMouseEnter: T,
          onKeyDown: P,
          children: /* @__PURE__ */ F(
            "div",
            {
              className: "w-75 rounded-2xl shadow-2xl elevation-xl border overflow-hidden text-left",
              style: { backgroundColor: f.colors.bg.card, borderColor: f.colors.border },
              onMouseLeave: N,
              children: [
                /* @__PURE__ */ v("div", { className: `grid ${Q()} gap-2 p-4`, children: n.map((E, j) => /* @__PURE__ */ F("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ v(
                    Vt,
                    {
                      item: E,
                      tabIndex: o ? 0 : -1,
                      className: "block px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 interactive-effect border border-transparent",
                      style: { color: f.colors.text.primary },
                      children: E.label
                    }
                  ),
                  E.subItems && E.subItems.length > 0 && /* @__PURE__ */ v(
                    "div",
                    {
                      className: "flex flex-col ml-4 mt-1 border-l-2 pl-2",
                      style: { borderColor: `${f.colors.border || "#e5e7eb"}80` },
                      children: E.subItems.map((L, O) => /* @__PURE__ */ v(
                        Vt,
                        {
                          item: L,
                          tabIndex: o ? 0 : -1,
                          className: "block px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 opacity-80 interactive-effect border border-transparent hover:opacity-100",
                          style: { color: f.colors.text.primary },
                          children: L.label
                        },
                        O
                      ))
                    }
                  )
                ] }, j)) }),
                /* @__PURE__ */ v("div", { className: "h-1 w-full", style: { backgroundColor: f.colors.secondary.DEFAULT } })
              ]
            }
          )
        }
      )
    )
  ] });
}, Go = [
  // Administrative
  { label: "Board of Elections", url: "https://www.franklincountyny.gov/departments/administrative/board_of_elections/index.php" },
  { label: "Board of Ethics", url: "https://www.franklincountyny.gov/departments/administrative/board_of_ethics/index.php" },
  { label: "Board of Legislature", url: "https://www.franklincountyny.gov/departments/administrative/board_of_legislators/index.php" },
  { label: "County Clerk", url: "https://www.franklincountyny.gov/departments/administrative/county_clerk/index.php" },
  { label: "County Manager", url: "https://www.franklincountyny.gov/departments/administrative/county_manager/index.php" },
  { label: "County Planning", url: "https://www.franklincountyny.gov/departments/administrative/county_planner.php" },
  { label: "Data Processing & Information Services", url: "https://www.franklincountyny.gov/departments/administrative/data_processing___information_services/index.php" },
  { label: "Department of Motor Vehicles", url: "https://www.franklincountyny.gov/departments/administrative/county_clerk/services/department_of_motor_vehicles.php" },
  { label: "Personnel/Self-Insurance Office", url: "https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/index.php" },
  { label: "Records Management Department", url: "https://www.franklincountyny.gov/departments/administrative/records_management_department/index.php" },
  // Finance
  { label: "Auditor", url: "https://www.franklincountyny.gov/departments/finance/auditor/index.php" },
  { label: "Real Property Tax Services", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php" },
  { label: "Treasurer", url: "https://www.franklincountyny.gov/departments/finance/treasurer/index.php" },
  // Human Services
  { label: "Community Services", url: "/" },
  { label: "Office for the Aging", url: "https://www.franklincountyny.gov/departments/human_services/office_for_the_aging/index.php" },
  { label: "Public Health", url: "https://www.franklincountyny.gov/departments/human_services/public_health/index.php" },
  { label: "Social Services", url: "https://www.franklincountyny.gov/departments/human_services/social_services/index.php" },
  { label: "Veterans Services Agency", url: "https://www.franklincountyny.gov/departments/human_services/veterans_services_agency/index.php" },
  { label: "Youth Bureau", url: "https://www.franklincountyny.gov/departments/human_services/youth_bureau/index.php" },
  // Business
  { label: "Economic Development", url: "https://www.franklincountyny.gov/business/economic_development.php" },
  // Public Safety
  { label: "District Attorney's Office", url: "https://www.franklincountyny.gov/departments/public_safety/district_attorney_s_office/index.php" },
  { label: "Emergency Services", url: "https://www.franklincountyny.gov/departments/public_safety/emergency_services/911_number_addressing.php" },
  { label: "Probation", url: "https://www.franklincountyny.gov/departments/public_safety/probation/index.php" },
  { label: "Public Defender", url: "https://www.franklincountyny.gov/departments/public_safety/public_defender/index.php" },
  { label: "Sheriff's Department", url: "https://www.franklincountyny.gov/departments/public_safety/sheriff_s_department/index.php" },
  { label: "Soil and Water", url: "https://www.franklincountyny.gov/departments/public_safety/soil_and_water/index.php" },
  { label: "Stop DWI", url: "https://www.franklincountyny.gov/departments/public_safety/stop_dwi/index.php" },
  { label: "Traffic Safety Board", url: "https://www.franklincountyny.gov/departments/public_safety/traffic_safety_board/index.php" },
  // Public Works & Services
  { label: "Buildings & Grounds", url: "https://www.franklincountyny.gov/departments/buildings___grounds/index.php" },
  { label: "Highway Department", url: "https://www.franklincountyny.gov/departments/highway_department/index.php" },
  { label: "Transportation", url: "https://www.franklincountyny.gov/departments/transportation/index.php" },
  { label: "Weights and Measures & County Sealer", url: "https://www.franklincountyny.gov/departments/weights_and_measures___county_sealer/index.php" }
], Qo = [
  { label: "Community Groups", url: "https://www.franklincountyny.gov/residents/community_groups.php" },
  { label: "Public Health Services", url: "https://www.franklincountyny.gov/departments/human_services/public_health/services.php" },
  { label: "Social Services", url: "https://www.franklincountyny.gov/departments/human_services/social_services/services.php" },
  { label: "Forms and Documents", url: "https://www.franklincountyny.gov/residents/forms_and_documents.php" },
  { label: "Public Transportation", url: "https://www.franklincountyny.gov/departments/transportation/public_transportation/" },
  { label: "COVID-19 Guidance", url: "https://www.franklincountyny.gov/residents/covid-19_guidance/index.php" }
], Jo = [
  { label: "Adirondack Mountain Club", url: "https://www.adk.org/" },
  { label: "Adirondack Scenic Byways", url: "http://www.adirondackvic.org/" },
  { label: "Adirondack Park Visitor Interpretive Centers", url: "https://visitadirondacks.com/what-to-do/scenic-byways" },
  { label: "Explore Adirondack Frontier", url: "https://www.exploreadirondackfrontier.com/" },
  { label: "History", url: "https://www.franklincountyny.gov/visitors/history.php" },
  { label: "Visit Adirondacks", url: "http://visitadirondacks.com/" },
  { label: "Visit Malone", url: "https://www.visitmalone.com/" },
  { label: "Visit Saranac Lake", url: "https://www.saranaclake.com/" },
  { label: "Visit Tupper Lake", url: "https://www.tupperlake.com/" },
  { label: "Weather", url: "https://www.franklincountyny.gov/visitors/weather.php" }
], zo = [
  { label: "Economic Development", url: "https://www.franklincountyny.gov/business/economic_development.php" },
  { label: "Purchasing/Bids", url: "https://www.franklincountyny.gov/business/purchasing_bids.php" },
  { label: "Malone Chamber of Commerce", url: "http://visitmalone.com/" },
  { label: "Saranac Lake Chamber of Commerce", url: "http://www.slareachamber.org/" },
  { label: "Tupper Lake Chamber of Commerce", url: "https://www.tupperlake.com/discover-my-tupper-lake" }
], Bo = [
  { label: "Akwesasne", url: "https://www.srmt-nsn.gov/" },
  { label: "Bangor", url: "https://www.franklincountyny.gov/our_communities/bangor.php" },
  { label: "Bellmont", url: "https://www.townofbellmontny.org/" },
  { label: "Bombay", url: "http://www.bombayny.us/" },
  { label: "Brainardsville", url: "https://www.franklincountyny.gov/our_communities/brainardsville.php" },
  { label: "Brandon", url: "https://www.franklincountyny.gov/our_communities/brandon.php" },
  { label: "Brighton", url: "http://www.townofbrighton.net/" },
  { label: "Brushton", url: "https://www.franklincountyny.gov/our_communities/brushton.php" },
  { label: "Burke", url: "https://www.franklincountyny.gov/our_communities/burke.php" },
  { label: "Chateaugay", url: "https://www.chateaugayny.org/" },
  { label: "Constable", url: "https://www.townofconstable.com/" },
  { label: "Dickinson", url: "https://www.franklincountyny.gov/our_communities/dickinson.php" },
  { label: "Duane", url: "https://www.franklincountyny.gov/our_communities/duane.php" },
  { label: "Franklin", url: "https://www.townoffranklin.com/" },
  { label: "Fort Covington", url: "https://www.franklincountyny.gov/our_communities/fort_covington.php" },
  { label: "Harrietstown", url: "https://www.harrietstown.org/" },
  { label: "Malone", url: "https://www.malonetown.com/" },
  { label: "Moira", url: "https://www.franklincountyny.gov/our_communities/moira.php" },
  { label: "Santa Clara", url: "https://www.townofsantaclara.com/" },
  { label: "Saranac Lake", url: "http://www.saranaclakeny.gov/" },
  { label: "Tupper Lake", url: "https://www.tupperlake.com/" },
  { label: "Waverly", url: "https://www.franklincountyny.gov/our_communities/waverly.php" },
  { label: "Westville", url: "https://www.townofwestvilleny.org/" }
], Yo = [
  {
    label: "Apply For/Obtain",
    url: "https://www.franklincountyny.gov/how_do_i/apply_for_obtain/index.php",
    subItems: [
      { label: "Civil Service Exams", url: "https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/exam_announcements.php" },
      { label: "District Attorney's Traffic Diversion/Plea Reduction Program", url: "https://www.franklincountyny.gov/departments/public_safety/district_attorney_s_office/services/traffic_diversion___plea_reduction_program.php" },
      { label: "Freedom Of Information Law (FOIL Requests)", url: "https://www.franklincountyny.gov/departments/finance/freedom_of_information_law_(foil_requests).php" },
      { label: "HEAP", url: "https://www.franklincountyny.gov/departments/human_services/social_services/services.php" },
      { label: "Job Openings", url: "https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/employment_opportunities.php" },
      { label: "Pistol Permits", url: "https://www.franklincountyny.gov/departments/administrative/county_clerk/services/pistol_permits.php" },
      { label: "Public Defender", url: "https://www.franklincountyny.gov/departments/public_safety/public_defender/index.php" },
      { label: "Public Health Training", url: "https://www.franklincountyny.gov/how_do_i/apply_for_obtain/public_health_training.php" },
      { label: "Renew my Driver's License", url: "https://www.franklincountyny.gov/how_do_i/apply_for_obtain/renew_my_driver_s_license.php" },
      { label: "Running for Office", url: "http://www.elections.ny.gov/RunningOffice.html" },
      { label: "United States Passports", url: "https://www.franklincountyny.gov/departments/administrative/county_clerk/services/united_states_passports.php" }
    ]
  },
  {
    label: "Contact Us",
    url: "https://www.franklincountyny.gov/how_do_i/new_page/index.php",
    subItems: [
      { label: "Citizen Request Form", url: "https://www.franklincountyny.gov/citizen_request_form/index.php" },
      { label: "Staff Directory", url: "https://www.franklincountyny.gov/how_do_i/new_page/contact_us/index.php" },
      { label: "Poison Control", url: "https://www.franklincountyny.gov/how_do_i/new_page/poison_control.php" }
    ]
  },
  {
    label: "File/Request/Register",
    url: "https://www.franklincountyny.gov/how_do_i/file_request_register/index.php",
    subItems: [
      { label: "Vote", url: "https://www.franklincountyny.gov/departments/administrative/board_of_elections/index.php" },
      { label: "Whistleblower Report", url: "https://www.franklincountyny.gov/how_do_i/file_request_register/whistleblower_report.php" }
    ]
  },
  {
    label: "Find/Learn About",
    url: "https://www.franklincountyny.gov/how_do_i/find_learn_about/index.php",
    subItems: [
      { label: "County Landfill", url: "http://www.cfswma.com/" },
      { label: "Fair Housing Program", url: "https://www.franklincountyny.gov/departments/administrative/county_manager/fair_housing_program.php" }
    ]
  },
  {
    label: "Read/View",
    url: "https://www.franklincountyny.gov/how_do_i/read_view/index.php",
    subItems: [
      { label: "Criminal Court Reports", url: "https://www.franklincountyny.gov/departments/public_safety/probation/criminal_court_reports.php" },
      { label: "Final Assessment Roll", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-146" },
      { label: "Forms and Documents", url: "https://www.franklincountyny.gov/residents/forms_and_documents.php" },
      { label: "Job Descriptions", url: "https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/index.php#outer-114" },
      { label: "School Tax Roll", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-147" },
      { label: "Tentative Assessment Roll", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-144" },
      { label: "Town & County Tax Roll", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-143" },
      { label: "Village Tax Roll", url: "https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-145" }
    ]
  }
], ol = () => {
  const { theme: t } = ft(), e = t.colors.text.onDark;
  return /* @__PURE__ */ F(
    "div",
    {
      className: "hidden xl:flex justify-end gap-2 border-b pb-2",
      style: {
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: t.colors.bg.header
      },
      children: [
        /* @__PURE__ */ v(
          Et,
          {
            label: "Departments",
            url: "https://www.franklincountyny.gov/departments/index.php",
            items: Go,
            columns: 3,
            textColor: e,
            variant: "fullWidth"
          }
        ),
        /* @__PURE__ */ v(
          Et,
          {
            label: "Residents",
            url: "https://www.franklincountyny.gov/residents/index.php",
            items: Qo,
            columns: 2,
            textColor: e,
            variant: "fullWidth"
          }
        ),
        /* @__PURE__ */ v(
          Et,
          {
            label: "Visitors",
            url: "https://www.franklincountyny.gov/visitors/index.php",
            items: Jo,
            columns: 2,
            textColor: e,
            variant: "fullWidth"
          }
        ),
        /* @__PURE__ */ v(
          Et,
          {
            label: "Business",
            url: "https://www.franklincountyny.gov/business/index.php",
            items: zo,
            columns: 1,
            textColor: e,
            variant: "fullWidth"
          }
        ),
        /* @__PURE__ */ v(
          Et,
          {
            label: "Our Communities",
            url: "https://www.franklincountyny.gov/our_communities/index.php",
            items: Bo,
            columns: 4,
            textColor: e,
            variant: "fullWidth"
          }
        ),
        /* @__PURE__ */ v(
          Et,
          {
            label: "How Do I?",
            url: "https://www.franklincountyny.gov/how_do_i/index.php",
            items: Yo,
            columns: 3,
            textColor: e,
            variant: "fullWidth"
          }
        )
      ]
    }
  );
}, Zo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAAE1CAYAAACSiunlAAAACXBIWXMAAAsTAAALEwEAmpwYAAA4KmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAyMC0wNy0xN1QyMjoyNTozNi0wNDowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDIwLTA3LTE3VDIyOjI2OjM0LTA0OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMC0wNy0xN1QyMjoyNjozNC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpjYjQ5ZTNjNi0yNGQ4LTQ0OGItODA5MS1mYjA0Y2JiMWFiODM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6Y2I0OWUzYzYtMjRkOC00NDhiLTgwOTEtZmIwNGNiYjFhYjgzPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2I0OWUzYzYtMjRkOC00NDhiLTgwOTEtZmIwNGNiYjFhYjgzPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNiNDllM2M2LTI0ZDgtNDQ4Yi04MDkxLWZiMDRjYmIxYWI4Mzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMC0wNy0xN1QyMjoyNTozNi0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjMyMjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zMDk8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAg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", rl = ({
  to: t,
  label: e,
  onClick: n,
  textColor: i
}) => {
  const { theme: s } = ft();
  return /* @__PURE__ */ v(
    Mn,
    {
      to: t,
      onClick: n,
      className: ({ isActive: r }) => `block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl active:scale-95 ${r ? "" : "interactive-effect"}`,
      style: ({ isActive: r }) => ({
        color: r ? s.colors.secondary.DEFAULT : i || s.colors.text.primary,
        backgroundColor: r ? `${s.colors.secondary.DEFAULT}10` : "transparent"
      }),
      children: e
    }
  );
}, al = ({
  onSearch: t,
  isMobile: e = !1
}) => {
  const { theme: n } = ft();
  return /* @__PURE__ */ v("form", { onSubmit: (s) => {
    s.preventDefault();
    const o = s.currentTarget.elements.namedItem("q");
    o.value.trim() && t && (t(o.value.trim()), o.value = "");
  }, role: "search", "aria-label": "Site search", className: e ? "w-full" : "", children: /* @__PURE__ */ F("div", { className: "relative flex items-center", children: [
    /* @__PURE__ */ v(
      "input",
      {
        type: "search",
        name: "q",
        placeholder: "Search...",
        "aria-label": "Search",
        className: `${e ? "w-full" : "w-48"} px-4 py-2 pr-10 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2`,
        style: {
          backgroundColor: "rgba(255,255,255,0.15)",
          borderColor: "rgba(255,255,255,0.3)",
          color: n.colors.text.onDark
        }
      }
    ),
    /* @__PURE__ */ v(
      "button",
      {
        type: "submit",
        "aria-label": "Submit search",
        className: "absolute right-2 p-1 transition-colors",
        style: { color: n.colors.text.onDark },
        children: /* @__PURE__ */ v("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ v("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
      }
    )
  ] }) });
}, ll = ({
  siteTitle: t,
  navItems: e = [],
  showTopbar: n = !1,
  showSearch: i = !1,
  onSearch: s,
  isMobileMenuOpen: r,
  onMobileMenuToggle: o,
  isMobileOrTablet: a,
  isScrolled: c
}) => {
  const { theme: g } = ft(), l = g.colors.text.onDark, I = a, u = e.slice(0, 8);
  return process.env.NODE_ENV !== "production" && e.length > 8 && console.warn(
    "[Navbar] navItems exceeds the 8-item maximum. Only the first 8 will be rendered."
  ), /* @__PURE__ */ F("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ F("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ F("div", { className: "relative group shrink-0", children: [
        /* @__PURE__ */ v("div", { className: "absolute -inset-1 bg-linear-to-r from-county-gold-light to-county-gold rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300" }),
        /* @__PURE__ */ v(
          "img",
          {
            src: Zo,
            alt: "Franklin County Seal",
            className: `relative transition-all duration-500 object-contain ${c || r ? "h-12 w-12" : "h-16 w-16 md:h-20 md:w-20"}`
          }
        )
      ] }),
      /* @__PURE__ */ F("div", { className: "flex flex-col transition-opacity duration-300 opacity-100", style: { color: l }, children: [
        /* @__PURE__ */ v("span", { className: "text-xs uppercase tracking-[0.3em] font-light leading-tight", children: "Franklin County" }),
        /* @__PURE__ */ v("span", { className: "font-serif font-black text-xl md:text-2xl leading-none tracking-tight", children: t })
      ] })
    ] }),
    u.length > 0 && /* @__PURE__ */ F(
      "nav",
      {
        className: `${I ? "hidden" : "hidden xl:flex"} items-center gap-4`,
        "aria-label": "Main navigation",
        children: [
          u.map(
            (C, A) => C.items && C.items.length > 0 ? /* @__PURE__ */ v(
              Et,
              {
                label: C.label,
                url: C.url,
                items: C.items,
                columns: C.columns,
                textColor: l,
                variant: C.variant
              },
              A
            ) : /* @__PURE__ */ v(
              rl,
              {
                to: C.url || "/",
                label: C.label,
                textColor: l
              },
              A
            )
          ),
          i && /* @__PURE__ */ v(al, { onSearch: s })
        ]
      }
    ),
    (e.length > 0 || n) && /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: `${a ? "block" : "xl:hidden"} p-2 cursor-pointer transition-opacity rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-county-gold`,
        style: { color: l },
        onClick: o,
        "aria-label": r ? "Close navigation menu" : "Open navigation menu",
        "aria-expanded": r,
        "aria-controls": "fc-mobile-nav",
        onMouseEnter: (C) => {
          C.currentTarget.querySelectorAll("span").forEach((A) => A.style.backgroundColor = g.colors.secondary.DEFAULT);
        },
        onMouseLeave: (C) => {
          C.currentTarget.querySelectorAll("span").forEach((A) => A.style.backgroundColor = l);
        },
        children: /* @__PURE__ */ F("div", { className: "space-y-1.5", "aria-hidden": "true", children: [
          /* @__PURE__ */ v(
            "span",
            {
              className: "block w-8 h-0.5 transition-all duration-300",
              style: { backgroundColor: l, transform: r ? "translateY(8px) rotate(45deg)" : "none" }
            }
          ),
          /* @__PURE__ */ v(
            "span",
            {
              className: `block w-8 h-0.5 transition-all duration-300 ${r ? "opacity-0" : ""}`,
              style: { backgroundColor: l }
            }
          ),
          /* @__PURE__ */ v(
            "span",
            {
              className: "block w-8 h-0.5 transition-all duration-300",
              style: { backgroundColor: l, transform: r ? "translateY(-8px) rotate(-45deg)" : "none" }
            }
          )
        ] })
      }
    )
  ] });
}, gl = (t) => {
  const e = encodeURIComponent(t), n = navigator.userAgent || navigator.vendor || window.opera;
  return /iPad|iPhone|iPod/.test(n) && !window.MSStream ? `maps://maps.apple.com/?q=${e}` : /android/i.test(n) ? `geo:0,0?q=${e}` : `https://www.google.com/maps/search/?api=1&query=${e}`;
}, $i = "518-891-2280", cl = "36 Church St Saranac Lake NY 12983", Il = /* @__PURE__ */ F(ue, { children: [
  "36 Church St",
  /* @__PURE__ */ v("br", {}),
  "Saranac Lake, NY 12983",
  /* @__PURE__ */ v("br", {}),
  "P.O. Box 1337"
] }), ul = ({
  phone: t = $i,
  address: e = Il
}) => {
  const { theme: n } = ft(), i = t === $i ? cl : void 0;
  return /* @__PURE__ */ v(
    "footer",
    {
      "aria-label": "Site footer",
      className: "pt-12 pb-8 border-t-8",
      style: {
        backgroundColor: n.colors.bg.footer,
        borderTopColor: n.colors.secondary.DEFAULT,
        color: n.colors.text.onDark
      },
      children: /* @__PURE__ */ F("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ F("div", { className: "grid md:grid-cols-3 gap-8 mb-8 items-start", children: [
          /* @__PURE__ */ F("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ v("div", { className: "bg-white/10 p-4 rounded-full", "aria-hidden": "true", children: /* @__PURE__ */ v(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                style: { color: n.colors.secondary.DEFAULT },
                children: /* @__PURE__ */ v(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ F("div", { children: [
              /* @__PURE__ */ v("div", { className: "text-xs uppercase tracking-wider mb-1", style: { color: n.colors.text.onDark }, children: "Contact Us" }),
              /* @__PURE__ */ v(
                "a",
                {
                  href: `tel:${t.replace(/\D/g, "")}`,
                  className: "text-lg font-semibold transition-colors",
                  style: { color: n.colors.text.onDark },
                  onMouseEnter: (s) => s.currentTarget.style.color = n.colors.secondary.DEFAULT,
                  onMouseLeave: (s) => s.currentTarget.style.color = n.colors.text.onDark,
                  "aria-label": `Call ${t}`,
                  children: t
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ F("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ v("div", { className: "bg-white/10 p-4 rounded-full", "aria-hidden": "true", children: /* @__PURE__ */ F(
              "svg",
              {
                className: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                style: { color: n.colors.secondary.DEFAULT },
                children: [
                  /* @__PURE__ */ v(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }
                  ),
                  /* @__PURE__ */ v(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ F("div", { children: [
              /* @__PURE__ */ v("div", { className: "text-xs uppercase tracking-wider mb-1", style: { color: n.colors.text.onDark }, children: "County Office" }),
              i ? /* @__PURE__ */ v(
                "a",
                {
                  href: gl(i),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-sm font-medium leading-snug transition-colors cursor-pointer block",
                  style: { color: n.colors.text.onDark },
                  onMouseEnter: (s) => s.currentTarget.style.color = n.colors.secondary.DEFAULT,
                  onMouseLeave: (s) => s.currentTarget.style.color = n.colors.text.onDark,
                  "aria-label": "Open office address in maps",
                  children: e
                }
              ) : /* @__PURE__ */ v("address", { className: "text-sm font-medium leading-snug not-italic", style: { color: n.colors.text.onDark }, children: e })
            ] })
          ] }),
          /* @__PURE__ */ F("div", { className: "flex items-center gap-4 md:justify-end", children: [
            /* @__PURE__ */ v("div", { children: /* @__PURE__ */ F(
              "a",
              {
                href: "/",
                className: "text-sm font-medium transition-colors block mb-2",
                style: { color: n.colors.text.onDark },
                onMouseEnter: (s) => s.currentTarget.style.color = n.colors.secondary.DEFAULT,
                onMouseLeave: (s) => s.currentTarget.style.color = n.colors.text.onDark,
                children: [
                  "Franklin County",
                  /* @__PURE__ */ v("br", {}),
                  "Community Services"
                ]
              }
            ) }),
            /* @__PURE__ */ v(
              "img",
              {
                src: Zo,
                alt: "Franklin County Seal",
                className: "h-20 w-20 opacity-90"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ v("div", { className: "pt-6 border-t border-white/10 text-center", children: /* @__PURE__ */ F("p", { className: "text-xs", style: { color: n.colors.text.onDark }, children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Franklin County, NY"
        ] }) })
      ] })
    }
  );
};
function Cl(t) {
  const e = [];
  for (const n of t)
    if (n.items && n.items.length > 0) {
      for (const i of n.items)
        if (e.push({ label: i.label, url: i.url, groupLabel: n.label }), i.subItems)
          for (const s of i.subItems)
            e.push({ label: s.label, url: s.url, groupLabel: n.label });
    } else n.url && e.push({ label: n.label, url: n.url });
  return e;
}
function Al({
  children: t,
  siteTitle: e,
  showTopbar: n = !0,
  showNavbar: i = !0,
  showFooter: s = !0,
  navItems: r = [],
  showSearch: o = !1,
  onSearch: a,
  footerPhone: c,
  footerAddress: g,
  heroImage: l,
  heroVideo: I,
  heroTitle: u,
  heroSubtitle: C
}) {
  const [A, h] = rt(!1), [f, d] = rt(!1), [p, y] = rt(!1), [x, R] = rt(80), S = Lo(), { theme: m } = ft(), w = D(null), P = D(null), T = D(null), N = D(null);
  X(() => {
    const M = navigator.userAgent || navigator.vendor || window.opera || "", E = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(M), j = /macintosh/i.test(M) && navigator.maxTouchPoints > 1;
    y(!!(E || j));
  }, []), X(() => {
    const M = () => h(window.scrollY > 50);
    return window.addEventListener("scroll", M), () => window.removeEventListener("scroll", M);
  }, []), X(() => {
    if (!T.current || !N.current) return;
    const M = () => {
      const j = T.current.offsetHeight;
      R(j), N.current.style.setProperty("--fc-header-height", `${j}px`);
    };
    M();
    const E = new ResizeObserver(M);
    return E.observe(T.current), () => E.disconnect();
  }, [n, A]), X(() => {
    d(!1);
  }, [S]), X(() => (document.body.style.overflow = f ? "hidden" : "unset", () => {
    document.body.style.overflow = "unset";
  }), [f]), X(() => {
    f && P.current ? P.current.querySelector(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    )?.focus() : f || w.current?.focus();
  }, [f]);
  const Q = Cl(r), Y = S.pathname === "/";
  return /* @__PURE__ */ F("div", { ref: N, className: "min-h-screen flex flex-col font-sans text-county-charcoal", children: [
    /* @__PURE__ */ v("a", { href: "#fc-main-content", className: "skip-to-content", children: "Skip to main content" }),
    i && /* @__PURE__ */ v(
      "header",
      {
        ref: T,
        role: "banner",
        className: `fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${A ? "py-2 shadow-2xl" : "py-4 text-shadow"}`,
        style: {
          backgroundColor: m.colors.primary.DEFAULT,
          background: m.colors.bg.header
        },
        children: /* @__PURE__ */ F("div", { className: "container mx-auto px-6", children: [
          n && /* @__PURE__ */ v(ol, {}),
          /* @__PURE__ */ v(
            ll,
            {
              siteTitle: e,
              navItems: r,
              showTopbar: n,
              showSearch: o,
              onSearch: a,
              isMobileMenuOpen: f,
              onMobileMenuToggle: () => d((M) => !M),
              isMobileOrTablet: p,
              isScrolled: A
            }
          )
        ] })
      }
    ),
    i && /* @__PURE__ */ v(
      "nav",
      {
        id: "fc-mobile-nav",
        ref: P,
        "aria-label": "Mobile navigation",
        "aria-hidden": !f,
        ...f ? {} : { inert: !0 },
        className: `fixed inset-0 z-[45] flex flex-col transition-all duration-500 ${f ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`,
        style: { backgroundColor: "#ffffff", background: m.colors.bg.sidebar },
        onKeyDown: (M) => {
          if (M.key === "Escape") {
            d(!1);
            return;
          }
        },
        children: /* @__PURE__ */ v("div", { className: "overflow-y-auto flex-1 pt-32 pb-8", tabIndex: 0, role: "region", "aria-label": "Mobile Navigation Content", children: /* @__PURE__ */ F("div", { className: "container mx-auto px-6", children: [
          o && /* @__PURE__ */ v("div", { className: "px-6 w-full max-w-md mx-auto mb-6", children: /* @__PURE__ */ v(
            "form",
            {
              role: "search",
              "aria-label": "Site search",
              onSubmit: (M) => {
                M.preventDefault();
                const E = M.currentTarget.elements.namedItem("q");
                E.value.trim() && a && (a(E.value.trim()), E.value = "");
              },
              className: "w-full",
              children: /* @__PURE__ */ v(
                "input",
                {
                  type: "search",
                  name: "q",
                  placeholder: "Search...",
                  "aria-label": "Search",
                  className: "w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2",
                  style: { borderColor: m.colors.border, color: m.colors.text.primary }
                }
              )
            }
          ) }),
          /* @__PURE__ */ v("nav", { className: "flex flex-col gap-8 text-center mb-12", "aria-label": "Mobile site navigation", children: r.map((M, E) => {
            if (M.items && M.items.length > 0) {
              const j = M.items;
              return /* @__PURE__ */ F("div", { className: "space-y-1", children: [
                /* @__PURE__ */ v(
                  "span",
                  {
                    className: "text-[10px] font-black uppercase tracking-[0.2em] mb-4 block",
                    style: { color: m.colors.secondary.dark },
                    children: M.label
                  }
                ),
                /* @__PURE__ */ v("div", { className: "flex flex-col gap-1", children: j.map((L, O) => /* @__PURE__ */ v(
                  Mn,
                  {
                    to: L.url,
                    onClick: () => d(!1),
                    className: ({ isActive: U }) => `block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${U ? "" : "interactive-effect"}`,
                    style: ({ isActive: U }) => ({
                      color: U ? m.colors.secondary.DEFAULT : m.colors.text.primary,
                      backgroundColor: U ? `${m.colors.secondary.DEFAULT}10` : "transparent"
                    }),
                    children: L.label
                  },
                  O
                )) })
              ] }, E);
            }
            return /* @__PURE__ */ v(
              Mn,
              {
                to: M.url || "/",
                onClick: () => d(!1),
                className: ({ isActive: j }) => `block w-full text-center text-2xl md:text-sm font-bold uppercase tracking-widest transition-all duration-200 py-4 px-6 rounded-2xl ${j ? "" : "interactive-effect"}`,
                style: ({ isActive: j }) => ({
                  color: j ? m.colors.secondary.DEFAULT : m.colors.text.primary,
                  backgroundColor: j ? `${m.colors.secondary.DEFAULT}10` : "transparent"
                }),
                children: M.label
              },
              E
            );
          }) }),
          Q.length > 0 && r.some((M) => M.items) && /* @__PURE__ */ v("div", { className: "border-t my-6 max-w-md mx-auto", style: { borderColor: `${m.colors.secondary.DEFAULT}4D` } }),
          n && /* @__PURE__ */ F(ue, { children: [
            r.length > 0 && /* @__PURE__ */ v("div", { className: "border-t my-6 max-w-md mx-auto", style: { borderColor: `${m.colors.secondary.DEFAULT}4D` } }),
            /* @__PURE__ */ v("div", { className: "max-w-md mx-auto space-y-6 pb-12", children: [
              { title: "Departments", items: Go, url: "https://www.franklincountyny.gov/departments/index.php" },
              { title: "Residents", items: Qo, url: "https://www.franklincountyny.gov/residents/index.php" },
              { title: "Visitors", items: Jo, url: "https://www.franklincountyny.gov/visitors/index.php" },
              { title: "Business", items: zo, url: "https://www.franklincountyny.gov/business/index.php" },
              { title: "Our Communities", items: Bo, url: "https://www.franklincountyny.gov/our_communities/index.php" },
              { title: "How Do I?", items: Yo, url: "https://www.franklincountyny.gov/how_do_i/index.php" }
            ].map((M, E) => /* @__PURE__ */ F("div", { children: [
              /* @__PURE__ */ v("a", { href: M.url, target: "_blank", rel: "noopener noreferrer", className: "block text-center mb-3", children: /* @__PURE__ */ v("h3", { className: "text-xs font-bold uppercase tracking-widest inline-block", style: { color: m.colors.secondary.dark }, children: M.title }) }),
              /* @__PURE__ */ v("div", { className: "grid grid-cols-2 gap-2", children: M.items.map((j, L) => /* @__PURE__ */ v(
                "a",
                {
                  href: j.url,
                  target: j.url?.startsWith("http") ? "_blank" : void 0,
                  rel: j.url?.startsWith("http") ? "noopener noreferrer" : void 0,
                  className: "text-xs transition-colors text-center py-1",
                  style: { color: m.colors.text.primary },
                  onMouseEnter: (O) => O.currentTarget.style.color = m.colors.secondary.DEFAULT,
                  onMouseLeave: (O) => O.currentTarget.style.color = m.colors.text.primary,
                  children: j.label
                },
                L
              )) })
            ] }, E)) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ F(
      "main",
      {
        id: "fc-main-content",
        className: "grow",
        style: { background: m.colors.bg.main, paddingTop: i ? x : 0 },
        ...f ? { inert: !0 } : {},
        children: [
          (l || I || u) && /* @__PURE__ */ F("div", { className: `relative w-full flex items-center justify-center ${Y ? "min-h-screen" : "h-[60vh]"} overflow-hidden`, children: [
            I && /* @__PURE__ */ v("video", { autoPlay: !0, loop: !0, muted: !0, playsInline: !0, className: "absolute inset-0 w-full h-full object-cover", children: /* @__PURE__ */ v("source", { src: I, type: "video/mp4" }) }),
            !I && l && /* @__PURE__ */ v(
              "div",
              {
                className: "absolute inset-0 bg-cover bg-center parallax-bg scale-105",
                style: { backgroundImage: `url('${l}')` }
              }
            ),
            !I && !l && /* @__PURE__ */ v("div", { className: "absolute inset-0", style: { background: m.colors.bg.main } }),
            /* @__PURE__ */ v("div", { className: "absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-transparent" }),
            u && /* @__PURE__ */ F("div", { className: "container mx-auto px-6 relative z-10 text-center pt-48", children: [
              /* @__PURE__ */ v(
                "h1",
                {
                  className: "block font-serif font-black leading-tight mb-8 px-4 sm:px-8 py-4 rounded-2xl shadow-lg text-shadow-lg mx-auto animate-fade-in-up",
                  style: {
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    fontSize: "clamp(1.75rem, 8vw, 4.5rem)"
                  },
                  children: u
                }
              ),
              C && /* @__PURE__ */ v(
                "p",
                {
                  className: "max-w-3xl mx-auto leading-relaxed font-light inline-block px-6 py-4 rounded-xl shadow-lg animate-fade-in-up delay-100",
                  style: {
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    fontSize: "clamp(1rem, 4vw, 1.25rem)"
                  },
                  children: C
                }
              )
            ] })
          ] }),
          t
        ]
      }
    ),
    s && /* @__PURE__ */ v("div", { ...f ? { inert: !0 } : {}, children: /* @__PURE__ */ v(
      ul,
      {
        siteTitle: e,
        phone: c,
        address: g
      }
    ) })
  ] });
}
function oh({ theme: t, ...e }) {
  return /* @__PURE__ */ v(sl, { theme: t, children: /* @__PURE__ */ v(Al, { ...e }) });
}
function $e() {
  return typeof window < "u";
}
function Ht(t) {
  return di(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function tt(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function pt(t) {
  var e;
  return (e = (di(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function di(t) {
  return $e() ? t instanceof Node || t instanceof tt(t).Node : !1;
}
function _(t) {
  return $e() ? t instanceof Element || t instanceof tt(t).Element : !1;
}
function vt(t) {
  return $e() ? t instanceof HTMLElement || t instanceof tt(t).HTMLElement : !1;
}
function Fn(t) {
  return !$e() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof tt(t).ShadowRoot;
}
function tn(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i,
    display: s
  } = ut(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && s !== "inline" && s !== "contents";
}
function hl(t) {
  return /^(table|td|th)$/.test(Ht(t));
}
function en(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const dl = /transform|translate|scale|rotate|perspective|filter/, fl = /paint|layout|strict|content/, wt = (t) => !!t && t !== "none";
let un;
function fi(t) {
  const e = _(t) ? ut(t) : t;
  return wt(e.transform) || wt(e.translate) || wt(e.scale) || wt(e.rotate) || wt(e.perspective) || !pi() && (wt(e.backdropFilter) || wt(e.filter)) || dl.test(e.willChange || "") || fl.test(e.contain || "");
}
function pl(t) {
  let e = Ut(t);
  for (; vt(e) && !se(e); ) {
    if (fi(e))
      return e;
    if (en(e))
      return null;
    e = Ut(e);
  }
  return null;
}
function pi() {
  return un == null && (un = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), un;
}
function se(t) {
  return /^(html|body|#document)$/.test(Ht(t));
}
function ut(t) {
  return tt(t).getComputedStyle(t);
}
function nn(t) {
  return _(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ut(t) {
  if (Ht(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Fn(t) && t.host || // Fallback.
    pt(t)
  );
  return Fn(e) ? e.host : e;
}
function Wo(t) {
  const e = Ut(t);
  return se(e) ? (t.ownerDocument || t).body : vt(e) && tn(e) ? e : Wo(e);
}
function oe(t, e, n) {
  var i;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const s = Wo(t), r = s === ((i = t.ownerDocument) == null ? void 0 : i.body), o = tt(s);
  if (r) {
    const a = Un(o);
    return e.concat(o, o.visualViewport || [], tn(s) ? s : [], a && n ? oe(a) : []);
  } else
    return e.concat(s, oe(s, [], n));
}
function Un(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const Me = Math.min, Tt = Math.max, Fe = Math.round, fe = Math.floor, ht = (t) => ({
  x: t,
  y: t
}), ml = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function yl(t, e, n) {
  return Tt(t, Me(e, n));
}
function sn(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Zt(t) {
  return t.split("-")[0];
}
function on(t) {
  return t.split("-")[1];
}
function Ho(t) {
  return t === "x" ? "y" : "x";
}
function qo(t) {
  return t === "y" ? "height" : "width";
}
function mt(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function Xo(t) {
  return Ho(mt(t));
}
function vl(t, e, n) {
  n === void 0 && (n = !1);
  const i = on(t), s = Xo(t), r = qo(s);
  let o = s === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (o = Ue(o)), [o, Ue(o)];
}
function xl(t) {
  const e = Ue(t);
  return [Nn(t), e, Nn(e)];
}
function Nn(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const ts = ["left", "right"], es = ["right", "left"], wl = ["top", "bottom"], Rl = ["bottom", "top"];
function El(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? es : ts : e ? ts : es;
    case "left":
    case "right":
      return e ? wl : Rl;
    default:
      return [];
  }
}
function Sl(t, e, n, i) {
  const s = on(t);
  let r = El(Zt(t), n === "start", i);
  return s && (r = r.map((o) => o + "-" + s), e && (r = r.concat(r.map(Nn)))), r;
}
function Ue(t) {
  const e = Zt(t);
  return ml[e] + t.slice(e.length);
}
function bl(t) {
  var e, n, i, s;
  return {
    top: (e = t.top) != null ? e : 0,
    right: (n = t.right) != null ? n : 0,
    bottom: (i = t.bottom) != null ? i : 0,
    left: (s = t.left) != null ? s : 0
  };
}
function kl(t) {
  return typeof t != "number" ? bl(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ne(t) {
  const {
    x: e,
    y: n,
    width: i,
    height: s
  } = t;
  return {
    width: i,
    height: s,
    top: n,
    left: e,
    right: e + i,
    bottom: n + s,
    x: e,
    y: n
  };
}
var Tl = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "area[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"], Kn = /* @__PURE__ */ Tl.join(","), _o = typeof Element > "u", re = _o ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Ke = !_o && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t?.ownerDocument;
}, Le = function(e, n) {
  var i;
  n === void 0 && (n = !0);
  var s = e == null || (i = e.getAttribute) === null || i === void 0 ? void 0 : i.call(e, "inert"), r = s === "" || s === "true", o = r || n && e && // closest does not exist on shadow roots, so we fall back to a manual
  // lookup upward, in case it is not defined.
  (typeof e.closest == "function" ? e.closest("[inert]") : Le(e.parentNode));
  return o;
}, Ol = function(e) {
  var n, i = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "contenteditable");
  return i === "" || i === "true";
}, Pl = function(e, n, i) {
  if (Le(e))
    return [];
  var s = Array.prototype.slice.apply(e.querySelectorAll(Kn));
  return n && re.call(e, Kn) && s.unshift(e), s = s.filter(i), s;
}, Ln = function(e, n, i) {
  for (var s = [], r = Array.from(e); r.length; ) {
    var o = r.shift();
    if (!Le(o, !1))
      if (o.tagName === "SLOT") {
        var a = o.assignedElements(), c = a.length ? a : o.children, g = Ln(c, !0, i);
        i.flatten ? s.push.apply(s, g) : s.push({
          scopeParent: o,
          candidates: g
        });
      } else {
        var l = re.call(o, Kn);
        l && i.filter(o) && (n || !e.includes(o)) && s.push(o);
        var I = o.shadowRoot || // check for an undisclosed shadow
        typeof i.getShadowRoot == "function" && i.getShadowRoot(o), u = !Le(I, !1) && (!i.shadowRootFilter || i.shadowRootFilter(o));
        if (I && u) {
          var C = Ln(I === !0 ? o.children : I.children, !0, i);
          i.flatten ? s.push.apply(s, C) : s.push({
            scopeParent: o,
            candidates: C
          });
        } else
          r.unshift.apply(r, o.children);
      }
  }
  return s;
}, $o = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, tr = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Ol(e)) && !$o(e) ? 0 : e.tabIndex;
}, jl = function(e, n) {
  var i = tr(e);
  return i < 0 && n && !$o(e) ? 0 : i;
}, Ml = function(e, n) {
  return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex;
}, er = function(e) {
  return e.tagName === "INPUT";
}, Fl = function(e) {
  return er(e) && e.type === "hidden";
}, Ul = function(e) {
  var n = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(i) {
    return i.tagName === "SUMMARY";
  });
  return n;
}, Nl = function(e, n) {
  for (var i = 0; i < e.length; i++)
    if (e[i].checked && e[i].form === n)
      return e[i];
}, Kl = function(e) {
  if (!e.name)
    return !0;
  var n = e.form || Ke(e), i = function(a) {
    return n.querySelectorAll('input[type="radio"][name="' + a + '"]');
  }, s;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    s = i(window.CSS.escape(e.name));
  else
    try {
      s = i(e.name);
    } catch (o) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", o.message), !1;
    }
  var r = Nl(s, e.form);
  return !r || r === e;
}, Ll = function(e) {
  return er(e) && e.type === "radio";
}, Vl = function(e) {
  return Ll(e) && !Kl(e);
}, Dl = function(e) {
  var n, i = e && Ke(e), s = (n = i) === null || n === void 0 ? void 0 : n.host, r = !1;
  if (i && i !== e) {
    var o, a, c;
    for (r = !!((o = s) !== null && o !== void 0 && (a = o.ownerDocument) !== null && a !== void 0 && a.contains(s) || e != null && (c = e.ownerDocument) !== null && c !== void 0 && c.contains(e)); !r && s; ) {
      var g, l, I;
      i = Ke(s), s = (g = i) === null || g === void 0 ? void 0 : g.host, r = !!((l = s) !== null && l !== void 0 && (I = l.ownerDocument) !== null && I !== void 0 && I.contains(s));
    }
  }
  return r;
}, ns = function(e) {
  var n = e.getBoundingClientRect(), i = n.width, s = n.height;
  return i === 0 && s === 0;
}, Gl = function(e, n) {
  var i = n.displayCheck, s = n.getShadowRoot;
  if (i === "full-native" && "checkVisibility" in e) {
    var r = e.checkVisibility({
      // Checking opacity might be desirable for some use cases, but natively,
      // opacity zero elements _are_ focusable and tabbable.
      checkOpacity: !1,
      opacityProperty: !1,
      contentVisibilityAuto: !0,
      visibilityProperty: !0,
      // This is an alias for `visibilityProperty`. Contemporary browsers
      // support both. However, this alias has wider browser support (Chrome
      // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
      // we include it anyway.
      checkVisibilityCSS: !0
    });
    return !r;
  }
  var o = getComputedStyle(e), a = o.visibility;
  if (a === "hidden" || a === "collapse")
    return !0;
  var c = re.call(e, "details>summary:first-of-type"), g = c ? e.parentElement : e;
  if (re.call(g, "details:not([open]) *"))
    return !0;
  if (!i || i === "full" || // full-native can run this branch when it falls through in case
  // Element#checkVisibility is unsupported
  i === "full-native" || i === "legacy-full") {
    if (typeof s == "function") {
      for (var l = e; e; ) {
        var I = e.parentElement, u = Ke(e);
        if (I && !I.shadowRoot && s(I) === !0)
          return ns(e);
        e.assignedSlot ? e = e.assignedSlot : !I && u !== e.ownerDocument ? e = u.host : e = I;
      }
      e = l;
    }
    if (Dl(e))
      return !e.getClientRects().length;
    if (i !== "legacy-full")
      return !0;
  } else if (i === "non-zero-area")
    return ns(e);
  return !1;
}, Ql = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var n = e.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var i = 0; i < n.children.length; i++) {
          var s = n.children.item(i);
          if (s.tagName === "LEGEND")
            return re.call(n, "fieldset[disabled] *") ? !0 : !s.contains(e);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, Jl = function(e, n) {
  return !(n.disabled || Fl(n) || Gl(n, e) || // For a details element with a summary, the summary element gets the focus
  Ul(n) || Ql(n));
}, is = function(e, n) {
  return !(Vl(n) || tr(n) < 0 || !Jl(e, n));
}, zl = function(e) {
  var n = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, nr = function(e) {
  var n = [], i = [];
  return e.forEach(function(s, r) {
    var o = !!s.scopeParent, a = o ? s.scopeParent : s, c = jl(a, o), g = o ? nr(s.candidates) : a;
    c === 0 ? o ? n.push.apply(n, g) : n.push(a) : i.push({
      documentOrder: r,
      tabIndex: c,
      item: s,
      isScope: o,
      content: g
    });
  }), i.sort(Ml).reduce(function(s, r) {
    return r.isScope ? s.push.apply(s, r.content) : s.push(r.content), s;
  }, []).concat(n);
}, ir = function(e, n) {
  n = n || {};
  var i;
  return n.getShadowRoot ? i = Ln([e], n.includeContainer, {
    filter: is.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: zl
  }) : i = Pl(e, n.includeContainer, is.bind(null, n)), nr(i);
};
function Bl() {
  return /apple/i.test(navigator.vendor);
}
function Yl(t) {
  let e = t.activeElement;
  for (; ((n = e) == null || (n = n.shadowRoot) == null ? void 0 : n.activeElement) != null; ) {
    var n;
    e = e.shadowRoot.activeElement;
  }
  return e;
}
function Zl(t, e) {
  if (!t || !e)
    return !1;
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Fn(n)) {
    let i = e;
    for (; i; ) {
      if (t === i)
        return !0;
      i = i.parentNode || i.host;
    }
  }
  return !1;
}
function mi(t) {
  return t?.ownerDocument || document;
}
var Wl = typeof document < "u", Hl = function() {
}, Ot = Wl ? Ci : Hl;
const ql = {
  ...k
}, Xl = ql.useInsertionEffect, _l = Xl || ((t) => t());
function $l(t) {
  const e = k.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return _l(() => {
    e.current = t;
  }), k.useCallback(function() {
    for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++)
      i[s] = arguments[s];
    return e.current == null ? void 0 : e.current(...i);
  }, []);
}
const sr = () => ({
  getShadowRoot: !0,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function or(t, e) {
  const n = ir(t, sr()), i = n.length;
  if (i === 0) return;
  const s = Yl(mi(t)), r = n.indexOf(s), o = r === -1 ? e === 1 ? 0 : i - 1 : r + e;
  return n[o];
}
function tg(t) {
  return or(mi(t).body, 1) || t;
}
function eg(t) {
  return or(mi(t).body, -1) || t;
}
function Cn(t, e) {
  const n = e || t.currentTarget, i = t.relatedTarget;
  return !i || !Zl(n, i);
}
function ng(t) {
  ir(t, sr()).forEach((n) => {
    n.dataset.tabindex = n.getAttribute("tabindex") || "", n.setAttribute("tabindex", "-1");
  });
}
function ss(t) {
  t.querySelectorAll("[data-tabindex]").forEach((n) => {
    const i = n.dataset.tabindex;
    delete n.dataset.tabindex, i ? n.setAttribute("tabindex", i) : n.removeAttribute("tabindex");
  });
}
function os(t, e, n) {
  let {
    reference: i,
    floating: s
  } = t;
  const r = mt(e), o = Xo(e), a = qo(o), c = Zt(e), g = r === "y", l = i.x + i.width / 2 - s.width / 2, I = i.y + i.height / 2 - s.height / 2, u = i[a] / 2 - s[a] / 2;
  let C;
  switch (c) {
    case "top":
      C = {
        x: l,
        y: i.y - s.height
      };
      break;
    case "bottom":
      C = {
        x: l,
        y: i.y + i.height
      };
      break;
    case "right":
      C = {
        x: i.x + i.width,
        y: I
      };
      break;
    case "left":
      C = {
        x: i.x - s.width,
        y: I
      };
      break;
    default:
      C = {
        x: i.x,
        y: i.y
      };
  }
  const A = on(e);
  return A && (C[o] += u * (A === "end" ? 1 : -1) * (n && g ? -1 : 1)), C;
}
async function ig(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: s,
    platform: r,
    rects: o,
    elements: a,
    strategy: c
  } = t, {
    boundary: g = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: I = "floating",
    altBoundary: u = !1,
    padding: C = 0
  } = sn(e, t), A = kl(C), f = a[u ? I === "floating" ? "reference" : "floating" : I], d = Ne(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(f))) == null || n ? f : f.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: g,
    rootBoundary: l,
    strategy: c
  })), p = I === "floating" ? {
    x: i,
    y: s,
    width: o.floating.width,
    height: o.floating.height
  } : o.reference, y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), x = await (r.isElement == null ? void 0 : r.isElement(y)) && await (r.getScale == null ? void 0 : r.getScale(y)) || {
    x: 1,
    y: 1
  }, R = Ne(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: p,
    offsetParent: y,
    strategy: c
  }) : p);
  return {
    top: (d.top - R.top + A.top) / x.y,
    bottom: (R.bottom - d.bottom + A.bottom) / x.y,
    left: (d.left - R.left + A.left) / x.x,
    right: (R.right - d.right + A.right) / x.x
  };
}
const sg = 50, og = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: s = "absolute",
    middleware: r = [],
    platform: o
  } = n, a = o.detectOverflow ? o : {
    ...o,
    detectOverflow: ig
  }, c = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let g = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: l,
    y: I
  } = os(g, i, c), u = i, C = 0;
  const A = {};
  for (let h = 0; h < r.length; h++) {
    const f = r[h];
    if (!f)
      continue;
    const {
      name: d,
      fn: p
    } = f, {
      x: y,
      y: x,
      data: R,
      reset: S
    } = await p({
      x: l,
      y: I,
      initialPlacement: i,
      placement: u,
      strategy: s,
      middlewareData: A,
      rects: g,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    l = y ?? l, I = x ?? I, A[d] = {
      ...A[d],
      ...R
    }, S && C < sg && (C++, typeof S == "object" && (S.placement && (u = S.placement), S.rects && (g = S.rects === !0 ? await o.getElementRects({
      reference: t,
      floating: e,
      strategy: s
    }) : S.rects), {
      x: l,
      y: I
    } = os(g, u, c)), h = -1);
  }
  return {
    x: l,
    y: I,
    placement: u,
    strategy: s,
    middlewareData: A
  };
}, rg = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, i;
      const {
        placement: s,
        middlewareData: r,
        rects: o,
        initialPlacement: a,
        platform: c,
        elements: g
      } = e, {
        mainAxis: l = !0,
        crossAxis: I = !0,
        fallbackPlacements: u,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: A = "none",
        flipAlignment: h = !0,
        ...f
      } = sn(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const d = Zt(s), p = mt(a), y = Zt(a) === a, x = await (c.isRTL == null ? void 0 : c.isRTL(g.floating)), R = u || (y || !h ? [Ue(a)] : xl(a)), S = A !== "none";
      !u && S && R.push(...Sl(a, h, A, x));
      const m = [a, ...R], w = await c.detectOverflow(e, f), P = [];
      let T = ((i = r.flip) == null ? void 0 : i.overflows) || [];
      if (l && P.push(w[d]), I) {
        const M = vl(s, o, x);
        P.push(w[M[0]], w[M[1]]);
      }
      if (T = [...T, {
        placement: s,
        overflows: P
      }], !P.every((M) => M <= 0)) {
        var N, Q;
        const M = (((N = r.flip) == null ? void 0 : N.index) || 0) + 1, E = m[M];
        if (E && (!(I === "alignment" ? p !== mt(E) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((O) => mt(O.placement) === p ? O.overflows[0] > 0 : !0)))
          return {
            data: {
              index: M,
              overflows: T
            },
            reset: {
              placement: E
            }
          };
        let j = (Q = T.filter((L) => L.overflows[0] <= 0).sort((L, O) => L.overflows[1] - O.overflows[1])[0]) == null ? void 0 : Q.placement;
        if (!j)
          switch (C) {
            case "bestFit": {
              var Y;
              const L = (Y = T.filter((O) => {
                if (S) {
                  const U = mt(O.placement);
                  return U === p || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  U === "y";
                }
                return !0;
              }).map((O) => [O.placement, O.overflows.filter((U) => U > 0).reduce((U, H) => U + H, 0)]).sort((O, U) => O[1] - U[1])[0]) == null ? void 0 : Y[0];
              L && (j = L);
              break;
            }
            case "initialPlacement":
              j = a;
              break;
          }
        if (s !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
}, ag = /* @__PURE__ */ new Set(["left", "top"]);
async function lg(t, e) {
  const {
    placement: n,
    platform: i,
    elements: s
  } = t, r = await (i.isRTL == null ? void 0 : i.isRTL(s.floating)), o = Zt(n), a = on(n), c = mt(n) === "y", g = ag.has(o) ? -1 : 1, l = r && c ? -1 : 1, I = sn(e, t);
  let {
    mainAxis: u,
    crossAxis: C,
    alignmentAxis: A
  } = typeof I == "number" ? {
    mainAxis: I,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: I.mainAxis || 0,
    crossAxis: I.crossAxis || 0,
    alignmentAxis: I.alignmentAxis
  };
  return a && typeof A == "number" && (C = a === "end" ? A * -1 : A), c ? {
    x: C * l,
    y: u * g
  } : {
    x: u * g,
    y: C * l
  };
}
const gg = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, i;
      const {
        x: s,
        y: r,
        placement: o,
        middlewareData: a
      } = e, c = await lg(e, t);
      return o === ((n = a.offset) == null ? void 0 : n.placement) && (i = a.arrow) != null && i.alignmentOffset ? {} : {
        x: s + c.x,
        y: r + c.y,
        data: {
          ...c,
          placement: o
        }
      };
    }
  };
}, cg = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: s,
        platform: r
      } = e, {
        mainAxis: o = !0,
        crossAxis: a = !1,
        limiter: c = {
          fn: (p) => {
            let {
              x: y,
              y: x
            } = p;
            return {
              x: y,
              y: x
            };
          }
        },
        ...g
      } = sn(t, e), l = {
        x: n,
        y: i
      }, I = await r.detectOverflow(e, g), u = mt(s), C = Ho(u);
      let A = l[C], h = l[u];
      const f = (p, y) => yl(y + I[p === "y" ? "top" : "left"], y, y - I[p === "y" ? "bottom" : "right"]);
      o && (A = f(C, A)), a && (h = f(u, h));
      const d = c.fn({
        ...e,
        [C]: A,
        [u]: h
      });
      return {
        ...d,
        data: {
          x: d.x - n,
          y: d.y - i,
          enabled: {
            [C]: o,
            [u]: a
          }
        }
      };
    }
  };
};
function rr(t) {
  const e = ut(t);
  let n = parseFloat(e.width) || 0, i = parseFloat(e.height) || 0;
  const s = vt(t), r = s ? t.offsetWidth : n, o = s ? t.offsetHeight : i, a = Fe(n) !== r || Fe(i) !== o;
  return a && (n = r, i = o), {
    width: n,
    height: i,
    $: a
  };
}
function yi(t) {
  return _(t) ? t : t.contextElement;
}
function Bt(t) {
  const e = yi(t);
  if (!vt(e))
    return ht(1);
  const n = e.getBoundingClientRect(), {
    width: i,
    height: s,
    $: r
  } = rr(e);
  let o = (r ? Fe(n.width) : n.width) / i, a = (r ? Fe(n.height) : n.height) / s;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const Ig = /* @__PURE__ */ ht(0);
function ar(t) {
  const e = tt(t);
  return !pi() || !e.visualViewport ? Ig : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ug(t, e, n) {
  return e === void 0 && (e = !1), !!n && e && n === tt(t);
}
function Nt(t, e, n, i) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect(), r = yi(t);
  let o = ht(1);
  e && (i ? _(i) && (o = Bt(i)) : o = Bt(t));
  const a = ug(r, n, i) ? ar(r) : ht(0);
  let c = (s.left + a.x) / o.x, g = (s.top + a.y) / o.y, l = s.width / o.x, I = s.height / o.y;
  if (r && i) {
    const u = tt(r), C = _(i) ? tt(i) : i;
    let A = u, h = Un(A);
    for (; h && C !== A; ) {
      const f = Bt(h), d = h.getBoundingClientRect(), p = ut(h), y = d.left + (h.clientLeft + parseFloat(p.paddingLeft)) * f.x, x = d.top + (h.clientTop + parseFloat(p.paddingTop)) * f.y;
      c *= f.x, g *= f.y, l *= f.x, I *= f.y, c += y, g += x, A = tt(h), h = Un(A);
    }
  }
  return Ne({
    width: l,
    height: I,
    x: c,
    y: g
  });
}
function rn(t, e) {
  const n = nn(t).scrollLeft;
  return e ? e.left + n : Nt(pt(t)).left + n;
}
function lr(t, e) {
  const n = t.getBoundingClientRect(), i = n.left + e.scrollLeft - rn(t, n), s = n.top + e.scrollTop;
  return {
    x: i,
    y: s
  };
}
function Cg(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: i,
    strategy: s
  } = t;
  const r = s === "fixed", o = pt(i), a = e ? en(e.floating) : !1;
  if (i === o || a && r)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, g = ht(1);
  const l = ht(0), I = vt(i);
  if ((I || !r) && ((Ht(i) !== "body" || tn(o)) && (c = nn(i)), I)) {
    const C = Nt(i);
    g = Bt(i), l.x = C.x + i.clientLeft, l.y = C.y + i.clientTop;
  }
  const u = o && !I && !r ? lr(o, c) : ht(0);
  return {
    width: n.width * g.x,
    height: n.height * g.y,
    x: n.x * g.x - c.scrollLeft * g.x + l.x + u.x,
    y: n.y * g.y - c.scrollTop * g.y + l.y + u.y
  };
}
function Ag(t) {
  return t.getClientRects ? Array.from(t.getClientRects()) : [];
}
function hg(t) {
  const e = nn(t), n = t.ownerDocument.body, i = Tt(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), s = Tt(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let r = -e.scrollLeft + rn(t);
  const o = -e.scrollTop;
  return ut(n).direction === "rtl" && (r += Tt(t.clientWidth, n.clientWidth) - i), {
    width: i,
    height: s,
    x: r,
    y: o
  };
}
const dg = 25;
function fg(t, e, n) {
  n === void 0 && (n = "viewport");
  const i = n === "layoutViewport", s = tt(t), r = pt(t), o = s.visualViewport;
  let a = r.clientWidth, c = r.clientHeight, g = 0, l = 0;
  if (o) {
    const u = !pi() || e === "fixed";
    i ? u || (g = -o.offsetLeft, l = -o.offsetTop) : (a = o.width, c = o.height, u && (g = o.offsetLeft, l = o.offsetTop));
  }
  if (rn(r) <= 0) {
    const u = r.ownerDocument, C = u.body, A = getComputedStyle(C), h = u.compatMode === "CSS1Compat" && parseFloat(A.marginLeft) + parseFloat(A.marginRight) || 0, f = Math.abs(r.clientWidth - C.clientWidth - h), d = getComputedStyle(r).scrollbarGutter === "stable both-edges" ? f / 2 : f;
    d <= dg && (a -= d);
  }
  return {
    width: a,
    height: c,
    x: g,
    y: l
  };
}
function pg(t, e) {
  const n = Nt(t, !0, e === "fixed"), i = n.top + t.clientTop, s = n.left + t.clientLeft, r = Bt(t), o = t.clientWidth * r.x, a = t.clientHeight * r.y, c = s * r.x, g = i * r.y;
  return {
    width: o,
    height: a,
    x: c,
    y: g
  };
}
function rs(t, e, n) {
  let i;
  if (e === "viewport" || e === "layoutViewport")
    i = fg(t, n, e);
  else if (e === "document")
    i = hg(pt(t));
  else if (_(e))
    i = pg(e, n);
  else {
    const s = ar(t);
    i = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return Ne(i);
}
function mg(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let i = oe(t, [], !1).filter((a) => _(a) && Ht(a) !== "body"), s = null;
  const r = ut(t).position === "fixed";
  let o = r ? Ut(t) : t;
  for (; _(o) && !se(o); ) {
    const a = ut(o), c = fi(o), g = s ? s.position : r ? "fixed" : "";
    !c && (g === "fixed" || g === "absolute" && a.position === "static") ? i = i.filter((I) => I !== o) : s = a, o = Ut(o);
  }
  return e.set(t, i), i;
}
function yg(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: s
  } = t;
  const o = [...n === "clippingAncestors" ? en(e) ? [] : mg(e, this._c) : [].concat(n), i], a = rs(e, o[0], s);
  let c = a.top, g = a.right, l = a.bottom, I = a.left;
  for (let u = 1; u < o.length; u++) {
    const C = rs(e, o[u], s);
    c = Tt(C.top, c), g = Me(C.right, g), l = Me(C.bottom, l), I = Tt(C.left, I);
  }
  return {
    width: g - I,
    height: l - c,
    x: I,
    y: c
  };
}
function vg(t) {
  const {
    width: e,
    height: n
  } = rr(t);
  return {
    width: e,
    height: n
  };
}
function xg(t, e, n) {
  const i = vt(e), s = pt(e), r = n === "fixed", o = Nt(t, !0, r, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ht(0);
  if ((i || !r) && ((Ht(e) !== "body" || tn(s)) && (a = nn(e)), i)) {
    const u = Nt(e, !0, r, e);
    c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
  }
  !i && s && (c.x = rn(s));
  const g = s && !i && !r ? lr(s, a) : ht(0), l = o.left + a.scrollLeft - c.x - g.x, I = o.top + a.scrollTop - c.y - g.y;
  return {
    x: l,
    y: I,
    width: o.width,
    height: o.height
  };
}
function An(t) {
  return ut(t).position === "static";
}
function as(t, e) {
  if (!vt(t) || ut(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return pt(t) === n && (n = n.ownerDocument.body), n;
}
function gr(t, e) {
  const n = tt(t);
  if (en(t))
    return n;
  if (!vt(t)) {
    let s = Ut(t);
    for (; s && !se(s); ) {
      if (_(s) && !An(s))
        return s;
      s = Ut(s);
    }
    return n;
  }
  let i = as(t, e);
  for (; i && hl(i) && An(i); )
    i = as(i, e);
  return i && se(i) && An(i) && !fi(i) ? n : i || pl(t) || n;
}
const wg = async function(t) {
  const e = this.getOffsetParent || gr, n = this.getDimensions, i = await n(t.floating);
  return {
    reference: xg(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function Rg(t) {
  return ut(t).direction === "rtl";
}
const Eg = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Cg,
  getDocumentElement: pt,
  getClippingRect: yg,
  getOffsetParent: gr,
  getElementRects: wg,
  getClientRects: Ag,
  getDimensions: vg,
  getScale: Bt,
  isElement: _,
  isRTL: Rg
};
function cr(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Sg(t, e, n) {
  let i = null, s;
  const r = pt(t);
  function o() {
    var l;
    clearTimeout(s), (l = i) == null || l.disconnect(), i = null;
  }
  function a(l, I) {
    l === void 0 && (l = !1), I === void 0 && (I = 1), o();
    const u = t.getBoundingClientRect(), {
      left: C,
      top: A,
      width: h,
      height: f
    } = u;
    if (l || e(), !h || !f)
      return;
    const d = fe(A), p = fe(r.clientWidth - (C + h)), y = fe(r.clientHeight - (A + f)), x = fe(C), S = {
      rootMargin: -d + "px " + -p + "px " + -y + "px " + -x + "px",
      threshold: Tt(0, Me(1, I)) || 1
    };
    let m = !0;
    function w(P) {
      const T = P[0].intersectionRatio;
      if (!cr(u, t.getBoundingClientRect()))
        return a();
      if (T !== I) {
        if (!m)
          return a();
        T ? a(!1, T) : s = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      m = !1;
    }
    try {
      i = new IntersectionObserver(w, {
        ...S,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(w, S);
    }
    i.observe(t);
  }
  const c = tt(t), g = () => a(n);
  return c.addEventListener("resize", g), a(!0), () => {
    c.removeEventListener("resize", g), o();
  };
}
function bg(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: r = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = i, g = yi(t), l = s || r ? [...g ? oe(g) : [], ...e ? oe(e) : []] : [];
  l.forEach((d) => {
    s && d.addEventListener("scroll", n), r && d.addEventListener("resize", n);
  });
  const I = g && a ? Sg(g, n, r) : null;
  let u = -1, C = null;
  o && (C = new ResizeObserver((d) => {
    let [p] = d;
    p && p.target === g && C && e && (C.unobserve(e), cancelAnimationFrame(u), u = requestAnimationFrame(() => {
      var y;
      (y = C) == null || y.observe(e);
    })), n();
  }), g && !c && C.observe(g), e && C.observe(e));
  let A, h = c ? Nt(t) : null;
  c && f();
  function f() {
    const d = Nt(t);
    h && !cr(h, d) && n(), h = d, A = requestAnimationFrame(f);
  }
  return n(), () => {
    var d;
    l.forEach((p) => {
      s && p.removeEventListener("scroll", n), r && p.removeEventListener("resize", n);
    }), I?.(), (d = C) == null || d.disconnect(), C = null, c && cancelAnimationFrame(A);
  };
}
const kg = gg, Tg = cg, Og = rg, Pg = (t, e, n) => {
  const i = /* @__PURE__ */ new Map(), s = n ?? {}, r = {
    ...Eg,
    ...s.platform,
    _c: i
  };
  return og(t, e, {
    ...s,
    platform: r
  });
};
var jg = typeof document < "u", Mg = function() {
}, we = jg ? Ci : Mg;
function Ve(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, i, s;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (i = n; i-- !== 0; )
        if (!Ve(t[i], e[i]))
          return !1;
      return !0;
    }
    if (s = Object.keys(t), n = s.length, n !== Object.keys(e).length)
      return !1;
    for (i = n; i-- !== 0; )
      if (!{}.hasOwnProperty.call(e, s[i]))
        return !1;
    for (i = n; i-- !== 0; ) {
      const r = s[i];
      if (!(r === "_owner" && t.$$typeof) && !Ve(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Ir(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ls(t, e) {
  const n = Ir(t);
  return Math.round(e * n) / n;
}
function hn(t) {
  const e = k.useRef(t);
  return we(() => {
    e.current = t;
  }), e;
}
function Fg(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: i = [],
    platform: s,
    elements: {
      reference: r,
      floating: o
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: g
  } = t, [l, I] = k.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [u, C] = k.useState(i);
  Ve(u, i) || C(i);
  const [A, h] = k.useState(null), [f, d] = k.useState(null), p = k.useCallback((O) => {
    O !== S.current && (S.current = O, h(O));
  }, []), y = k.useCallback((O) => {
    O !== m.current && (m.current = O, d(O));
  }, []), x = r || A, R = o || f, S = k.useRef(null), m = k.useRef(null), w = k.useRef(l), P = c != null, T = hn(c), N = hn(s), Q = hn(g), Y = k.useCallback(() => {
    if (!S.current || !m.current)
      return;
    const O = {
      placement: e,
      strategy: n,
      middleware: u
    };
    N.current && (O.platform = N.current), Pg(S.current, m.current, O).then((U) => {
      const H = {
        ...U,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Q.current !== !1
      };
      M.current && !Ve(w.current, H) && (w.current = H, Vo.flushSync(() => {
        I(H);
      }));
    });
  }, [u, e, n, N, Q]);
  we(() => {
    g === !1 && w.current.isPositioned && (w.current.isPositioned = !1, I((O) => ({
      ...O,
      isPositioned: !1
    })));
  }, [g]);
  const M = k.useRef(!1);
  we(() => (M.current = !0, () => {
    M.current = !1;
  }), []), we(() => {
    if (x && (S.current = x), R && (m.current = R), x && R) {
      if (T.current)
        return T.current(x, R, Y);
      Y();
    }
  }, [x, R, Y, T, P]);
  const E = k.useMemo(() => ({
    reference: S,
    floating: m,
    setReference: p,
    setFloating: y
  }), [p, y]), j = k.useMemo(() => ({
    reference: x,
    floating: R
  }), [x, R]), L = k.useMemo(() => {
    const O = {
      position: n,
      left: 0,
      top: 0
    };
    if (!j.floating)
      return O;
    const U = ls(j.floating, l.x), H = ls(j.floating, l.y);
    return a ? {
      ...O,
      transform: "translate(" + U + "px, " + H + "px)",
      ...Ir(j.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: U,
      top: H
    };
  }, [n, a, j.floating, l.x, l.y]);
  return k.useMemo(() => ({
    ...l,
    update: Y,
    refs: E,
    elements: j,
    floatingStyles: L
  }), [l, Y, E, j, L]);
}
const Ug = (t, e) => {
  const n = kg(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ng = (t, e) => {
  const n = Tg(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Kg = (t, e) => {
  const n = Og(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Lg = {
  ...k
};
let gs = !1, Vg = 0;
const cs = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + Vg++
);
function Dg() {
  const [t, e] = k.useState(() => gs ? cs() : void 0);
  return Ot(() => {
    t == null && e(cs());
  }, []), k.useEffect(() => {
    gs = !0;
  }, []), t;
}
const Gg = Lg.useId, ur = Gg || Dg;
let Vn;
process.env.NODE_ENV !== "production" && (Vn = /* @__PURE__ */ new Set());
function Qg() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++)
    n[i] = arguments[i];
  const s = "Floating UI: " + n.join(" ");
  if (!((t = Vn) != null && t.has(s))) {
    var r;
    (r = Vn) == null || r.add(s), console.error(s);
  }
}
function Jg() {
  const t = /* @__PURE__ */ new Map();
  return {
    emit(e, n) {
      var i;
      (i = t.get(e)) == null || i.forEach((s) => s(n));
    },
    on(e, n) {
      t.has(e) || t.set(e, /* @__PURE__ */ new Set()), t.get(e).add(n);
    },
    off(e, n) {
      var i;
      (i = t.get(e)) == null || i.delete(n);
    }
  };
}
const zg = /* @__PURE__ */ k.createContext(null), Bg = /* @__PURE__ */ k.createContext(null), Yg = () => {
  var t;
  return ((t = k.useContext(zg)) == null ? void 0 : t.id) || null;
}, Zg = () => k.useContext(Bg);
function Cr(t) {
  return "data-floating-ui-" + t;
}
const Wg = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
}, Is = /* @__PURE__ */ k.forwardRef(function(e, n) {
  const [i, s] = k.useState();
  Ot(() => {
    Bl() && s("button");
  }, []);
  const r = {
    ref: n,
    tabIndex: 0,
    // Role is only for VoiceOver
    role: i,
    "aria-hidden": i ? void 0 : !0,
    [Cr("focus-guard")]: "",
    style: Wg
  };
  return /* @__PURE__ */ v("span", {
    ...e,
    ...r
  });
}), Hg = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, Ar = /* @__PURE__ */ k.createContext(null), us = /* @__PURE__ */ Cr("portal");
function qg(t) {
  t === void 0 && (t = {});
  const {
    id: e,
    root: n
  } = t, i = ur(), s = _g(), [r, o] = k.useState(null), a = k.useRef(null);
  return Ot(() => () => {
    r?.remove(), queueMicrotask(() => {
      a.current = null;
    });
  }, [r]), Ot(() => {
    if (!i || a.current) return;
    const c = e ? document.getElementById(e) : null;
    if (!c) return;
    const g = document.createElement("div");
    g.id = i, g.setAttribute(us, ""), c.appendChild(g), a.current = g, o(g);
  }, [e, i]), Ot(() => {
    if (n === null || !i || a.current) return;
    let c = n || s?.portalNode;
    c && !di(c) && (c = c.current), c = c || document.body;
    let g = null;
    e && (g = document.createElement("div"), g.id = e, c.appendChild(g));
    const l = document.createElement("div");
    l.id = i, l.setAttribute(us, ""), c = g || c, c.appendChild(l), a.current = l, o(l);
  }, [e, n, i, s]), r;
}
function Xg(t) {
  const {
    children: e,
    id: n,
    root: i,
    preserveTabOrder: s = !0
  } = t, r = qg({
    id: n,
    root: i
  }), [o, a] = k.useState(null), c = k.useRef(null), g = k.useRef(null), l = k.useRef(null), I = k.useRef(null), u = o?.modal, C = o?.open, A = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!o && // Guards are only for non-modal focus management.
    !o.modal && // Don't render if unmount is transitioning.
    o.open && s && !!(i || r)
  );
  return k.useEffect(() => {
    if (!r || !s || u)
      return;
    function h(f) {
      r && Cn(f) && (f.type === "focusin" ? ss : ng)(r);
    }
    return r.addEventListener("focusin", h, !0), r.addEventListener("focusout", h, !0), () => {
      r.removeEventListener("focusin", h, !0), r.removeEventListener("focusout", h, !0);
    };
  }, [r, s, u]), k.useEffect(() => {
    r && (C || ss(r));
  }, [C, r]), /* @__PURE__ */ F(Ar.Provider, {
    value: k.useMemo(() => ({
      preserveTabOrder: s,
      beforeOutsideRef: c,
      afterOutsideRef: g,
      beforeInsideRef: l,
      afterInsideRef: I,
      portalNode: r,
      setFocusManagerState: a
    }), [s, r]),
    children: [A && r && /* @__PURE__ */ v(Is, {
      "data-type": "outside",
      ref: c,
      onFocus: (h) => {
        if (Cn(h, r)) {
          var f;
          (f = l.current) == null || f.focus();
        } else {
          const d = o ? o.domReference : null, p = eg(d);
          p?.focus();
        }
      }
    }), A && r && /* @__PURE__ */ v("span", {
      "aria-owns": r.id,
      style: Hg
    }), r && /* @__PURE__ */ Vo.createPortal(e, r), A && r && /* @__PURE__ */ v(Is, {
      "data-type": "outside",
      ref: g,
      onFocus: (h) => {
        if (Cn(h, r)) {
          var f;
          (f = I.current) == null || f.focus();
        } else {
          const d = o ? o.domReference : null, p = tg(d);
          p?.focus(), o?.closeOnFocusOut && o?.onOpenChange(!1, h.nativeEvent, "focus-out");
        }
      }
    })]
  });
}
const _g = () => k.useContext(Ar);
function $g(t) {
  const {
    open: e = !1,
    onOpenChange: n,
    elements: i
  } = t, s = ur(), r = k.useRef({}), [o] = k.useState(() => Jg()), a = Yg() != null;
  if (process.env.NODE_ENV !== "production") {
    const C = i.reference;
    C && !_(C) && Qg("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [c, g] = k.useState(i.reference), l = $l((C, A, h) => {
    r.current.openEvent = C ? A : void 0, o.emit("openchange", {
      open: C,
      event: A,
      reason: h,
      nested: a
    }), n?.(C, A, h);
  }), I = k.useMemo(() => ({
    setPositionReference: g
  }), []), u = k.useMemo(() => ({
    reference: c || i.reference || null,
    floating: i.floating || null,
    domReference: i.reference
  }), [c, i.reference, i.floating]);
  return k.useMemo(() => ({
    dataRef: r,
    open: e,
    onOpenChange: l,
    elements: u,
    events: o,
    floatingId: s,
    refs: I
  }), [e, l, u, o, s, I]);
}
function tc(t) {
  var e, n;
  let {
    elements: i,
    ...s
  } = t === void 0 ? {} : t;
  const {
    nodeId: r
  } = s, o = $g({
    ...s,
    elements: {
      reference: (e = i?.reference) != null ? e : null,
      floating: (n = i?.floating) != null ? n : null
    }
  }), a = s.rootContext || o, c = a.elements, [g, l] = k.useState(null), [I, u] = k.useState(null), A = c?.domReference || g, h = k.useRef(null), f = Zg();
  Ot(() => {
    A && (h.current = A);
  }, [A]);
  const d = Fg({
    ...s,
    elements: {
      ...c,
      ...I && {
        reference: I
      }
    }
  }), p = k.useCallback((m) => {
    const w = _(m) ? {
      getBoundingClientRect: () => m.getBoundingClientRect(),
      getClientRects: () => m.getClientRects(),
      contextElement: m
    } : m;
    u(w), d.refs.setReference(w);
  }, [d.refs]), y = k.useCallback((m) => {
    (_(m) || m === null) && (h.current = m, l(m)), (_(d.refs.reference.current) || d.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    m !== null && !_(m)) && d.refs.setReference(m);
  }, [d.refs]), x = k.useMemo(() => ({
    ...d.refs,
    setReference: y,
    setPositionReference: p,
    domReference: h
  }), [d.refs, y, p]), R = k.useMemo(() => ({
    ...d.elements,
    domReference: A
  }), [d.elements, A]), S = k.useMemo(() => ({
    ...d,
    ...a,
    refs: x,
    elements: R,
    nodeId: r
  }), [d, x, R, r, a]);
  return Ot(() => {
    a.dataRef.current.floatingContext = S;
    const m = f?.nodesRef.current.find((w) => w.id === r);
    m && (m.context = S);
  }), k.useMemo(() => ({
    ...d,
    context: S,
    refs: x,
    elements: R
  }), [d, x, R, S]);
}
const rh = ({ triggerText: t, tooltipContent: e, isActive: n, onToggle: i }) => {
  const { theme: s } = ft(), [r, o] = rt(!1), { refs: a, floatingStyles: c } = tc({
    placement: "bottom",
    whileElementsMounted: bg,
    middleware: [
      Ug(8),
      Kg({
        fallbackAxisSideDirection: "start",
        padding: 32
      }),
      Ng({
        padding: 32
      })
    ]
  }), g = n || r;
  return /* @__PURE__ */ F(ue, { children: [
    /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        ref: a.setReference,
        className: "cursor-help font-bold border-b-2 border-dotted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-sm transition-colors opacity-90 hover:opacity-100",
        style: {
          color: s.colors.primary.DEFAULT,
          borderColor: s.colors.primary.DEFAULT
        },
        onClick: (l) => {
          l.preventDefault(), l.stopPropagation(), i();
        },
        onMouseEnter: () => o(!0),
        onMouseLeave: () => o(!1),
        children: t
      }
    ),
    g && /* @__PURE__ */ v(Xg, { children: /* @__PURE__ */ v(
      "div",
      {
        ref: a.setFloating,
        style: c,
        className: "w-80 max-w-[calc(100vw-4rem)] p-4 bg-gray-900 text-white text-sm leading-relaxed rounded-lg shadow-2xl z-50",
        children: e
      }
    ) })
  ] });
}, vi = Kt({});
function xi(t) {
  const e = D(null);
  return e.current === null && (e.current = t()), e.current;
}
const ec = typeof window < "u", De = ec ? Ci : X, an = /* @__PURE__ */ Kt(null);
function wi(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Ge(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const lt = (t, e, n) => n > e ? e : n < t ? t : n;
function Dn(t, e) {
  return e ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : t;
}
let qt = () => {
}, Ct = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (qt = (t, e, n) => {
  !t && typeof console < "u" && console.warn(Dn(e, n));
}, Ct = (t, e, n) => {
  if (!t)
    throw new Error(Dn(e, n));
});
const dt = {}, Ri = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), hr = (t) => typeof t == "object" && t !== null, Ei = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function dr(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const at = /* @__NO_SIDE_EFFECTS__ */ (t) => t, Ce = (...t) => t.reduce((e, n) => (i) => n(e(i))), ae = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i ? (n - t) / i : 1;
};
class Qe {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return wi(this.subscriptions, e), () => this.remove(e);
  }
  remove(e) {
    Ge(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let r = 0; r < s; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const nt = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, et = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, fr = /* @__NO_SIDE_EFFECTS__ */ (t, e) => e ? t * (1e3 / e) : 0, Cs = /* @__PURE__ */ new Set();
function Si(t, e, n) {
  t || Cs.has(e) || (console.warn(Dn(e, n)), Cs.add(e));
}
const pr = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, nc = 1e-7, ic = 12;
function sc(t, e, n, i, s) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = pr(o, i, s) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > nc && ++a < ic);
  return o;
}
// @__NO_SIDE_EFFECTS__
function Ae(t, e, n, i) {
  if (t === e && n === i)
    return at;
  const s = (r) => sc(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : pr(s(r), e, i);
}
const mr = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, yr = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => 1 - t(1 - e), vr = /* @__PURE__ */ Ae(0.33, 1.53, 0.69, 0.99), bi = /* @__PURE__ */ yr(vr), xr = /* @__PURE__ */ mr(bi), wr = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * bi(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), ki = (t) => 1 - Math.sin(Math.acos(t)), Rr = /* @__PURE__ */ yr(ki), Er = /* @__PURE__ */ mr(ki), oc = /* @__PURE__ */ Ae(0.42, 0, 1, 1), rc = /* @__PURE__ */ Ae(0, 0, 0.58, 1), Sr = /* @__PURE__ */ Ae(0.42, 0, 0.58, 1), ac = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] != "number", br = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] == "number", As = {
  linear: at,
  easeIn: oc,
  easeInOut: Sr,
  easeOut: rc,
  circIn: ki,
  circInOut: Er,
  circOut: Rr,
  backIn: bi,
  backInOut: xr,
  backOut: vr,
  anticipate: wr
}, lc = (t) => typeof t == "string", hs = (t) => {
  if (/* @__PURE__ */ br(t)) {
    Ct(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, n, i, s] = t;
    return /* @__PURE__ */ Ae(e, n, i, s);
  } else if (lc(t))
    return Ct(As[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), As[t];
  return t;
}, pe = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function gc(t) {
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), i = !1, s = !1;
  const r = /* @__PURE__ */ new Set();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function a(g) {
    r.has(g) && (n.add(g), t()), g(o);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, l = !1, I = !1) => {
      const C = I && i ? e : n;
      return l && r.add(g), C.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      n.delete(g), r.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (o = g, i) {
        s = !0;
        return;
      }
      i = !0;
      const l = e;
      e = n, n = l, e.forEach(a), e.clear(), i = !1, s && (s = !1, c.process(g));
    }
  };
  return c;
}
const cc = 40;
function kr(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = pe.reduce((y, x) => (y[x] = gc(r), y), {}), { setup: a, read: c, resolveKeyframes: g, preUpdate: l, update: I, preRender: u, render: C, postRender: A } = o, h = () => {
    const y = dt.useManualTiming, x = y ? s.timestamp : performance.now();
    n = !1, y || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(x - s.timestamp, cc), 1)), s.timestamp = x, s.isProcessing = !0, a.process(s), c.process(s), g.process(s), l.process(s), I.process(s), u.process(s), C.process(s), A.process(s), s.isProcessing = !1, n && e && (i = !1, t(h));
  }, f = () => {
    n = !0, i = !0, s.isProcessing || t(h);
  };
  return { schedule: pe.reduce((y, x) => {
    const R = o[x];
    return y[x] = (S, m = !1, w = !1) => (n || f(), R.schedule(S, m, w)), y;
  }, {}), cancel: (y) => {
    for (let x = 0; x < pe.length; x++)
      o[pe[x]].cancel(y);
  }, state: s, steps: o };
}
const { schedule: V, cancel: yt, state: z, steps: dn } = /* @__PURE__ */ kr(typeof requestAnimationFrame < "u" ? requestAnimationFrame : at, !0);
let Re;
function Ic() {
  Re = void 0;
}
const q = {
  now: () => (Re === void 0 && q.set(z.isProcessing || dt.useManualTiming ? z.timestamp : performance.now()), Re),
  set: (t) => {
    Re = t, queueMicrotask(Ic);
  }
}, Yt = (t) => Math.round(t * 1e5) / 1e5, Tr = (t) => (e) => typeof e == "string" && e.startsWith(t), Or = /* @__PURE__ */ Tr("--"), uc = /* @__PURE__ */ Tr("var(--"), Ti = (t) => uc(t) ? Cc.test(t.split("/*")[0].trim()) : !1, Cc = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ds(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Xt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, le = {
  ...Xt,
  transform: (t) => lt(0, 1, t)
}, me = {
  ...Xt,
  default: 1
}, Oi = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Ac(t) {
  return t == null;
}
const hc = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Pi = (t, e) => (n) => !!(typeof n == "string" && hc.test(n) && n.startsWith(t) || e && !Ac(n) && Object.prototype.hasOwnProperty.call(n, e)), Pr = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, r, o, a] = i.match(Oi);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, dc = (t) => lt(0, 255, t), fn = {
  ...Xt,
  transform: (t) => Math.round(dc(t))
}, bt = {
  test: /* @__PURE__ */ Pi("rgb", "red"),
  parse: /* @__PURE__ */ Pr("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + fn.transform(t) + ", " + fn.transform(e) + ", " + fn.transform(n) + ", " + Yt(le.transform(i)) + ")"
};
function fc(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Gn = {
  test: /* @__PURE__ */ Pi("#"),
  parse: fc,
  transform: bt.transform
}, he = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), At = /* @__PURE__ */ he("deg"), It = /* @__PURE__ */ he("%"), b = /* @__PURE__ */ he("px"), pc = /* @__PURE__ */ he("vh"), mc = /* @__PURE__ */ he("vw"), fs = {
  ...It,
  parse: (t) => It.parse(t) / 100,
  transform: (t) => It.transform(t * 100)
}, Gt = {
  test: /* @__PURE__ */ Pi("hsl", "hue"),
  parse: /* @__PURE__ */ Pr("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + It.transform(Yt(e)) + ", " + It.transform(Yt(n)) + ", " + Yt(le.transform(i)) + ")"
}, B = {
  test: (t) => bt.test(t) || Gn.test(t) || Gt.test(t),
  parse: (t) => bt.test(t) ? bt.parse(t) : Gt.test(t) ? Gt.parse(t) : Gn.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? bt.transform(t) : Gt.transform(t),
  getAnimatableNone: (t) => {
    const e = B.parse(t);
    return e.alpha = 0, B.transform(e);
  }
}, yc = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, jr = /* @__PURE__ */ new RegExp(Oi.source), Mr = /* @__PURE__ */ new RegExp(yc.source, "i");
function vc(t) {
  return isNaN(t) && typeof t == "string" && (jr.test(t) || Mr.test(t));
}
const Fr = "number", Ur = "color", xc = "var", wc = "var(", ps = "${}", Rc = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ec(t) {
  const e = t.toString();
  return jr.test(e) || Mr.test(e);
}
function ge(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let r = 0;
  const a = e.replace(Rc, (c) => (B.test(c) ? (i.color.push(r), s.push(Ur), n.push(B.parse(c))) : c.startsWith(wc) ? (i.var.push(r), s.push(xc), n.push(c)) : (i.number.push(r), s.push(Fr), n.push(parseFloat(c))), ++r, ps)).split(ps);
  return { values: n, split: a, indexes: i, types: s };
}
function Sc(t) {
  return ge(t).values;
}
function Nr({ split: t, types: e }) {
  const n = t.length;
  return (i) => {
    let s = "";
    for (let r = 0; r < n; r++)
      if (s += t[r], i[r] !== void 0) {
        const o = e[r];
        o === Fr ? s += Yt(i[r]) : o === Ur ? s += B.transform(i[r]) : s += i[r];
      }
    return s;
  };
}
function bc(t) {
  return Nr(ge(t));
}
const kc = (t) => typeof t == "number" ? 0 : B.test(t) ? B.getAnimatableNone(t) : t, Tc = (t, e) => typeof t == "number" ? e?.trim().endsWith("/") ? t : 0 : kc(t);
function Oc(t) {
  const e = ge(t);
  return Nr(e)(e.values.map((i, s) => Tc(i, e.split[s])));
}
const it = {
  test: vc,
  parse: Sc,
  createTransformer: bc,
  getAnimatableNone: Oc
};
function pn(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Pc({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, r = 0, o = 0;
  if (!e)
    s = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, c = 2 * n - a;
    s = pn(c, a, t + 1 / 3), r = pn(c, a, t), o = pn(c, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function Je(t, e) {
  return (n) => n > 0 ? e : t;
}
const K = (t, e, n) => t + (e - t) * n, mn = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, jc = [Gn, bt, Gt], Mc = (t) => jc.find((e) => e.test(t));
function ms(t) {
  const e = Mc(t);
  if (!e)
    return qt(!1, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !1;
  let n = e.parse(t);
  return e === Gt && (n = Pc(n)), n;
}
const ys = (t, e) => {
  const n = ms(t), i = ms(e);
  if (!n || !i)
    return Je(t, e);
  const s = { ...n };
  return (r) => (s.red = mn(n.red, i.red, r), s.green = mn(n.green, i.green, r), s.blue = mn(n.blue, i.blue, r), s.alpha = K(n.alpha, i.alpha, r), bt.transform(s));
}, Qn = /* @__PURE__ */ new Set(["none", "hidden"]);
function Fc(t, e) {
  return Qn.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Uc(t, e) {
  return (n) => K(t, e, n);
}
function ji(t) {
  return typeof t == "number" ? Uc : typeof t == "string" ? Ti(t) ? Je : B.test(t) ? ys : Lc : Array.isArray(t) ? Kr : typeof t == "object" ? B.test(t) ? ys : Nc : Je;
}
function Kr(t, e) {
  const n = [...t], i = n.length, s = t.map((r, o) => ji(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      n[o] = s[o](r);
    return n;
  };
}
function Nc(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = ji(t[s])(t[s], e[s]));
  return (s) => {
    for (const r in i)
      n[r] = i[r](s);
    return n;
  };
}
function Kc(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const r = e.types[s], o = t.indexes[r][i[r]], a = t.values[o] ?? 0;
    n[s] = a, i[r]++;
  }
  return n;
}
const Lc = (t, e) => {
  const n = it.createTransformer(e), i = ge(t), s = ge(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Qn.has(t) && !s.values.length || Qn.has(e) && !i.values.length ? Fc(t, e) : Ce(Kr(Kc(i, s), s.values), n) : (qt(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Je(t, e));
}, vs = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
function Vc(t, e) {
  const n = vs.exec(t);
  if (!n)
    return;
  const i = vs.exec(e);
  if (!i || n[2] !== i[2])
    return;
  const s = n[2], r = parseFloat(n[1]), o = parseFloat(i[1]);
  return (a) => Yt(K(r, o, a)) + s;
}
function Mi(t, e, n) {
  if (typeof t == "number" && typeof e == "number" && typeof n == "number")
    return K(t, e, n);
  if (typeof t == "string" && typeof e == "string") {
    const s = Vc(t, e);
    if (s)
      return s;
  }
  return ji(t)(t, e);
}
const Dc = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => V.update(e, n),
    stop: () => yt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => z.isProcessing ? z.timestamp : q.now()
  };
}, Lr = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < s; r++)
    i += Math.round(t(r / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Fi = 2e4;
function Ui(t, e = 50, n = Fi, i) {
  let s = 0, r = t.next(s);
  for (; !r.done && s < n; )
    s += e, r = t.next(s);
  return s >= n ? 1 / 0 : s;
}
function Gc(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(Ui(i), Fi);
  return {
    type: "keyframes",
    ease: (r) => i.next(s * r).value / e,
    duration: /* @__PURE__ */ et(s)
  };
}
const G = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Jn(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Qc = 12;
function Jc(t, e, n) {
  let i = n;
  for (let s = 1; s < Qc; s++)
    i = i - t(i) / e(i);
  return i;
}
const yn = 1e-3;
function zc({ duration: t = G.duration, bounce: e = G.bounce, velocity: n = G.velocity, mass: i = G.mass }) {
  let s, r;
  qt(t <= /* @__PURE__ */ nt(G.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - e;
  o = lt(G.minDamping, G.maxDamping, o), t = lt(G.minDuration, G.maxDuration, /* @__PURE__ */ et(t)), o < 1 ? (s = (g) => {
    const l = g * o, I = l * t, u = l - n, C = Jn(g, o), A = Math.exp(-I);
    return yn - u / C * A;
  }, r = (g) => {
    const I = g * o * t, u = I * n + n, C = o * o * g * g * t, A = Math.exp(-I), h = Jn(g * g, o);
    return (-s(g) + yn > 0 ? -1 : 1) * ((u - C) * A) / h;
  }) : (s = (g) => {
    const l = Math.exp(-g * t), I = (g - n) * t + 1;
    return -yn + l * I;
  }, r = (g) => {
    const l = Math.exp(-g * t), I = (n - g) * (t * t);
    return l * I;
  });
  const a = 5 / t, c = Jc(s, r, a);
  if (t = /* @__PURE__ */ nt(t), isNaN(c))
    return {
      stiffness: G.stiffness,
      damping: G.damping,
      duration: t
    };
  {
    const g = c * c * i;
    return {
      stiffness: g,
      damping: o * 2 * Math.sqrt(i * g),
      duration: t
    };
  }
}
const Vr = ["duration", "bounce"], Dr = ["stiffness", "damping", "mass"];
function ze(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Bc(t) {
  let e = {
    velocity: G.velocity,
    stiffness: G.stiffness,
    damping: G.damping,
    mass: G.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ze(t, Dr) && ze(t, Vr))
    if (e.velocity = 0, t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, r = 2 * lt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: G.mass,
        stiffness: s,
        damping: r
      };
    } else {
      const n = zc({ ...t, velocity: 0 });
      e = {
        ...e,
        ...n,
        mass: G.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function Be(t = G.visualDuration, e = G.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t, i = n.keyframes[0], s = n.keyframes[n.keyframes.length - 1], r = { done: !1, value: i }, { stiffness: o, damping: a, mass: c, duration: g, velocity: l, isResolvedFromDuration: I } = Bc({
    ...n,
    velocity: -/* @__PURE__ */ et(n.velocity || 0)
  }), u = a / (2 * Math.sqrt(o * c)), C = /* @__PURE__ */ et(Math.sqrt(o / c)), A = u * C, h = {
    target: s,
    delta: s - i,
    velocity: l || 0,
    restSpeed: 0,
    restDelta: 0
  }, f = () => {
    const m = Math.abs(h.delta) < 5;
    h.restSpeed = n.restSpeed || (m ? G.restSpeed.granular : G.restSpeed.default), h.restDelta = n.restDelta || (m ? G.restDelta.granular : G.restDelta.default);
  };
  f();
  let d, p, y;
  if (u < 1) {
    const m = Jn(C, u), w = { A: 0, sinC: 0, cosC: 0, t: -1, env: 0, sin: 0, cos: 0 };
    y = () => {
      w.A = (h.velocity + A * h.delta) / m, w.sinC = A * w.A + h.delta * m, w.cosC = A * h.delta - w.A * m;
    };
    const P = (T) => {
      T !== w.t && (w.t = T, w.env = Math.exp(-A * T), w.sin = Math.sin(m * T), w.cos = Math.cos(m * T));
    };
    d = (T) => (P(T), h.target - w.env * (w.A * w.sin + h.delta * w.cos)), p = (T) => (P(T), w.env * (w.sinC * w.sin + w.cosC * w.cos));
  } else if (u === 1) {
    d = (w) => h.target - Math.exp(-C * w) * (h.delta + (h.velocity + C * h.delta) * w);
    const m = { C: 0 };
    y = () => {
      m.C = h.velocity + C * h.delta;
    }, p = (w) => Math.exp(-C * w) * (C * m.C * w - h.velocity);
  } else {
    const m = C * Math.sqrt(u * u - 1);
    d = (P) => {
      const T = Math.exp(-A * P), N = Math.min(m * P, 300);
      return h.target - T * ((h.velocity + A * h.delta) * Math.sinh(N) + m * h.delta * Math.cosh(N)) / m;
    };
    const w = { P: 0, sinh: 0, cosh: 0 };
    y = () => {
      w.P = (h.velocity + A * h.delta) / m, w.sinh = A * w.P - h.delta * m, w.cosh = A * h.delta - w.P * m;
    }, p = (P) => {
      const T = Math.exp(-A * P), N = Math.min(m * P, 300);
      return T * (w.sinh * Math.sinh(N) + w.cosh * Math.cosh(N));
    };
  }
  y();
  const x = !ze(n, Dr) && ze(n, Vr), R = I && g || null, S = {
    calculatedDuration: R,
    /**
     * Aim the spring at a new target from its current position and
     * velocity, reusing the resolved physics and closures.
     */
    retarget: (m, w) => {
      h.target = m[m.length - 1], h.delta = h.target - m[0], h.velocity = x ? 0 : -/* @__PURE__ */ et(w), n.restSpeed && n.restDelta || f(), S.calculatedDuration = R, r.done = !1, y();
    },
    velocity: (m) => /* @__PURE__ */ nt(p(m)),
    next: (m) => {
      const w = d(m);
      if (I)
        r.done = m >= g;
      else {
        const P = /* @__PURE__ */ nt(p(m));
        r.done = Math.abs(P) <= h.restSpeed && Math.abs(h.target - w) <= h.restDelta;
      }
      return r.value = r.done ? h.target : w, r;
    },
    toString: () => {
      const m = Math.min(Ui(S), Fi), w = Lr((P) => S.next(m * P).value, m, 30);
      return m + "ms " + w;
    },
    toTransition: () => {
    }
  };
  return S;
}
Be.applyToOptions = (t) => {
  const e = Gc(t, 100, Be);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ nt(e.duration), t.type = "keyframes", t;
};
function zn({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: c, restDelta: g = 0.5, restSpeed: l }) {
  const I = t[0], u = {
    done: !1,
    value: I
  }, C = (m) => m < a || m > c, A = (m) => a === void 0 ? c : c === void 0 || Math.abs(a - m) < Math.abs(c - m) ? a : c;
  let h = n * e;
  const f = I + h, d = o === void 0 ? f : o(f);
  d !== f && (h = d - I);
  const p = (m) => -h * Math.exp(-m / i), y = (m) => {
    const w = p(m);
    u.done = Math.abs(w) <= g, u.value = u.done ? d : d + w;
  };
  let x, R;
  const S = (m) => {
    C(u.value) && (x = m, R = Be({
      keyframes: [u.value, A(u.value)],
      /**
       * The friction curve is target + calcDelta(t), so its exact
       * derivative is -calcDelta(t) / timeConstant in units/ms,
       * converted here to the units/second expected by spring.
       */
      velocity: -p(m) / i * 1e3,
      damping: s,
      stiffness: r,
      restDelta: g,
      restSpeed: l
    }));
  };
  return S(0), {
    calculatedDuration: null,
    next: (m) => {
      let w = !1;
      return !R && x === void 0 && (w = !0, y(m), S(m)), x !== void 0 && m >= x ? R.next(m - x) : (!w && y(m), u);
    }
  };
}
function Yc(t, e, n) {
  const i = [], s = n || dt.mix || Mi, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = s(t[o], t[o + 1]);
    if (e) {
      const c = Array.isArray(e) ? e[o] || at : e;
      a = Ce(c, a);
    }
    i.push(a);
  }
  return i;
}
function Zc(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const r = t.length;
  if (Ct(r === e.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Yc(e, i, s), c = a.length, g = (l) => {
    if (o && l < t[0])
      return e[0];
    let I = 0;
    if (c > 1)
      for (; I < t.length - 2 && !(l < t[I + 1]); I++)
        ;
    const u = /* @__PURE__ */ ae(t[I], t[I + 1], l);
    return a[I](u);
  };
  return n ? (l) => g(lt(t[0], t[r - 1], l)) : g;
}
function Wc(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ ae(0, e, i);
    t.push(K(n, 1, s));
  }
}
function Hc(t) {
  const e = [0];
  return Wc(e, t.length - 1), e;
}
function qc(t, e) {
  return t.map((n) => n * e);
}
function Xc(t, e) {
  return t.map(() => e || Sr).splice(0, t.length - 1);
}
function Qt({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = /* @__PURE__ */ ac(i) ? i.map(hs) : hs(i), r = {
    done: !1,
    value: e[0]
  };
  if (e.length === 2 && !Array.isArray(s) && (!n || n.length !== 2 || n[0] === 0 && n[1] === 1)) {
    const [c, g] = e, l = c === g ? void 0 : (dt.mix || Mi)(c, g);
    return {
      calculatedDuration: t,
      next: (I) => (r.value = l ? l(s(t > 0 ? lt(0, 1, I / t) : 1)) : g, r.done = I >= t, r)
    };
  }
  const o = qc(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Hc(e),
    t
  ), a = Zc(o, e, {
    ease: Array.isArray(s) ? s : Xc(e, s)
  });
  return {
    calculatedDuration: t,
    next: (c) => (r.value = a(c), r.done = c >= t, r)
  };
}
const _c = 5;
function $c(t, e, n) {
  const i = Math.max(e - _c, 0);
  return /* @__PURE__ */ fr(n - t(i), e - i);
}
function tI(t, e, n = 0) {
  return e <= 0 ? n : t.velocity ? t.velocity(e) : $c((i) => t.next(i).value, e, t.next(e).value);
}
const eI = (t) => t !== null;
function ln(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const r = t.filter(eI), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const nI = {
  decay: zn,
  inertia: zn,
  tween: Qt,
  keyframes: Qt,
  spring: Be
};
function Gr(t) {
  typeof t.type == "string" && (t.type = nI[t.type]);
}
function Qr(t, e) {
  return {
    kind: t,
    animation: e,
    timestamp: q.now(),
    frameTimestamp: z.timestamp,
    frameIsProcessing: z.isProcessing
  };
}
function Jr(t, e, n) {
  const i = globalThis.__MOTION_INSPECT__;
  if (i)
    try {
      i({
        ...Qr("animation-start", t),
        options: n ? { ...e, ...n } : e
      });
    } catch {
    }
}
function iI(t, e) {
  const n = globalThis.__MOTION_INSPECT__;
  if (n)
    try {
      n({
        ...Qr("layout-animation-start", t),
        node: e
      });
    } catch {
    }
}
class Ni {
  constructor() {
    this.isResolved = !1;
  }
  get finished() {
    return this._finished || (this._finished = this.isResolved ? Promise.resolve() : new Promise((e) => {
      this._resolve = e;
    })), this._finished;
  }
  updateFinished() {
    this._finished = this._resolve = void 0, this.isResolved = !1;
  }
  notifyFinished() {
    this.isResolved = !0, this._resolve?.();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const sI = (t) => t / 100;
class Ye extends Ni {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== q.now() && this.tick(q.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause(), Jr(this, this.options);
  }
  initAnimation() {
    const { options: e } = this;
    Gr(e);
    const { type: n = Qt, repeat: i = 0, repeatDelay: s = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const c = n || Qt;
    process.env.NODE_ENV !== "production" && c !== Qt && Ct(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), c !== Qt && typeof a[0] != "number" && (this.mixKeyframes = Ce(sI, Mi(a[0], a[1])), a = [0, 100]);
    const g = c(a === e.keyframes ? e : { ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = c({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), g.calculatedDuration === null && (g.calculatedDuration = Ui(g));
    const { calculatedDuration: l } = g;
    this.calculatedDuration = l, this.resolvedDuration = l + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = g;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: c } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: g = 0, keyframes: l, repeat: I, repeatType: u, repeatDelay: C, type: A, onUpdate: h, finalKeyframe: f } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const d = this.currentTime - g * (this.playbackSpeed >= 0 ? 1 : -1), p = this.playbackSpeed >= 0 ? d < 0 : d > s;
    this.currentTime = Math.max(d, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let y = this.currentTime, x = i;
    if (I) {
      const w = Math.min(this.currentTime, s) / a;
      let P = Math.floor(w), T = w % 1;
      !T && w >= 1 && (T = 1), T === 1 && P--, P = Math.min(P, I + 1), P % 2 && (u === "reverse" ? (T = 1 - T, C && (T -= C / a)) : u === "mirror" && (x = o)), y = lt(0, 1, T) * a;
    }
    let R;
    p ? (this.delayState.value = l[0], R = this.delayState) : R = x.next(y), r && !p && (R.value = r(R.value));
    let { done: S } = R;
    !p && c !== null && (S = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const m = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return m && A !== zn && (R.value = ln(l, this.options, f, this.speed)), h && h(R.value), m && this.finish(), R;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ et(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ et(e);
  }
  get time() {
    return /* @__PURE__ */ et(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ nt(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    return tI(this.generator, this.currentTime, this.options.velocity);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    n && this.driver && this.updateTime(q.now()), this.playbackSpeed = e, n && this.driver && (this.time = /* @__PURE__ */ et(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Dc, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(q.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
const oI = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function rI(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(Oi) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let r = oI.has(e) ? 1 : 0;
  return i !== n && (r *= 100), e + "(" + r + s + ")";
}
const aI = /\b([a-z-]*)\(.*?\)/gu, Bn = {
  ...it,
  getAnimatableNone: (t) => {
    const e = t.match(aI);
    return e ? e.map(rI).join(" ") : t;
  }
}, Yn = {
  ...it,
  getAnimatableNone: (t) => {
    const e = it.parse(t);
    return it.createTransformer(t)(e.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, xs = {
  ...Xt,
  transform: Math.round
}, lI = {
  rotate: At,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: At,
  rotateX: At,
  rotateY: At,
  rotateZ: At,
  scale: me,
  scaleX: me,
  scaleY: me,
  scaleZ: me,
  skew: At,
  skewX: At,
  skewY: At,
  distance: b,
  translateX: b,
  translateY: b,
  translateZ: b,
  x: b,
  y: b,
  z: b,
  perspective: b,
  transformPerspective: b,
  opacity: le,
  originX: fs,
  originY: fs,
  originZ: b
}, Ze = {
  // Border props
  borderWidth: b,
  borderTopWidth: b,
  borderRightWidth: b,
  borderBottomWidth: b,
  borderLeftWidth: b,
  borderRadius: b,
  borderTopLeftRadius: b,
  borderTopRightRadius: b,
  borderBottomRightRadius: b,
  borderBottomLeftRadius: b,
  // Positioning props
  width: b,
  maxWidth: b,
  height: b,
  maxHeight: b,
  top: b,
  right: b,
  bottom: b,
  left: b,
  inset: b,
  insetBlock: b,
  insetBlockStart: b,
  insetBlockEnd: b,
  insetInline: b,
  insetInlineStart: b,
  insetInlineEnd: b,
  // Spacing props
  padding: b,
  paddingTop: b,
  paddingRight: b,
  paddingBottom: b,
  paddingLeft: b,
  paddingBlock: b,
  paddingBlockStart: b,
  paddingBlockEnd: b,
  paddingInline: b,
  paddingInlineStart: b,
  paddingInlineEnd: b,
  margin: b,
  marginTop: b,
  marginRight: b,
  marginBottom: b,
  marginLeft: b,
  marginBlock: b,
  marginBlockStart: b,
  marginBlockEnd: b,
  marginInline: b,
  marginInlineStart: b,
  marginInlineEnd: b,
  // Typography
  fontSize: b,
  // Misc
  backgroundPositionX: b,
  backgroundPositionY: b,
  ...lI,
  zIndex: xs,
  // SVG
  fillOpacity: le,
  strokeOpacity: le,
  numOctaves: xs
}, gI = {
  ...Ze,
  // Color props
  color: B,
  backgroundColor: B,
  outlineColor: B,
  fill: B,
  stroke: B,
  // Border props
  borderColor: B,
  borderTopColor: B,
  borderRightColor: B,
  borderBottomColor: B,
  borderLeftColor: B,
  filter: Bn,
  WebkitFilter: Bn,
  mask: Yn,
  WebkitMask: Yn
}, zr = (t) => gI[t], cI = /* @__PURE__ */ new Set([Bn, Yn]);
function Ki(t, e) {
  let n = zr(t);
  return cI.has(n) || (n = it), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
function II(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const kt = (t) => t * 180 / Math.PI, Zn = (t) => {
  const e = kt(Math.atan2(t[1], t[0]));
  return Wn(e);
}, uI = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Zn,
  rotateZ: Zn,
  skewX: (t) => kt(Math.atan(t[1])),
  skewY: (t) => kt(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Wn = (t) => (t = t % 360, t < 0 && (t += 360), t), ws = Zn, Rs = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Es = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), CI = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Rs,
  scaleY: Es,
  scale: (t) => (Rs(t) + Es(t)) / 2,
  rotateX: (t) => Wn(kt(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Wn(kt(Math.atan2(-t[2], t[0]))),
  rotateZ: ws,
  rotate: ws,
  skewX: (t) => kt(Math.atan(t[4])),
  skewY: (t) => kt(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Hn(t) {
  return t.includes("scale") ? 1 : 0;
}
function qn(t, e) {
  if (!t || t === "none")
    return Hn(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = CI, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = uI, s = a;
  }
  if (!s)
    return Hn(e);
  const r = i[e], o = s[1].split(",").map(hI);
  return typeof r == "function" ? r(o) : o[r];
}
const AI = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return qn(n, e);
};
function hI(t) {
  return parseFloat(t.trim());
}
const _t = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], $t = /* @__PURE__ */ new Set([..._t, "pathRotation"]), Ss = (t) => t === Xt || t === b, dI = /* @__PURE__ */ new Set(["x", "y", "z"]), fI = _t.filter((t) => !dI.has(t));
function pI(t) {
  const e = [];
  return fI.forEach((n) => {
    const i = t.getValue(n);
    if (i !== void 0) {
      const s = i.get(), r = n.startsWith("scale") ? 1 : 0;
      if (s === r)
        return;
      e.push([n, s]), i.set(r);
    }
  }), e;
}
const mI = /* @__PURE__ */ new Set(["bottom", "right"]);
function bs(t, e, n, i, s, r) {
  const o = parseFloat(t);
  if (!isNaN(o))
    return o;
  const { min: a, max: c } = e()[n], g = c - a;
  return r === "border-box" ? g : g - parseFloat(i) - parseFloat(s);
}
const Pt = {
  // Dimensions
  width: ({ width: t, paddingLeft: e = "0", paddingRight: n = "0", boxSizing: i }, s) => bs(t, s, "x", e, n, i),
  height: ({ height: t, paddingTop: e = "0", paddingBottom: n = "0", boxSizing: i }, s) => bs(t, s, "y", e, n, i),
  top: ({ top: t }) => parseFloat(t),
  left: ({ left: t }) => parseFloat(t),
  bottom: ({ top: t }, e) => {
    const { y: n } = e();
    return parseFloat(t) + (n.max - n.min);
  },
  right: ({ left: t }, e) => {
    const { x: n } = e();
    return parseFloat(t) + (n.max - n.min);
  },
  // Transform
  x: ({ transform: t }) => qn(t, "x"),
  y: ({ transform: t }) => qn(t, "y")
};
Pt.translateX = Pt.x;
Pt.translateY = Pt.y;
const jt = /* @__PURE__ */ new Set();
let Xn = !1, _n = !1, $n = !1;
function Br() {
  if (_n) {
    const t = [], e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
    jt.forEach((s) => {
      s.needsMeasurement && (t.push(s), e.add(s.element), mI.has(s.name) && n.add(s.element));
    });
    const i = /* @__PURE__ */ new Map();
    n.forEach((s) => {
      const r = pI(s);
      r.length && (i.set(s, r), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const r = i.get(s);
      r && r.forEach(([o, a]) => {
        s.getValue(o)?.set(a);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  _n = !1, Xn = !1, jt.forEach((t) => t.complete($n)), jt.clear();
}
function Yr() {
  jt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (_n = !0);
  });
}
function yI() {
  $n = !0, Yr(), Br(), $n = !1;
}
function vI(t, e, n) {
  if (typeof t == "string") {
    if (Ri(t) || Ei(t))
      return parseFloat(t);
    if (!it.test(t) && it.test(n))
      return Ki(e, n);
  }
  return t ?? void 0;
}
class Li {
  constructor(e, n, i, s, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (jt.add(this), Xn || (Xn = !0, V.read(Yr), V.resolveKeyframes(Br))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const r = s?.get(), o = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (i && n) {
        const a = vI(i.readValue(n, o), n, o);
        a !== void 0 && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), s && r === void 0 && s.set(e[0]);
    }
    II(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), jt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (jt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const xI = (t) => t.startsWith("--");
function Zr(t, e, n) {
  xI(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const wI = {};
function Wr(t, e) {
  const n = /* @__PURE__ */ dr(t);
  return () => wI[e] ?? n();
}
const RI = /* @__PURE__ */ Wr(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Hr = /* @__PURE__ */ Wr(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ee = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, ks = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ee([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ee([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ee([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ee([0.33, 1.53, 0.69, 0.99])
};
function qr(t, e) {
  if (t)
    return typeof t == "function" ? Hr() ? Lr(t, e) : "ease-out" : /* @__PURE__ */ br(t) ? ee(t) : Array.isArray(t) ? t.map((n) => qr(n, e) || ks.easeOut) : ks[t];
}
function EI(t, e, n, { delay: i = 0, duration: s = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: c } = {}, g = void 0) {
  const l = {
    [e]: n
  };
  c && (l.offset = c);
  const I = qr(a, s);
  Array.isArray(I) && (l.easing = I);
  const u = {
    delay: i,
    duration: s,
    easing: Array.isArray(I) ? "linear" : I,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return g && (u.pseudoElement = g), t.animate(l, u);
}
function Xr(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function SI({ type: t, ...e }) {
  return Xr(t) && Hr() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class _r extends Ni {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: c } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, Ct(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const g = SI(e);
    this.animation = EI(n, i, s, g, r), g.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const l = ln(s, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(l), Zr(n, i, l), this.animation.cancel();
      }
      c?.(), this.notifyFinished();
    }, Jr(this, e, g);
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const e = this.options?.element;
    !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ et(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ et(e);
  }
  get time() {
    return /* @__PURE__ */ et(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ nt(e), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: n, rangeEnd: i, observe: s }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && RI() ? (this.animation.timeline = e, n && (this.animation.rangeStart = n), i && (this.animation.rangeEnd = i), at) : s(this);
  }
}
const $r = {
  anticipate: wr,
  backInOut: xr,
  circInOut: Er
};
function bI(t) {
  return t in $r;
}
function kI(t) {
  typeof t.ease == "string" && bI(t.ease) && (t.ease = $r[t.ease]);
}
const vn = 10;
class TI extends _r {
  constructor(e) {
    kI(e), Gr(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: r, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Ye({
      ...o,
      autoplay: !1
    }), c = Math.max(vn, q.now() - this.startTime), g = lt(0, vn, c - vn), l = a.sample(c).value, { name: I } = this.options;
    r && I && Zr(r, I, l), n.setWithVelocity(a.sample(Math.max(0, c - g)).value, l, g), a.stop();
  }
}
const Ts = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(it.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function OI(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function PI(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = Ts(s, e), a = Ts(r, e);
  return !o || !a ? (o !== a && qt(!1, `You are trying to animate ${e} from "${s}" to "${r}". "${o ? r : s}" is not an animatable value.`, "value-not-animatable"), !1) : OI(t) || (n === "spring" || Xr(n)) && i;
}
function ti(t) {
  t.duration = 0, t.type = "keyframes";
}
const ei = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), jI = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function MI(t) {
  for (let e = 0; e < t.length; e++)
    if (typeof t[e] == "string" && jI.test(t[e]))
      return !0;
  return !1;
}
const Os = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), FI = /* @__PURE__ */ dr(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function UI(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: r, type: o, keyframes: a } = t;
  if (!n || !(ei.has(n) || Os.has(n)))
    return !1;
  const c = e?.owner?.current;
  if (!(c instanceof HTMLElement) && !(c instanceof SVGElement))
    return !1;
  const { onUpdate: g, transformTemplate: l } = e.owner.getProps();
  return FI() && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (ei.has(n) || Os.has(n) && MI(a)) && (n !== "transform" || !l) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !g && !i && s !== "mirror" && r !== 0 && o !== "inertia";
}
const NI = 40;
class KI extends Ni {
  constructor(e) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = q.now();
    const { keyframes: n, name: i, motionValue: s, element: r } = e, o = e;
    o.autoplay ?? (o.autoplay = !0), o.delay ?? (o.delay = 0), o.type ?? (o.type = "keyframes"), o.repeat ?? (o.repeat = 0), o.repeatDelay ?? (o.repeatDelay = 0), o.repeatType ?? (o.repeatType = "loop");
    const a = r?.KeyframeResolver || Li;
    this.keyframeResolver = new a(n, (c, g, l) => this.onKeyframesResolved(c, g, o, !l), i, s, r), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: c, isHandoff: g, onUpdate: l } = i;
    this.resolvedAt = q.now();
    let I = !0;
    PI(e, r, o, a) || (I = !1, (dt.instantAnimations || !c) && l?.(ln(e, i, n)), e[0] = e[e.length - 1], ti(i), i.repeat = 0);
    const u = s ? this.resolvedAt ? this.resolvedAt - this.createdAt > NI ? this.resolvedAt : this.createdAt : this.createdAt : void 0, { onComplete: C } = i;
    i.startTime ?? (i.startTime = u), i.finalKeyframe = n, i.keyframes = e, i.onComplete = () => {
      C?.(), this.notifyFinished();
    };
    const A = I && !g && UI(i);
    let h;
    if (A) {
      i.element = i.motionValue?.owner?.current;
      try {
        h = new TI(i);
      } catch {
        h = new Ye(i);
      }
    } else
      h = new Ye(i);
    this.pendingTimeline && (this.stopTimeline = h.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = h;
  }
  get finished() {
    return this._animation ? this._animation.finished : super.finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), yI()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function ta(t, e, n, i = 0, s = 1) {
  const r = Array.from(t).sort((g, l) => g.sortNodePosition(l)).indexOf(e), o = t.size, a = (o - 1) * i;
  return typeof n == "function" ? n(r, o) : s === 1 ? r * i : a - r * i;
}
const Ps = 30, LI = (t) => !isNaN(parseFloat(t));
class VI {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = q.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.notifyChange(), this.dependents))
        for (const r of this.dependents)
          r.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = q.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = LI(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && Si(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    var i;
    return e === "change" ? this.onChangeSubscribe(n) : ((i = this.events)[e] || (i[e] = new Qe())).add(n);
  }
  onChangeSubscribe(e) {
    const { events: n } = this;
    return !n.change && !this.changeSubscriber ? this.changeSubscriber = e : (n.change || (n.change = new Qe(), n.change.add(this.changeSubscriber), this.changeSubscriber = void 0), n.change.add(e)), () => {
      this.changeSubscriber === e ? this.changeSubscriber = void 0 : n.change?.remove(e), this.stopIfUnobserved();
    };
  }
  /**
   * If we have no more change listeners by the start
   * of the next frame, stop active animations.
   */
  stopIfUnobserved() {
    V.read(() => {
      !this.changeSubscriber && !this.events.change?.getSize() && this.stop();
    });
  }
  clearListeners() {
    this.changeSubscriber = void 0;
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.notifyChange();
  }
  notifyChange() {
    const { current: e, changeSubscriber: n } = this;
    n ? n(e) : this.events.change?.notify(e);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = q.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Ps)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ps);
    return /* @__PURE__ */ fr(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0;
      let i = !1, s;
      s = e(() => {
        i = !0, this.events.animationComplete?.notify(), this.animation === s && this.clearAnimation(), n();
      }), i || (this.animation = s), this.events.animationStart?.notify();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    this.animation = void 0;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Wt(t, e) {
  return new VI(t, e);
}
function ea(t, e) {
  if (t?.inherit && e) {
    const { inherit: n, ...i } = t;
    return { ...e, ...i };
  }
  return t;
}
function Vi(t, e) {
  const n = t?.[e] ?? t?.default ?? t;
  return n !== t ? ea(n, t) : n;
}
const DI = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, GI = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), QI = {
  type: "keyframes",
  duration: 0.8
}, JI = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, zI = (t, { keyframes: e }) => e.length > 2 ? QI : $t.has(t) ? t.startsWith("scale") ? GI(e[1]) : DI : JI, BI = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function YI(t) {
  for (const e in t)
    if (!BI.has(e))
      return !0;
  return !1;
}
const Di = (t, e, n, i = {}, s, r) => (o) => {
  const a = Vi(i, t) || {}, c = a.delay || i.delay || 0;
  let { elapsed: g = 0 } = i;
  g = g - /* @__PURE__ */ nt(c);
  const l = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -g,
    onUpdate: (u) => {
      e.set(u), a.onUpdate && a.onUpdate(u);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : s
  };
  YI(a) || Object.assign(l, zI(t, l)), l.duration && (l.duration = /* @__PURE__ */ nt(l.duration)), l.repeatDelay && (l.repeatDelay = /* @__PURE__ */ nt(l.repeatDelay)), l.from !== void 0 && (l.keyframes[0] = l.from);
  let I = !1;
  if ((l.type === !1 || l.duration === 0 && !l.repeatDelay) && (ti(l), l.delay === 0 && (I = !0)), (dt.instantAnimations || dt.skipAnimations || s?.shouldSkipAnimations || a.skipAnimations) && (I = !0, ti(l), l.delay = 0), l.allowFlatten = !a.type && !a.ease, I && !r && e.get() !== void 0) {
    const u = ln(l.keyframes, a);
    if (u !== void 0) {
      V.update(() => {
        l.onUpdate(u), l.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ye(l) : new KI(l);
}, ZI = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function WI(t) {
  const e = ZI.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
const HI = 4;
function na(t, e, n = 1) {
  Ct(n <= HI, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, s] = WI(t);
  if (!i)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return Ri(o) ? parseFloat(o) : o;
  }
  return Ti(s) ? na(s, e, n + 1) : s;
}
function js(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Gi(t, e, n, i) {
  if (typeof e == "function") {
    const [s, r] = js(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, r] = js(i);
    e = e(n !== void 0 ? n : t.custom, s, r);
  }
  return e;
}
function Mt(t, e, n) {
  const i = t.getProps();
  return Gi(i, e, n !== void 0 ? n : i.custom, t);
}
const ia = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ..._t
]), ni = (t) => Array.isArray(t);
function qI(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Wt(n));
}
function XI(t) {
  return ni(t) ? t[t.length - 1] || 0 : t;
}
function _I(t, e) {
  const n = Mt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...r } = n || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = XI(r[o]);
    qI(t, o, a);
  }
}
const W = (t) => !!(t && t.getVelocity);
function $I(t) {
  return !!(W(t) && t.add);
}
function ii(t, e) {
  const n = t.getValue("willChange");
  if ($I(n))
    return n.add(e);
  if (!n && dt.WillChange) {
    const i = new dt.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function Qi(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const tu = "framerAppearId", sa = "data-" + Qi(tu);
function oa(t) {
  return t.props[sa];
}
const eu = typeof window < "u";
function nu({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function ra(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: r, transitionEnd: o, ...a } = e;
  const c = t.getDefaultTransition();
  r = r ? ea(r, c) : c;
  const g = r?.reduceMotion, l = r?.skipAnimations;
  i && (r = i);
  const I = [], u = s && t.animationState && t.animationState.getState()[s], C = r?.path;
  C && C.animateVisualElement(t, a, r, n, I);
  for (const A in a) {
    const h = t.getValue(A, t.latestValues[A] ?? null), f = a[A];
    if (f === void 0 || u && nu(u, A))
      continue;
    const d = {
      delay: n,
      ...Vi(r || {}, A)
    };
    l && (d.skipAnimations = !0);
    const p = h.get();
    if (p !== void 0 && !h.isAnimating() && !Array.isArray(f) && f === p && !d.velocity) {
      V.update(() => h.set(f));
      continue;
    }
    let y = !1;
    if (eu && window.MotionHandoffAnimation) {
      const S = oa(t);
      if (S) {
        const m = window.MotionHandoffAnimation(S, A, V);
        m !== null && (d.startTime = m, y = !0);
      }
    }
    ii(t, A);
    const x = g ?? t.shouldReduceMotion;
    h.start(Di(A, h, f, x && ia.has(A) ? { type: !1 } : d, t, y));
    const R = h.animation;
    R && I.push(R);
  }
  if (o) {
    const A = () => V.update(() => {
      o && _I(t, o);
    });
    I.length ? Promise.all(I).then(A) : A();
  }
  return I;
}
function si(t, e, n = {}) {
  const i = Mt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const r = i ? () => Promise.all(ra(t, i, n)) : () => Promise.resolve(), o = t.variantChildren && t.variantChildren.size ? (c = 0) => {
    const { delayChildren: g = 0, staggerChildren: l, staggerDirection: I } = s;
    return iu(t, e, c, g, l, I, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [c, g] = a === "beforeChildren" ? [r, o] : [o, r];
    return c().then(() => g());
  } else
    return Promise.all([r(), o(n.delay)]);
}
function iu(t, e, n = 0, i = 0, s = 0, r = 1, o) {
  const a = [];
  for (const c of t.variantChildren)
    c.notify("AnimationStart", e), a.push(si(c, e, {
      ...o,
      delay: n + (typeof i == "function" ? 0 : i) + ta(t.variantChildren, c, i, s, r)
    }).then(() => c.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function su(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((r) => si(t, r, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = si(t, e, n);
  else {
    const s = typeof e == "function" ? Mt(t, e, n.custom) : e;
    i = Promise.all(ra(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const ou = {
  test: (t) => t === "auto",
  parse: (t) => t
}, ru = (t) => (e) => e.test(t), au = [Xt, b, It, At, mc, pc, ou], Ms = (t) => au.find(ru(t));
function lu(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Ei(t) : !0;
}
const gu = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function cu(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const r = t[i];
    typeof r == "string" && !gu.has(r) && Ec(r) && (s = t[i]), i++;
  }
  if (s && n)
    for (const r of e)
      t[r] !== s && (t[r] = Ki(n, s));
}
class Iu extends Li {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let I = e[l];
      if (typeof I == "string" && (I = I.trim(), Ti(I))) {
        const u = na(I, n.current);
        u !== void 0 && (e[l] = u), l === e.length - 1 && (this.finalKeyframe = I);
      }
    }
    if (this.resolveNoneKeyframes(), !ia.has(i) || e.length !== 2)
      return;
    const [s, r] = e;
    if (typeof s == "number" && typeof r == "number")
      return;
    const o = Ms(s), a = Ms(r), c = ds(s), g = ds(r);
    if (c !== g && Pt[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (Ss(o) && Ss(a))
        for (let l = 0; l < e.length; l++) {
          const I = e[l];
          typeof I == "string" && (e[l] = parseFloat(I));
        }
      else Pt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || lu(e[s])) && i.push(s);
    i.length && cu(e, i, n);
  }
  measure() {
    const { element: e, name: n } = this;
    return Pt[n](window.getComputedStyle(e.current), () => e.measureViewportBox());
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && this.motionValue?.jump(s, !1);
  }
  measureEndState() {
    const { element: e, unresolvedKeyframes: n } = this;
    if (!e || !e.current)
      return;
    this.motionValue?.jump(this.measuredOrigin, !1);
    const i = n.length - 1, s = n[i];
    n[i] = this.measure(), s !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = s), this.removedTransforms?.length && this.removedTransforms.forEach(([r, o]) => {
      e.getValue(r).set(o);
    }), this.resolveNoneKeyframes();
  }
}
const Ji = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Ee(t) {
  return hr(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
function zi(t) {
  return hr(t) && "ownerSVGElement" in t;
}
const oi = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function aa(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const s = n?.[t] ?? i.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t).filter((i) => i != null);
}
const uu = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Cu = _t.length;
function Au(t, e, n) {
  let i = "", s = !0;
  for (let o = 0; o < Cu; o++) {
    const a = _t[o], c = t[a];
    if (c === void 0)
      continue;
    let g = !0;
    if (typeof c == "number")
      g = c === (a.startsWith("scale") ? 1 : 0);
    else {
      const l = parseFloat(c);
      g = a.startsWith("scale") ? l === 1 : l === 0;
    }
    if (!g || n) {
      const l = oi(c, Ze[a]);
      if (!g) {
        s = !1;
        const I = uu[a] || a;
        i += `${I}(${l}) `;
      }
      n && (e[a] = l);
    }
  }
  const r = t.pathRotation;
  return r && (s = !1, i += `rotate(${oi(r, Ze.pathRotation)}) `), i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function Bi(t, e, n) {
  const { style: i, vars: s, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const c in e) {
    const g = e[c];
    if ($t.has(c)) {
      o = !0;
      continue;
    } else if (Or(c)) {
      s[c] = g;
      continue;
    } else {
      const l = oi(g, Ze[c]);
      c.startsWith("origin") ? (a = !0, r[c] = l) : i[c] = l;
    }
  }
  if (e.transform || (o || n ? i.transform = Au(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: c = "50%", originY: g = "50%", originZ: l = 0 } = r;
    i.transformOrigin = `${c} ${g} ${l}`;
  }
}
const hu = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, du = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function fu(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const r = s ? hu : du;
  t[r.offset] = `${-i}`, t[r.array] = `${e} ${n}`;
}
const la = [
  "transform",
  "opacity",
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function ga(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, c, g, l) {
  if (Bi(t, a, g), c) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: I, style: u } = t;
  for (const C of la)
    I[C] !== void 0 && (u[C] = I[C], delete I[C]);
  (u.transform || I.transformOrigin) && (u.transformOrigin = I.transformOrigin ?? "50% 50%", delete I.transformOrigin), u.transform && (u.transformBox = l?.transformBox ?? "fill-box", delete I.transformBox), e !== void 0 && (I.x = e), n !== void 0 && (I.y = n), i !== void 0 && (I.scale = i), s !== void 0 && fu(I, s, r, o, !1);
}
function ca({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function pu({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function mu(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), i = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function xn(t) {
  return t === void 0 || t === 1;
}
function ri({ scale: t, scaleX: e, scaleY: n }) {
  return !xn(t) || !xn(e) || !xn(n);
}
function St(t) {
  return ri(t) || Ia(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function Ia(t) {
  return Fs(t.x) || Fs(t.y);
}
function Fs(t) {
  return t && t !== "0%";
}
function We(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function Us(t, e, n, i, s) {
  return s !== void 0 && (t = We(t, s, i)), We(t, n, i) + e;
}
function ai(t, e = 0, n = 1, i, s) {
  t.min = Us(t.min, e, n, i, s), t.max = Us(t.max, e, n, i, s);
}
function ua(t, { x: e, y: n }) {
  ai(t.x, e.translate, e.scale, e.originPoint), ai(t.y, n.translate, n.scale, n.originPoint);
}
const Ns = 0.999999999999, Ks = 1.0000000000001;
function yu(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let r, o;
  for (let a = 0; a < s; a++) {
    r = n[a], o = r.projectionDelta;
    const { visualElement: c } = r.options;
    c && c.props.style && c.props.style.display === "contents" || (i && r.options.layoutScroll && r.scroll && r !== r.root && (ct(t.x, -r.scroll.offset.x), ct(t.y, -r.scroll.offset.y)), o && (e.x *= o.x.scale, e.y *= o.y.scale, ua(t, o)), i && St(r.latestValues) && Se(t, r.latestValues, r.layout?.layoutBox));
  }
  e.x < Ks && e.x > Ns && (e.x = 1), e.y < Ks && e.y > Ns && (e.y = 1);
}
function ct(t, e) {
  t.min += e, t.max += e;
}
function Ls(t, e, n, i, s = 0.5) {
  const r = K(t.min, t.max, s);
  ai(t, e, n, r, i);
}
function Vs(t, e) {
  return typeof t == "string" ? parseFloat(t) / 100 * (e.max - e.min) : t;
}
function Se(t, e, n) {
  const i = n ?? t;
  Ls(t.x, Vs(e.x, i.x), e.scaleX, e.scale, e.originX), Ls(t.y, Vs(e.y, i.y), e.scaleY, e.scale, e.originY);
}
function Ca(t, e) {
  return ca(mu(t.getBoundingClientRect(), e));
}
function vu(t, e, n) {
  const i = Ca(t, n), { scroll: s } = e;
  return s && (ct(i.x, s.offset.x), ct(i.y, s.offset.y)), i;
}
const { schedule: Yi } = /* @__PURE__ */ kr(queueMicrotask, !1), ot = {
  x: !1,
  y: !1
};
function Aa() {
  return ot.x || ot.y;
}
function xu(t) {
  return t === "x" || t === "y" ? ot[t] ? null : (ot[t] = !0, () => {
    ot[t] = !1;
  }) : ot.x || ot.y ? null : (ot.x = ot.y = !0, () => {
    ot.x = ot.y = !1;
  });
}
function ha(t, e) {
  const n = aa(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function wu(t) {
  return !(t.pointerType === "touch" || Aa());
}
function Ru(t, e, n = {}) {
  const [i, s, r] = ha(t, n);
  return i.forEach((o) => {
    let a = !1, c = !1, g;
    const l = () => {
      o.removeEventListener("pointerleave", A);
    }, I = (f) => {
      g && (g(f), g = void 0), l();
    }, u = (f) => {
      a = !1, window.removeEventListener("pointerup", u), window.removeEventListener("pointercancel", u), c && (c = !1, I(f));
    }, C = () => {
      a = !0, window.addEventListener("pointerup", u, s), window.addEventListener("pointercancel", u, s);
    }, A = (f) => {
      if (f.pointerType !== "touch") {
        if (a) {
          c = !0;
          return;
        }
        I(f);
      }
    }, h = (f) => {
      if (!wu(f))
        return;
      c = !1;
      const d = e(o, f);
      typeof d == "function" && (g = d, o.addEventListener("pointerleave", A, s));
    };
    o.addEventListener("pointerenter", h, s), o.addEventListener("pointerdown", C, s);
  }), r;
}
const da = (t, e) => e ? t === e ? !0 : da(t, e.parentElement) : !1, Zi = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Eu = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Su(t) {
  return Eu.has(t.tagName) || t.isContentEditable === !0;
}
const bu = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function ku(t) {
  return bu.has(t.tagName) || t.isContentEditable === !0;
}
const be = /* @__PURE__ */ new WeakSet();
function Ds(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function wn(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Tu = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = Ds(() => {
    if (be.has(n))
      return;
    wn(n, "down");
    const s = Ds(() => {
      wn(n, "up");
    }), r = () => wn(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function Gs(t) {
  return Zi(t) && !Aa();
}
const Qs = /* @__PURE__ */ new WeakSet();
function Ou(t, e, n = {}) {
  const [i, s, r] = ha(t, n), o = (a) => {
    const c = a.currentTarget;
    if (!Gs(a) || Qs.has(a))
      return;
    be.add(c), n.stopPropagation && Qs.add(a);
    const g = e(c, a), l = { ...s, capture: !0 }, I = (A, h) => {
      window.removeEventListener("pointerup", u, l), window.removeEventListener("pointercancel", C, l), be.has(c) && be.delete(c), Gs(A) && typeof g == "function" && g(A, { success: h });
    }, u = (A) => {
      I(A, c === window || c === document || n.useGlobalTarget || da(c, A.target));
    }, C = (A) => {
      I(A, !1);
    };
    window.addEventListener("pointerup", u, l), window.addEventListener("pointercancel", C, l);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, s), Ee(a) && (a.addEventListener("focus", (g) => Tu(g, s)), !Su(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), r;
}
const ke = /* @__PURE__ */ new WeakMap();
let Te;
const fa = (t, e, n) => (i, s) => s && s[0] ? s[0][t + "Size"] : zi(i) && "getBBox" in i ? i.getBBox()[e] : i[n], Pu = /* @__PURE__ */ fa("inline", "width", "offsetWidth"), ju = /* @__PURE__ */ fa("block", "height", "offsetHeight");
function Mu({ target: t, borderBoxSize: e }) {
  ke.get(t)?.forEach((n) => {
    n(t, {
      get width() {
        return Pu(t, e);
      },
      get height() {
        return ju(t, e);
      }
    });
  });
}
function Fu(t) {
  t.forEach(Mu);
}
function Uu() {
  typeof ResizeObserver > "u" || (Te = new ResizeObserver(Fu));
}
function Nu(t, e) {
  Te || Uu();
  const n = aa(t);
  return n.forEach((i) => {
    let s = ke.get(i);
    s || (s = /* @__PURE__ */ new Set(), ke.set(i, s)), s.add(e), Te?.observe(i);
  }), () => {
    n.forEach((i) => {
      const s = ke.get(i);
      s?.delete(e), s?.size || Te?.unobserve(i);
    });
  };
}
const Oe = /* @__PURE__ */ new Set();
let Jt;
function Ku() {
  Jt = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Oe.forEach((e) => e(t));
  }, window.addEventListener("resize", Jt);
}
function Lu(t) {
  return Oe.add(t), Jt || Ku(), () => {
    Oe.delete(t), !Oe.size && typeof Jt == "function" && (window.removeEventListener("resize", Jt), Jt = void 0);
  };
}
function Js(t, e) {
  return typeof t == "function" ? Lu(t) : Nu(t, e);
}
function Vu(t) {
  return zi(t) && t.tagName === "svg";
}
const zs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), zt = () => ({
  x: zs(),
  y: zs()
}), Bs = () => ({ min: 0, max: 0 }), J = () => ({
  x: Bs(),
  y: Bs()
}), Du = /* @__PURE__ */ new WeakMap();
function gn(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function ce(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Wi = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], He = ["initial", ...Wi];
function cn(t) {
  if (gn(t.animate))
    return !0;
  for (let e = 0; e < He.length; e++)
    if (ce(t[He[e]]))
      return !0;
  return !1;
}
function pa(t) {
  return !!(cn(t) || t.variants);
}
function Gu(t, e, n) {
  for (const i in e) {
    const s = e[i], r = n[i];
    if (W(s))
      t.addValue(i, s);
    else if (W(r))
      t.addValue(i, Wt(s, { owner: t }));
    else if (r !== s)
      if (t.hasValue(i)) {
        const o = t.getValue(i);
        o.liveStyle === !0 ? o.jump(s) : o.hasAnimated || o.set(s);
      } else {
        const o = t.getStaticValue(i);
        t.addValue(i, Wt(o !== void 0 ? o : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const li = { current: null }, ma = { current: !1 }, Qu = typeof window < "u";
function Ju() {
  if (ma.current = !0, !!Qu)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => li.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      li.current = !1;
}
const Ys = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let qe = {};
function ya(t) {
  qe = t;
}
function zu() {
  return qe;
}
class Bu {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, skipAnimations: r, blockInitialAnimation: o, visualState: a }, c = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Li, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const C = q.now();
      this.renderScheduledAt < C && (this.renderScheduledAt = C, V.render(this.render, !1, !0));
    };
    const { latestValues: g, renderState: l } = a;
    this.latestValues = g, this.baseTarget = { ...g }, this.initialValues = n.initial ? { ...g } : {}, this.renderState = l, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.skipAnimationsConfig = r, this.options = c, this.blockInitialAnimation = !!o, this.isControllingVariants = cn(n), this.isVariantNode = pa(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: I, ...u } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const C in u) {
      const A = u[C];
      g[C] !== void 0 && W(A) && A.set(g[C]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const n in this.initialValues)
        this.values.get(n)?.jump(this.initialValues[n]), this.latestValues[n] = this.initialValues[n];
    this.current = e, Du.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ma.current || Ju(), this.shouldReduceMotion = li.current), process.env.NODE_ENV !== "production" && Si(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), yt(this.notifyUpdate), yt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && ei.has(e) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: c, ease: g, duration: l } = n.accelerate, I = new _r({
        element: this.current,
        name: e,
        keyframes: a,
        times: c,
        ease: g,
        duration: /* @__PURE__ */ nt(l)
      }), u = o(I);
      this.valueSubscriptions.set(e, () => {
        u(), I.cancel();
      });
      return;
    }
    const i = $t.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && V.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), r && r();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in qe) {
      const n = qe[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : J();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < Ys.length; i++) {
      const s = Ys[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const r = "on" + s, o = e[r];
      o && (this.propEventSubscriptions[s] = this.on(s, o));
    }
    this.prevMotionValues = Gu(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const i = this.values.get(e);
    n !== i && (i && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let i = this.values.get(e);
    return i === void 0 && n !== void 0 && (i = Wt(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (Ri(i) || Ei(i)) ? i = parseFloat(i) : (
      /**
       * If the value as read isn't animatable (e.g. "none") but
       * the target is, derive an animatable none from the target.
       * A value is animatable if it's a number or contains a
       * number or color, which is cheaper to check than trying
       * every value type in turn.
       */
      typeof i != "number" && !it.test(i) && it.test(n) && (i = Ki(e, n))
    ), this.setBaseTarget(e, W(i) ? i.get() : i)), W(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const r = Gi(this.props, n, this.presenceContext?.custom);
      r && (i = r[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !W(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Qe()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    Yi.render(this.render);
  }
}
class va extends Bu {
  constructor() {
    super(...arguments), this.KeyframeResolver = Iu;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const i = e.style;
    return i ? i[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    delete n[e], delete i[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    W(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class xt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function xa(t, { style: e, vars: n }, i, s) {
  const r = t.style;
  let o;
  for (o in e)
    r[o] = e[o];
  s?.applyProjectionStyles(r, i);
  for (o in n)
    r.setProperty(o, n[o]);
}
function Zs(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const te = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (b.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Zs(t, e.target.x), i = Zs(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, Yu = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = it.parse(t);
    if (s.length > 5)
      return i;
    const r = it.createTransformer(t), o = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, c = n.y.scale * e.y;
    s[0 + o] /= a, s[1 + o] /= c;
    const g = K(a, c, 0.5);
    return typeof s[2 + o] == "number" && (s[2 + o] /= g), typeof s[3 + o] == "number" && (s[3 + o] /= g), r(s);
  }
}, gi = {
  borderRadius: {
    ...te,
    applyTo: [...Ji]
  },
  borderTopLeftRadius: te,
  borderTopRightRadius: te,
  borderBottomLeftRadius: te,
  borderBottomRightRadius: te,
  boxShadow: Yu
};
function wa(t, { layout: e, layoutId: n }) {
  return $t.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!gi[t] || t === "opacity");
}
function Hi(t, e, n) {
  const i = t.style, s = e?.style, r = {};
  if (!i)
    return r;
  for (const o in i)
    (W(i[o]) || s && W(s[o]) || wa(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (r[o] = i[o]);
  return r;
}
function Zu(t) {
  return window.getComputedStyle(t);
}
class Wu extends va {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = xa;
  }
  mount(e) {
    Ct(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
  }
  readValueFromInstance(e, n) {
    if ($t.has(n))
      return this.projection?.isProjecting ? Hn(n) : AI(e, n);
    {
      const i = Zu(e), s = (Or(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Ca(e, n);
  }
  build(e, n, i) {
    Bi(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Hi(e, n, i);
  }
}
const Ra = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), Ea = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Hu(t, e, n, i) {
  xa(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(Ra.has(s) ? s : Qi(s), e.attrs[s]);
}
function Sa(t, e, n) {
  const i = Hi(t, e, n);
  for (const s in t)
    if (W(t[s]) || W(e[s])) {
      const r = _t.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[r] = t[s];
    }
  return i;
}
class qu extends va {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = J;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if ($t.has(n)) {
      const i = zr(n);
      return i && i.default || 0;
    }
    if (la.includes(n)) {
      const s = getComputedStyle(e)[n];
      if (typeof s == "string" && s)
        return s.trim();
    }
    return n = Ra.has(n) ? n : Qi(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Sa(e, n, i);
  }
  build(e, n, i) {
    ga(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    Hu(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = Ea(e.tagName), super.mount(e);
  }
}
const Xu = He.length;
function ba(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? ba(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < Xu; n++) {
    const i = He[n], s = t.props[i];
    (ce(s) || s === !1) && (e[i] = s);
  }
  return e;
}
function ka(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
const _u = [...Wi].reverse(), $u = Wi.length;
function tC(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => su(t, n, i)));
}
function eC(t) {
  let e = tC(t), n = Ws(), i = !0, s = !1;
  const r = (g) => (l, I) => {
    const u = Mt(t, I, g === "exit" ? t.presenceContext?.custom : void 0);
    if (u) {
      const { transition: C, transitionEnd: A, ...h } = u;
      l = { ...l, ...h, ...A };
    }
    return l;
  };
  function o(g) {
    e = g(t);
  }
  function a(g) {
    const { props: l } = t, I = ba(t.parent) || {}, u = [], C = /* @__PURE__ */ new Set();
    let A = {}, h = 1 / 0;
    for (let d = 0; d < $u; d++) {
      const p = _u[d], y = n[p], x = l[p] !== void 0 ? l[p] : I[p], R = ce(x), S = p === g ? y.isActive : null;
      S === !1 && (h = d);
      let m = x === I[p] && x !== l[p] && R;
      if (m && (i || s) && t.manuallyAnimateOnMount && (m = !1), y.protectedKeys = { ...A }, // If it isn't active and hasn't *just* been set as inactive
      !y.isActive && S === null || // If we didn't and don't have any defined prop for this animation type
      !x && !y.prevProp || // Or if the prop doesn't define an animation
      gn(x) || typeof x == "boolean")
        continue;
      if (p === "exit" && y.isActive && S !== !0) {
        y.prevResolvedValues && (A = {
          ...A,
          ...y.prevResolvedValues
        });
        continue;
      }
      const w = nC(y.prevProp, x);
      let P = w || // If we're making this variant active, we want to always make it active
      p === g && y.isActive && !m && R || // If we removed a higher-priority variant (i is in reverse order)
      d > h && R, T = !1;
      const N = Array.isArray(x) ? x : [x];
      let Q = N.reduce(r(p), {});
      S === !1 && (Q = {});
      const { prevResolvedValues: Y = {} } = y, M = {
        ...Y,
        ...Q
      }, E = (O) => {
        P = !0, C.has(O) && (T = !0, C.delete(O)), y.needsAnimating[O] = !0;
        const U = t.getValue(O);
        U && (U.liveStyle = !1);
      };
      for (const O in M) {
        const U = Q[O], H = Y[O];
        if (A.hasOwnProperty(O))
          continue;
        let Lt = !1;
        ni(U) && ni(H) ? Lt = !ka(U, H) || w : Lt = U !== H, Lt ? U != null ? E(O) : C.add(O) : U !== void 0 && C.has(O) ? E(O) : y.protectedKeys[O] = !0;
      }
      y.prevProp = x, y.prevResolvedValues = Q, y.isActive && (A = { ...A, ...Q }), (i || s) && t.blockInitialAnimation && (P = !1);
      const j = m && w;
      P && (!j || T) && u.push(...N.map((O) => {
        const U = { type: p };
        if (typeof O == "string" && (i || s) && !j && t.manuallyAnimateOnMount && t.parent) {
          const { parent: H } = t, Lt = Mt(H, O);
          if (H.enteringChildren && Lt) {
            const { delayChildren: qa } = Lt.transition || {};
            U.delay = ta(H.enteringChildren, t, qa);
          }
        }
        return {
          animation: O,
          options: U
        };
      }));
    }
    if (C.size) {
      const d = {};
      if (typeof l.initial != "boolean") {
        const p = Mt(t, Array.isArray(l.initial) ? l.initial[0] : l.initial);
        p && p.transition && (d.transition = p.transition);
      }
      C.forEach((p) => {
        const y = t.getBaseTarget(p), x = t.getValue(p);
        x && (x.liveStyle = !0), d[p] = y ?? null;
      }), u.push({ animation: d });
    }
    let f = !!u.length;
    return i && (l.initial === !1 || l.initial === l.animate) && !t.manuallyAnimateOnMount && (f = !1), i = !1, s = !1, f ? e(u) : Promise.resolve();
  }
  function c(g, l) {
    if (n[g].isActive === l)
      return Promise.resolve();
    t.variantChildren?.forEach((u) => u.animationState?.setActive(g, l)), n[g].isActive = l;
    const I = a(g);
    for (const u in n)
      n[u].protectedKeys = {};
    return I;
  }
  return {
    animateChanges: a,
    setActive: c,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = Ws(), s = !0;
    }
  };
}
function nC(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !ka(e, t) : !1;
}
function Rt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ws() {
  return {
    animate: Rt(!0),
    whileInView: Rt(),
    whileHover: Rt(),
    whileTap: Rt(),
    whileDrag: Rt(),
    whileFocus: Rt(),
    exit: Rt()
  };
}
function ci(t, e) {
  t.min = e.min, t.max = e.max;
}
function st(t, e) {
  ci(t.x, e.x), ci(t.y, e.y);
}
function Hs(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
const Ta = 1e-4, iC = 1 - Ta, sC = 1 + Ta, Oa = 0.01, oC = 0 - Oa, rC = 0 + Oa;
function $(t) {
  return t.max - t.min;
}
function aC(t, e, n) {
  return Math.abs(t - e) <= n;
}
function qs(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = K(e.min, e.max, t.origin), t.scale = $(n) / $(e), t.translate = K(n.min, n.max, t.origin) - t.originPoint, (t.scale >= iC && t.scale <= sC || isNaN(t.scale)) && (t.scale = 1), (t.translate >= oC && t.translate <= rC || isNaN(t.translate)) && (t.translate = 0);
}
function ne(t, e, n, i) {
  qs(t.x, e.x, n.x, i ? i.originX : void 0), qs(t.y, e.y, n.y, i ? i.originY : void 0);
}
function Xs(t, e, n, i = 0) {
  const s = i ? K(n.min, n.max, i) : n.min;
  t.min = s + e.min, t.max = t.min + $(e);
}
function lC(t, e, n, i) {
  Xs(t.x, e.x, n.x, i?.x), Xs(t.y, e.y, n.y, i?.y);
}
function _s(t, e, n, i = 0) {
  const s = i ? K(n.min, n.max, i) : n.min;
  t.min = e.min - s, t.max = t.min + $(e);
}
function Xe(t, e, n, i) {
  _s(t.x, e.x, n.x, i?.x), _s(t.y, e.y, n.y, i?.y);
}
function $s(t, e, n, i, s) {
  return t -= e, t = We(t, 1 / n, i), s !== void 0 && (t = We(t, 1 / s, i)), t;
}
function gC(t, e = 0, n = 1, i = 0.5, s, r = t, o = t) {
  if (It.test(e) && (e = parseFloat(e), e = K(o.min, o.max, e / 100) - o.min), typeof e != "number")
    return;
  let a = K(r.min, r.max, i);
  t === r && (a -= e), t.min = $s(t.min, e, n, a, s), t.max = $s(t.max, e, n, a, s);
}
function to(t, e, [n, i, s], r, o) {
  gC(t, e[n], e[i], e[s], e.scale, r, o);
}
const cC = ["x", "scaleX", "originX"], IC = ["y", "scaleY", "originY"];
function eo(t, e, n, i) {
  to(t.x, e, cC, n ? n.x : void 0, i ? i.x : void 0), to(t.y, e, IC, n ? n.y : void 0, i ? i.y : void 0);
}
function no(t) {
  return t.translate === 0 && t.scale === 1;
}
function Pa(t) {
  return no(t.x) && no(t.y);
}
function io(t, e) {
  return t.min === e.min && t.max === e.max;
}
function uC(t, e) {
  return io(t.x, e.x) && io(t.y, e.y);
}
function so(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function ja(t, e) {
  return so(t.x, e.x) && so(t.y, e.y);
}
function oo(t) {
  return $(t.x) / $(t.y);
}
function ro(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
function gt(t) {
  return [t("x"), t("y")];
}
function CC(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, r = t.y.translate / e.y, o = n?.z || 0;
  if ((s || r || o) && (i = `translate3d(${s}px, ${r}px, ${o}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: g, rotate: l, pathRotation: I, rotateX: u, rotateY: C, skewX: A, skewY: h } = n;
    g && (i = `perspective(${g}px) ${i}`), l && (i += `rotate(${l}deg) `), I && (i += `rotate(${I}deg) `), u && (i += `rotateX(${u}deg) `), C && (i += `rotateY(${C}deg) `), A && (i += `skewX(${A}deg) `), h && (i += `skewY(${h}deg) `);
  }
  const a = t.x.scale * e.x, c = t.y.scale * e.y;
  return (a !== 1 || c !== 1) && (i += `scale(${a}, ${c})`), i || "none";
}
const AC = Ji.length, ao = (t) => typeof t == "string" ? parseFloat(t) : t, lo = (t) => typeof t == "number" || b.test(t);
function hC(t, e, n, i, s, r) {
  s ? (t.opacity = K(0, n.opacity ?? 1, dC(i)), t.opacityExit = K(e.opacity ?? 1, 0, fC(i))) : r && (t.opacity = K(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let o = 0; o < AC; o++) {
    const a = Ji[o];
    let c = go(e, a), g = go(n, a);
    if (c === void 0 && g === void 0)
      continue;
    c || (c = 0), g || (g = 0), c === 0 || g === 0 || lo(c) === lo(g) ? (t[a] = Math.max(K(ao(c), ao(g), i), 0), (It.test(g) || It.test(c)) && (t[a] += "%")) : t[a] = g;
  }
  (e.rotate || n.rotate) && (t.rotate = K(e.rotate || 0, n.rotate || 0, i));
}
function go(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const dC = /* @__PURE__ */ Ma(0, 0.5, Rr), fC = /* @__PURE__ */ Ma(0.5, 0.95, at);
function Ma(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ ae(t, e, i));
}
function pC(t, e, n) {
  const i = W(t) ? t : Wt(t);
  return i.start(Di("", i, e, n)), i.animation;
}
function Ie(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
const mC = (t, e) => t.depth - e.depth;
class yC {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    wi(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    Ge(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(mC), this.isDirty = !1, this.children.forEach(e);
  }
}
function vC(t, e) {
  const n = q.now(), i = ({ timestamp: s }) => {
    const r = s - n;
    r >= e && (yt(i), t(r - e));
  };
  return V.setup(i, !0), () => yt(i);
}
function Pe(t) {
  return W(t) ? t.get() : t;
}
class xC {
  constructor() {
    this.members = [];
  }
  add(e) {
    wi(this.members, e);
    for (let n = this.members.length - 1; n >= 0; n--) {
      const i = this.members[n];
      if (i === e || i === this.lead || i === this.prevLead)
        continue;
      const s = i.instance;
      (!s || s.isConnected === !1) && !i.snapshot && (Ge(this.members, i), i.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (Ge(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    for (let n = this.members.indexOf(e) - 1; n >= 0; n--) {
      const i = this.members[n];
      if (i.isPresent !== !1 && i.instance?.isConnected !== !1)
        return this.promote(i), !0;
    }
    return !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && (this.prevLead = i, this.lead = e, e.show(), i)) {
      i.updateSnapshot(), e.scheduleRender();
      const { layoutDependency: s } = i.options, { layoutDependency: r } = e.options;
      (s === void 0 || s !== r) && (e.resumeFrom = i, n && (i.preserveOpacity = !0), i.snapshot && (e.snapshot = i.snapshot, e.snapshot.latestValues = i.animationValues || i.latestValues), e.root?.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      e.options.onExitComplete?.(), e.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => e.instance && e.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const je = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Rn = ["", "X", "Y", "Z"], wC = 1e3;
let RC = 0;
function En(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Fa(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = oa(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", V, !(s || r));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Fa(i);
}
function Ua({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(o = {}, a = e?.()) {
      this.id = RC++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(bC), this.nodes.forEach(MC), this.nodes.forEach(FC), this.nodes.forEach(kC);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let c = 0; c < this.path.length; c++)
        this.path[c].shouldResetTransform = !0;
      this.root === this && (this.nodes = new yC());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Qe()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const c = this.eventHandlers.get(o);
      c && c.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o) {
      if (this.instance)
        return;
      this.isSVG = zi(o) && !Vu(o), this.instance = o;
      const { layoutId: a, layout: c, visualElement: g } = this.options;
      if (g && !g.current && g.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (c || a) && (this.isLayoutDirty = !0), t) {
        let l, I = 0;
        const u = () => this.root.updateBlockedByResize = !1;
        V.read(() => {
          I = window.innerWidth;
        }), t(o, () => {
          const C = window.innerWidth;
          C !== I && (I = C, this.root.updateBlockedByResize = !0, l && l(), l = vC(u, 250), je.hasAnimatedSinceResize && (je.hasAnimatedSinceResize = !1, this.nodes.forEach(uo)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && g && (a || c) && this.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: I, hasRelativeLayoutChanged: u, layout: C }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const A = this.options.transition || g.getDefaultTransition() || VC, { onLayoutAnimationStart: h, onLayoutAnimationComplete: f } = g.getProps(), d = !this.targetLayout || !ja(this.targetLayout, C), p = !I && u;
        if (this.options.layoutRoot || this.resumeFrom || p || I && (d || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const y = {
            ...Vi(A, "layout"),
            onPlay: h,
            onComplete: f
          };
          (g.shouldReduceMotion || this.options.layoutRoot) && (y.delay = 0, y.type = !1), this.startAnimation(y), this.setAnimationOrigin(l, p, y.path);
        } else
          I || uo(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = C;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), yt(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(UC), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Fa(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let l = 0; l < this.path.length; l++) {
        const I = this.path[l];
        I.shouldResetTransform = !0, (typeof I.latestValues.x == "string" || typeof I.latestValues.y == "string") && (I.isLayoutDirty = !0), I.updateScroll("snapshot"), I.options.layoutRoot && I.willUpdate(!1);
      }
      const { layoutId: a, layout: c } = this.options;
      if (a === void 0 && !c)
        return;
      const g = this.getTransformTemplate();
      this.prevTransformTemplateValue = g ? g(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const c = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), c && this.nodes.forEach(OC), this.nodes.forEach(co);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Io);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(PC), this.nodes.forEach(jC), this.nodes.forEach(EC), this.nodes.forEach(SC)) : this.nodes.forEach(Io), this.clearAllSnapshots();
      const a = q.now();
      z.delta = lt(0, 1e3 / 60, a - z.timestamp), z.timestamp = a, z.isProcessing = !0, dn.update.process(z), dn.preRender.process(z), dn.render.process(z), z.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Yi.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(TC), this.sharedNodes.forEach(NC);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, V.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      V.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !$(this.snapshot.measuredBox.x) && !$(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let c = 0; c < this.path.length; c++)
          this.path[c].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = J()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
        const c = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: c,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : c
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Pa(this.projectionDelta), c = this.getTransformTemplate(), g = c ? c(this.latestValues, "") : void 0, l = g !== this.prevTransformTemplateValue;
      o && this.instance && (a || St(this.latestValues) || l) && (s(this.instance, g), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let c = this.removeElementScroll(a);
      return o && (c = this.removeTransform(c)), DC(c), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: c,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o)
        return J();
      const a = o.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(GC))) {
        const { scroll: g } = this.root;
        g && (ct(a.x, g.offset.x), ct(a.y, g.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      const a = J();
      if (st(a, o), this.scroll?.wasRoot)
        return a;
      for (let c = 0; c < this.path.length; c++) {
        const g = this.path[c], { scroll: l, options: I } = g;
        g !== this.root && l && I.layoutScroll && (l.wasRoot && st(a, o), ct(a.x, l.offset.x), ct(a.y, l.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1, c) {
      const g = c || J();
      st(g, o);
      for (let l = 0; l < this.path.length; l++) {
        const I = this.path[l];
        !a && I.options.layoutScroll && I.scroll && I !== I.root && (ct(g.x, -I.scroll.offset.x), ct(g.y, -I.scroll.offset.y)), St(I.latestValues) && Se(g, I.latestValues, I.layout?.layoutBox);
      }
      return St(this.latestValues) && Se(g, this.latestValues, this.layout?.layoutBox), g;
    }
    removeTransform(o) {
      const a = J();
      st(a, o);
      for (let c = 0; c < this.path.length; c++) {
        const g = this.path[c];
        if (!St(g.latestValues))
          continue;
        let l;
        g.instance && (ri(g.latestValues) && g.updateSnapshot(), l = J(), st(l, g.measurePageBox())), eo(a, g.latestValues, g.snapshot?.layoutBox, l);
      }
      return St(this.latestValues) && eo(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== z.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const c = !!this.resumingFrom || this !== a;
      if (!(o || c && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: l, layoutId: I } = this.options;
      if (!this.layout || !(l || I))
        return;
      this.resolvedRelativeTargetAt = z.timestamp;
      const u = this.getClosestProjectingParent();
      u && this.linkedParentVersion !== u.layoutVersion && !u.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && u && u.layout ? this.createRelativeTarget(u, this.layout.layoutBox, u.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = J(), this.targetWithTransforms = J()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), lC(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : st(this.target, this.layout.layoutBox), ua(this.target, this.targetDelta)) : st(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && u && !!u.resumingFrom == !!this.resumingFrom && !u.options.layoutScroll && u.target && this.animationProgress !== 1 ? this.createRelativeTarget(u, this.target, u.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || ri(this.parent.latestValues) || Ia(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(o, a, c) {
      this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = J(), this.relativeTargetOrigin = J(), Xe(this.relativeTargetOrigin, a, c, this.options.layoutAnchor || void 0), st(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let c = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (c = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1), this.resolvedRelativeTargetAt === z.timestamp && (c = !1), c)
        return;
      const { layout: g, layoutId: l } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(g || l))
        return;
      st(this.layoutCorrected, this.layout.layoutBox);
      const I = this.treeScale.x, u = this.treeScale.y;
      yu(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = J());
      const { target: C } = o;
      if (!C) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Hs(this.prevProjectionDelta.x, this.projectionDelta.x), Hs(this.prevProjectionDelta.y, this.projectionDelta.y)), ne(this.projectionDelta, this.layoutCorrected, C, this.latestValues), (this.treeScale.x !== I || this.treeScale.y !== u || !ro(this.projectionDelta.x, this.prevProjectionDelta.x) || !ro(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", C));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      if (this.options.visualElement?.scheduleRender(), o) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = zt(), this.projectionDelta = zt(), this.projectionDeltaWithTransform = zt();
    }
    setAnimationOrigin(o, a = !1, c) {
      const g = this.snapshot, l = g ? g.latestValues : {}, I = { ...this.latestValues }, u = zt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const C = J(), A = g ? g.source : void 0, h = this.layout ? this.layout.source : void 0, f = A !== h, d = this.getStack(), p = !d || d.members.length <= 1, y = !!(f && !p && this.options.crossfade === !0 && !this.path.some(LC));
      this.animationProgress = 0;
      let x;
      const R = c?.interpolateProjection(o);
      this.mixTargetDelta = (S) => {
        const m = S / 1e3, w = R?.(m);
        w ? (u.x.translate = w.x, u.x.scale = K(o.x.scale, 1, m), u.x.origin = o.x.origin, u.x.originPoint = o.x.originPoint, u.y.translate = w.y, u.y.scale = K(o.y.scale, 1, m), u.y.origin = o.y.origin, u.y.originPoint = o.y.originPoint) : (Co(u.x, o.x, m), Co(u.y, o.y, m)), this.setTargetDelta(u), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Xe(C, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), KC(this.relativeTarget, this.relativeTargetOrigin, C, m), x && uC(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = J()), st(x, this.relativeTarget)), f && (this.animationValues = I, hC(I, l, this.latestValues, m, y, p)), w && w.rotate !== void 0 && (this.animationValues || (this.animationValues = I), this.animationValues.pathRotation = w.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = m;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (yt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = V.update(() => {
        je.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Wt(0)), this.motionValue.jump(0, !1), this.currentAnimation = pC(this.motionValue, [0, 1e3], {
          ...o,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), iI(this.currentAnimation, this), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(wC), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead(), { targetWithTransforms: a, layout: c, latestValues: g } = o;
      let { target: l } = o;
      if (!(!a || !l || !c)) {
        if (this !== o && this.layout && c && Na(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          l = this.target || J();
          const I = $(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + I;
          const u = $(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + u;
        }
        st(a, l), Se(a, g), ne(this.projectionDeltaWithTransform, this.layoutCorrected, a, g);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new xC()), this.sharedNodes.get(o).add(a);
      const g = a.options.initialPromotionConfig;
      a.promote({
        transition: g ? g.transition : void 0,
        preserveFollowOpacity: g && g.shouldPreserveFollowOpacity ? g.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: c } = {}) {
      const g = this.getStack();
      g && g.promote(this, c), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: c } = o;
      if ((c.z || c.rotate || c.rotateX || c.rotateY || c.rotateZ || c.skewX || c.skewY) && (a = !0), !a)
        return;
      const g = {};
      c.z && En("z", o, g, this.animationValues);
      for (let l = 0; l < Rn.length; l++)
        En(`rotate${Rn[l]}`, o, g, this.animationValues), En(`skew${Rn[l]}`, o, g, this.animationValues);
      o.render();
      for (const l in g)
        o.setStaticValue(l, g[l]), this.animationValues && (this.animationValues[l] = g[l]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const c = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = Pe(a?.pointerEvents) || "", o.transform = c ? c(this.latestValues, "") : "none";
        return;
      }
      const g = this.getLead();
      if (!this.projectionDelta || !this.layout || !g.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = Pe(a?.pointerEvents) || ""), this.hasProjected && !St(this.latestValues) && (o.transform = c ? c({}, "") : "none", this.hasProjected = !1);
        return;
      }
      o.visibility = "";
      const l = g.animationValues || g.latestValues;
      this.applyTransformsToTarget();
      let I = CC(this.projectionDeltaWithTransform, this.treeScale, l);
      c && (I = c(l, I)), o.transform = I;
      const { x: u, y: C } = this.projectionDelta;
      o.transformOrigin = `${u.origin * 100}% ${C.origin * 100}% 0`, g.animationValues ? o.opacity = g === this ? l.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : l.opacityExit : o.opacity = g === this ? l.opacity !== void 0 ? l.opacity : "" : l.opacityExit !== void 0 ? l.opacityExit : 0;
      for (const A in gi) {
        if (l[A] === void 0)
          continue;
        const { correct: h, applyTo: f, isCSSVariable: d } = gi[A], p = I === "none" ? l[A] : h(l[A], g);
        if (f) {
          const y = f.length;
          for (let x = 0; x < y; x++)
            o[f[x]] = p;
        } else
          d ? this.options.visualElement.renderState.vars[A] = p : o[A] = p;
      }
      this.options.layoutId && (o.pointerEvents = g === this ? Pe(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => o.currentAnimation?.stop()), this.root.nodes.forEach(co), this.root.sharedNodes.clear();
    }
  };
}
function EC(t) {
  t.updateLayout();
}
function SC(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, r = e.source !== t.layout.source;
    if (s === "size")
      gt((l) => {
        const I = r ? e.measuredBox[l] : e.layoutBox[l], u = $(I);
        I.min = n[l].min, I.max = I.min + u;
      });
    else if (s === "x" || s === "y") {
      const l = s === "x" ? "y" : "x";
      ci(r ? e.measuredBox[l] : e.layoutBox[l], n[l]);
    } else Na(s, e.layoutBox, n) && gt((l) => {
      const I = r ? e.measuredBox[l] : e.layoutBox[l], u = $(n[l]);
      I.max = I.min + u, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[l].max = t.relativeTarget[l].min + u);
    });
    const o = zt();
    ne(o, n, e.layoutBox);
    const a = zt();
    r ? ne(a, t.applyTransform(i, !0), e.measuredBox) : ne(a, n, e.layoutBox);
    const c = !Pa(o);
    let g = !1;
    if (!t.resumeFrom) {
      const l = t.getClosestProjectingParent();
      if (l && !l.resumeFrom) {
        const { snapshot: I, layout: u } = l;
        if (I && u) {
          const C = t.options.layoutAnchor || void 0, A = J();
          Xe(A, e.layoutBox, I.layoutBox, C);
          const h = J();
          Xe(h, n, u.layoutBox, C), ja(A, h) || (g = !0), l.options.layoutRoot && (t.relativeTarget = h, t.relativeTargetOrigin = A, t.relativeParent = l);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: o,
      hasLayoutChanged: c,
      hasRelativeLayoutChanged: g
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function bC(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function kC(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function TC(t) {
  t.clearSnapshot();
}
function co(t) {
  t.clearMeasurements();
}
function OC(t) {
  t.isLayoutDirty = !0, t.updateLayout();
}
function Io(t) {
  t.isLayoutDirty = !1;
}
function PC(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = !0);
}
function jC(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function uo(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function MC(t) {
  t.resolveTargetDelta();
}
function FC(t) {
  t.calcProjection();
}
function UC(t) {
  t.resetSkewAndRotation();
}
function NC(t) {
  t.removeLeadSnapshot();
}
function Co(t, e, n) {
  t.translate = K(e.translate, 0, n), t.scale = K(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Ao(t, e, n, i) {
  t.min = K(e.min, n.min, i), t.max = K(e.max, n.max, i);
}
function KC(t, e, n, i) {
  Ao(t.x, e.x, n.x, i), Ao(t.y, e.y, n.y, i);
}
function LC(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const VC = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ho = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), fo = ho("applewebkit/") && !ho("chrome/") ? Math.round : at;
function po(t) {
  t.min = fo(t.min), t.max = fo(t.max);
}
function DC(t) {
  po(t.x), po(t.y);
}
function Na(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !aC(oo(e), oo(n), 0.2);
}
function GC(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const QC = Ua({
  attachResizeListener: (t, e) => Ie(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Sn = {
  current: void 0
}, Ka = Ua({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Sn.current) {
      const t = new QC({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Sn.current = t;
    }
    return Sn.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), qi = Kt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function mo(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function JC(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const r = mo(s, e);
      return !n && typeof r == "function" && (n = !0), r;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const r = i[s];
          typeof r == "function" ? r() : mo(t[s], null);
        }
      };
  };
}
function zC(...t) {
  return k.useCallback(JC(...t), t);
}
class BC extends k.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (Ee(n) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = n.offsetParent, s = Ee(i) && i.offsetWidth || 0, r = Ee(i) && i.offsetHeight || 0, o = getComputedStyle(n), a = this.props.sizeRef.current;
      a.height = parseFloat(o.height), a.width = parseFloat(o.width), a.top = n.offsetTop, a.left = n.offsetLeft, a.right = s - a.width - a.left, a.bottom = r - a.height - a.top, a.direction = o.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function YC({ children: t, isPresent: e, anchorX: n, anchorY: i, root: s, pop: r }) {
  const o = Ai(), a = D(null), c = D({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: g } = Z(qi), l = r !== !1 ? t.props?.ref ?? t?.ref : void 0, I = zC(a, l);
  return hi(() => {
    const { width: u, height: C, top: A, left: h, right: f, bottom: d, direction: p } = c.current;
    if (e || r === !1 || !a.current || !u || !C)
      return;
    const y = p === "rtl", x = n === "left" ? y ? `right: ${f}` : `left: ${h}` : y ? `left: ${h}` : `right: ${f}`, R = i === "bottom" ? `bottom: ${d}` : `top: ${A}`;
    a.current.dataset.motionPopId = o;
    const S = document.createElement("style");
    g && (S.nonce = g);
    const m = s ?? document.head;
    return m.appendChild(S), S.sheet && S.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${C}px !important;
            ${x}px !important;
            ${R}px !important;
          }
        `), () => {
      a.current?.removeAttribute("data-motion-pop-id"), m.contains(S) && m.removeChild(S);
    };
  }, [e]), v(BC, { isPresent: e, childRef: a, sizeRef: c, pop: r, children: r === !1 ? t : k.cloneElement(t, { ref: I }) });
}
const ZC = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: r, mode: o, anchorX: a, anchorY: c, root: g }) => {
  const l = xi(WC), I = Ai(), u = D(n), C = D(i);
  De(() => {
    u.current = n, C.current = i;
  });
  let A = !0, h = Ft(() => (A = !1, {
    id: I,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (f) => {
      l.set(f, !0);
      for (const d of l.values())
        if (!d)
          return;
      i && i();
    },
    register: (f) => (l.set(f, !1), () => {
      l.delete(f), !u.current && !l.size && C.current?.();
    })
  }), [n, l, i]);
  return r && A && (h = { ...h }), Ft(() => {
    l.forEach((f, d) => l.set(d, !1));
  }, [n]), k.useEffect(() => {
    !n && !l.size && i && i();
  }, [n]), t = v(YC, { pop: o === "popLayout", isPresent: n, anchorX: a, anchorY: c, root: g, children: t }), v(an.Provider, { value: h, children: t });
};
function WC() {
  return /* @__PURE__ */ new Map();
}
function La(t = !0) {
  const e = Z(an);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, r = Ai();
  X(() => {
    if (t)
      return s(r);
  }, [t]);
  const o = No(() => t && i && i(r), [r, i, t]);
  return !n && i ? [!1, o] : [!0];
}
const ye = (t) => t.key || "";
function yo(t) {
  const e = [];
  return Xa.forEach(t, (n) => {
    _a(n) && e.push(n);
  }), e;
}
const vo = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: r = "sync", propagate: o = !1, anchorX: a = "left", anchorY: c = "top", root: g }) => {
  const [l, I] = La(o), u = Ft(() => yo(t), [t]), C = o && !l ? [] : u.map(ye), A = D(!0), h = D(u), f = xi(() => /* @__PURE__ */ new Map()), d = D(/* @__PURE__ */ new Set()), [p, y] = rt(u), [x, R] = rt(u);
  De(() => {
    o && !l && !x.length && I?.();
  }, [l, o, x.length, I]), De(() => {
    A.current = !1, h.current = u;
    for (let w = 0; w < x.length; w++) {
      const P = ye(x[w]);
      C.includes(P) ? (f.delete(P), d.current.delete(P)) : f.get(P) !== !0 && f.set(P, !1);
    }
  }, [x, C.length, C.join("-")]);
  const S = [];
  if (u !== p) {
    let w = [...u], P = 0;
    for (const T of x) {
      const N = C.indexOf(ye(T));
      N === -1 ? (w.splice(P++, 0, T), S.push(T)) : P = N + S.length + 1;
    }
    return r === "wait" && S.length && (w = S), R(yo(w)), y(u), null;
  }
  process.env.NODE_ENV !== "production" && r === "wait" && x.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  const { forceRender: m } = Z(vi);
  return v(ue, { children: x.map((w) => {
    const P = ye(w), T = o && !l ? !1 : u === x || C.includes(P), N = () => {
      if (d.current.has(P))
        return;
      if (f.has(P))
        d.current.add(P), f.set(P, !0);
      else
        return;
      let Q = !0;
      f.forEach((Y) => {
        Y || (Q = !1);
      }), Q && (m?.(), R(h.current), o && I?.(), i && i());
    };
    return v(ZC, { isPresent: T, initial: !A.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: r, root: g, onExitComplete: T ? void 0 : N, anchorX: a, anchorY: c, children: w }, P);
  }) });
}, Va = Kt({ strict: !1 }), xo = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let wo = !1;
function HC() {
  if (wo)
    return;
  const t = {};
  for (const e in xo)
    t[e] = {
      isEnabled: (n) => xo[e].some((i) => !!n[i])
    };
  ya(t), wo = !0;
}
function Da() {
  return HC(), zu();
}
function qC(t) {
  const e = Da();
  for (const n in t)
    e[n] = {
      ...e[n],
      ...t[n]
    };
  ya(e);
}
const In = /* @__PURE__ */ Kt({});
function XC(t, e) {
  if (cn(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || ce(n) ? n : void 0,
      animate: ce(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function _C(t) {
  const { initial: e, animate: n } = XC(t, Z(In));
  return Ft(() => ({ initial: e, animate: n }), [Ro(e), Ro(n)]);
}
function Ro(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Xi = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Ga(t, e, n) {
  for (const i in e)
    !W(e[i]) && !wa(i, n) && (t[i] = e[i]);
}
function $C({ transformTemplate: t }, e) {
  return Ft(() => {
    const n = Xi();
    return Bi(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function tA(t, e) {
  const n = t.style || {}, i = {};
  return Ga(i, n, t), Object.assign(i, $C(t, e)), i;
}
function eA(t, e) {
  const n = {}, i = tA(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const Qa = () => ({
  ...Xi(),
  attrs: {}
});
function nA(t, e, n, i) {
  const s = Ft(() => {
    const r = Qa();
    return ga(r, e, Ea(i), t.transformTemplate, t.style), {
      ...r.attrs,
      style: { ...r.style }
    };
  }, [e]);
  if (t.style) {
    const r = {};
    Ga(r, t.style, t), s.style = { ...r, ...s.style };
  }
  return s;
}
const iA = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function _e(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || iA.has(t);
}
function sA(t, e) {
  return t.startsWith("on") ? !_e(t) : e?.(t) ?? !_e(t);
}
function oA(t, e, n, i) {
  const s = {};
  for (const r in t)
    r === "values" && typeof t.values == "object" || W(t[r]) || (sA(r, i) || n === !0 && _e(r) || !e && !_e(r) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && r.startsWith("onDrag")) && (s[r] = t[r]);
  return s;
}
const rA = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function _i(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(rA.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function aA(t, e, n, { latestValues: i }, s, r = !1, o, a) {
  const g = (o ?? _i(t) ? nA : eA)(e, i, s, t), l = oA(e, typeof t == "string", r, a), I = t !== Ko ? { ...l, ...g, ref: n } : {}, { children: u } = e, C = Ft(() => W(u) ? u.get() : u, [u]);
  return $a(t, {
    ...I,
    children: C
  });
}
function lA({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: gA(n, i, s, t),
    renderState: e()
  };
}
function gA(t, e, n, i) {
  const s = {}, r = i(t, {});
  for (const u in r)
    s[u] = Pe(r[u]);
  let { initial: o, animate: a } = t;
  const c = cn(t), g = pa(t);
  e && g && !c && t.inherit !== !1 && (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
  let l = n ? n.initial === !1 : !1;
  l = l || o === !1;
  const I = l ? a : o;
  if (I && typeof I != "boolean" && !gn(I)) {
    const u = Array.isArray(I) ? I : [I];
    for (let C = 0; C < u.length; C++) {
      const A = Gi(t, u[C]);
      if (A) {
        const { transitionEnd: h, transition: f, ...d } = A;
        for (const p in d) {
          let y = d[p];
          if (Array.isArray(y)) {
            const x = l ? y.length - 1 : 0;
            y = y[x];
          }
          y !== null && (s[p] = y);
        }
        for (const p in h)
          s[p] = h[p];
      }
    }
  }
  return s;
}
const Ja = (t) => (e, n) => {
  const i = Z(In), s = Z(an), r = () => lA(t, e, i, s);
  return n ? r() : xi(r);
}, cA = /* @__PURE__ */ Ja({
  scrapeMotionValuesFromProps: Hi,
  createRenderState: Xi
}), IA = /* @__PURE__ */ Ja({
  scrapeMotionValuesFromProps: Sa,
  createRenderState: Qa
}), uA = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function CA(t, e, n) {
  const i = D(n);
  hi(() => {
    i.current = n;
  });
  const s = D(null);
  return No((r) => {
    r && t.onMount?.(r), e && (r ? e.mount(r) : e.unmount());
    const o = i.current;
    if (typeof o == "function")
      if (r) {
        const a = o(r);
        typeof a == "function" && (s.current = a);
      } else s.current ? (s.current(), s.current = null) : o(r);
    else o && (o.current = r);
  }, [e]);
}
const za = Kt({});
function Dt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function AA(t, e, n, i, s, r) {
  const { visualElement: o } = Z(In), a = Z(Va), c = Z(an), g = Z(qi), l = g.reducedMotion, I = g.skipAnimations, u = D(null), C = D(!1);
  i = i || a.renderer, !u.current && i && (u.current = i(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: c,
    blockInitialAnimation: c ? c.initial === !1 : !1,
    reducedMotionConfig: l,
    skipAnimations: I,
    isSVG: r
  }), C.current && u.current && (u.current.manuallyAnimateOnMount = !0));
  const A = u.current, h = Z(za);
  A && !A.projection && s && (A.type === "html" || A.type === "svg") && hA(u.current, n, s, h);
  const f = D(!1);
  hi(() => {
    A && f.current && A.update(n, c);
  });
  const d = n[sa], p = D(!!d && typeof window < "u" && !window.MotionHandoffIsComplete?.(d) && window.MotionHasOptimisedAnimation?.(d));
  return De(() => {
    C.current = !0, A && (f.current = !0, window.MotionIsMounted = !0, A.updateFeatures(), A.scheduleRenderMicrotask(), p.current && A.animationState && A.animationState.animateChanges());
  }), X(() => {
    A && (!p.current && A.animationState && A.animationState.animateChanges(), p.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(d);
    }), p.current = !1), A.enteringChildren = void 0);
  }), A;
}
function hA(t, e, n, i) {
  const { layoutId: s, layout: r, drag: o, dragConstraints: a, layoutScroll: c, layoutRoot: g, layoutAnchor: l, layoutCrossfade: I } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : Ba(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: r,
    alwaysMeasureLayout: !!o || a && Dt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof r == "string" ? r : "both",
    initialPromotionConfig: i,
    crossfade: I,
    layoutScroll: c,
    layoutRoot: g,
    layoutAnchor: l
  });
}
function Ba(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : Ba(t.parent);
}
function bn(t, { forwardMotionProps: e = !1, type: n } = {}, i, s) {
  i && qC(i);
  const r = n ? n === "svg" : _i(t), o = r ? IA : cA;
  function a(g, l) {
    let I;
    const u = {
      ...Z(qi),
      ...g,
      layoutId: dA(g)
    }, { isStatic: C, isValidProp: A } = u, h = _C(g), f = o(g, C);
    if (!C && typeof window < "u") {
      fA(u, i);
      const d = pA(u);
      I = d.MeasureLayout, h.visualElement = AA(t, f, u, s, d.ProjectionNode, r);
    }
    return F(In.Provider, { value: h, children: [I && h.visualElement ? v(I, { visualElement: h.visualElement, ...u }) : null, aA(t, g, CA(f, h.visualElement, l), f, C, e, r, A)] });
  }
  a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const c = Uo(a);
  return c[uA] = t, c;
}
function dA({ layoutId: t }) {
  const e = Z(vi).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function fA(t, e) {
  const n = Z(Va).strict;
  if (process.env.NODE_ENV !== "production" && e && n) {
    const i = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    t.ignoreStrict ? qt(!1, i, "lazy-strict-mode") : Ct(!1, i, "lazy-strict-mode");
  }
}
function pA(t) {
  const e = Da(), { drag: n, layout: i } = e;
  if (!n && !i)
    return {};
  const s = { ...n, ...i };
  return {
    MeasureLayout: n?.isEnabled(t) || i?.isEnabled(t) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function mA(t, e) {
  if (typeof Proxy > "u")
    return bn;
  const n = /* @__PURE__ */ new Map(), i = (r, o) => bn(r, o, t, e), s = (r, o) => (process.env.NODE_ENV !== "production" && Si(!1, "motion() is deprecated. Use motion.create() instead."), i(r, o));
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, o) => o === "create" ? i : (n.has(o) || n.set(o, bn(o, void 0, t, e)), n.get(o))
  });
}
const yA = (t, e) => e.isSVG ?? _i(t) ? new qu(e) : new Wu(e, {
  allowProjection: t !== Ko
});
class vA extends xt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = eC(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    gn(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let xA = 0;
class wA extends xt {
  constructor() {
    super(...arguments), this.id = xA++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    if (e && i === !1) {
      if (this.isExitComplete) {
        const { initial: r, custom: o } = this.node.getProps();
        if (typeof r == "string" || typeof r == "object" && r !== null && !Array.isArray(r)) {
          const a = Mt(this.node, r, o);
          if (a) {
            const { transition: c, transitionEnd: g, ...l } = a;
            for (const I in l)
              this.node.getValue(I)?.jump(l[I]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const s = this.node.animationState.setActive("exit", !e);
    n && !e && s.then(() => {
      this.isExitComplete = !0, n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const RA = {
  animation: {
    Feature: vA
  },
  exit: {
    Feature: wA
  }
};
function de(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const EA = (t) => (e) => Zi(e) && t(e, de(e));
function ie(t, e, n, i) {
  return Ie(t, e, EA(n), i);
}
const Ya = ({ current: t }) => t ? t.ownerDocument.defaultView : null, Eo = (t, e) => Math.abs(t - e);
function SA(t, e) {
  const n = Eo(t.x, e.x), i = Eo(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
const So = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Za {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: r = !1, distanceThreshold: o = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (A) => {
      this.handleScroll(A.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = ve(this.lastRawMoveEventInfo, this.transformPagePoint));
      const A = kn(this.lastMoveEventInfo, this.history), h = this.startEvent !== null, f = SA(A.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!h && !f)
        return;
      const { point: d } = A, { timestamp: p } = z;
      this.history.push({ ...d, timestamp: p });
      const { onStart: y, onMove: x } = this.handlers;
      h || (y && y(this.lastMoveEvent, A), this.startEvent = this.lastMoveEvent), x && x(this.lastMoveEvent, A);
    }, this.handlePointerMove = (A, h) => {
      this.lastMoveEvent = A, this.lastRawMoveEventInfo = h, this.lastMoveEventInfo = ve(h, this.transformPagePoint), V.update(this.updatePoint, !0);
    }, this.handlePointerUp = (A, h) => {
      this.end();
      const { onEnd: f, onSessionEnd: d, resumeAnimation: p } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && p && p(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const y = kn(A.type === "pointercancel" ? this.lastMoveEventInfo : ve(h, this.transformPagePoint), this.history);
      this.startEvent && f && f(A, y), d && d(A, y);
    }, !Zi(e))
      return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = o, this.contextWindow = s || window;
    const c = de(e), g = ve(c, this.transformPagePoint), { point: l } = g, { timestamp: I } = z;
    this.history = [{ ...l, timestamp: I }];
    const { onSessionStart: u } = n;
    u && u(e, kn(g, this.history));
    const C = { passive: !0, capture: !0 };
    this.removeListeners = Ce(ie(this.contextWindow, "pointermove", this.handlePointerMove, C), ie(this.contextWindow, "pointerup", this.handlePointerUp, C), ie(this.contextWindow, "pointercancel", this.handlePointerUp, C)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let n = e.parentElement;
    for (; n; ) {
      const i = getComputedStyle(n);
      (So.has(i.overflowX) || So.has(i.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const n = this.scrollPositions.get(e);
    if (!n)
      return;
    const i = e === window, s = i ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, r = { x: s.x - n.x, y: s.y - n.y };
    r.x === 0 && r.y === 0 || (i ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += r.x, this.lastMoveEventInfo.point.y += r.y) : this.history.length > 0 && (this.history[0].x -= r.x, this.history[0].y -= r.y), this.scrollPositions.set(e, s), V.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), yt(this.updatePoint);
  }
}
function ve(t, e) {
  return e ? { point: e(t.point) } : t;
}
function bo(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function kn({ point: t }, e) {
  return {
    point: t,
    delta: bo(t, Wa(e)),
    offset: bo(t, bA(e)),
    velocity: kA(e, 0.1)
  };
}
function bA(t) {
  return t[0];
}
function Wa(t) {
  return t[t.length - 1];
}
function kA(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = Wa(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ nt(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  i === t[0] && t.length > 2 && s.timestamp - i.timestamp > /* @__PURE__ */ nt(e) * 2 && (i = t[1]);
  const r = /* @__PURE__ */ et(s.timestamp - i.timestamp);
  if (r === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (s.x - i.x) / r,
    y: (s.y - i.y) / r
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function TA(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? K(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? K(n, t, i.max) : Math.min(t, n)), t;
}
function ko(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function OA(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: ko(t.x, n, s),
    y: ko(t.y, e, i)
  };
}
function To(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function PA(t, e) {
  return {
    x: To(t.x, e.x),
    y: To(t.y, e.y)
  };
}
function jA(t, e) {
  let n = 0.5;
  const i = $(t), s = $(e);
  return s > i ? n = /* @__PURE__ */ ae(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ ae(t.min, t.max - s, e.min)), lt(0, 1, n);
}
function MA(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Ii = 0.35;
function FA(t = Ii) {
  return t === !1 ? t = 0 : t === !0 && (t = Ii), {
    x: Oo(t, "left", "right"),
    y: Oo(t, "top", "bottom")
  };
}
function Oo(t, e, n) {
  return {
    min: Po(t, e),
    max: Po(t, n)
  };
}
function Po(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const UA = /* @__PURE__ */ new WeakMap();
class NA {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = J(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const r = (I) => {
      n && this.snapToCursor(de(I).point), this.stopAnimation();
    }, o = (I, u) => {
      const { drag: C, dragPropagation: A, onDragStart: h } = this.getProps();
      if (C && !A && (this.openDragLock && this.openDragLock(), this.openDragLock = xu(C), !this.openDragLock))
        return;
      this.latestPointerEvent = I, this.latestPanInfo = u, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), gt((d) => {
        let p = this.getAxisMotionValue(d).get() || 0;
        if (It.test(p)) {
          const { projection: y } = this.visualElement;
          if (y && y.layout) {
            const x = y.layout.layoutBox[d];
            x && (p = $(x) * (parseFloat(p) / 100));
          }
        }
        this.originPoint[d] = p;
      }), h && V.update(() => h(I, u), !1, !0), ii(this.visualElement, "transform");
      const { animationState: f } = this.visualElement;
      f && f.setActive("whileDrag", !0);
    }, a = (I, u) => {
      this.latestPointerEvent = I, this.latestPanInfo = u;
      const { dragPropagation: C, dragDirectionLock: A, onDirectionLock: h, onDrag: f } = this.getProps();
      if (!C && !this.openDragLock)
        return;
      const { offset: d } = u;
      if (A && this.currentDirection === null) {
        this.currentDirection = LA(d), this.currentDirection !== null && h && h(this.currentDirection);
        return;
      }
      this.updateAxis("x", u.point, d), this.updateAxis("y", u.point, d), this.visualElement.render(), f && V.update(() => f(I, u), !1, !0);
    }, c = (I, u) => {
      this.latestPointerEvent = I, this.latestPanInfo = u, this.stop(I, u), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, g = () => {
      const { dragSnapToOrigin: I } = this.getProps();
      (I || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: l } = this.getProps();
    this.panSession = new Za(e, {
      onSessionStart: r,
      onStart: o,
      onMove: a,
      onSessionEnd: c,
      resumeAnimation: g
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: l,
      distanceThreshold: i,
      contextWindow: Ya(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, r = this.isDragging;
    if (this.cancel(), !r || !s || !i)
      return;
    const { velocity: o } = s;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && V.postRender(() => a(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !xe(e, s, this.currentDirection))
      return;
    const r = this.getAxisMotionValue(e);
    let o = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (o = TA(o, this.constraints[e], this.elastic[e])), r.set(o);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && Dt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = OA(i.layoutBox, e) : this.constraints = !1, this.elastic = FA(n), s !== this.constraints && !Dt(e) && i && this.constraints && !this.hasMutatedConstraints && gt((r) => {
      this.constraints !== !1 && this.getAxisMotionValue(r) && (this.constraints[r] = MA(i.layoutBox[r], this.constraints[r]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !Dt(e))
      return !1;
    const i = e.current;
    Ct(i !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    s.root && (s.root.scroll = void 0, s.root.updateScroll());
    const r = vu(i, s.root, this.visualElement.getTransformPagePoint());
    let o = PA(s.layout.layoutBox, r);
    if (n) {
      const a = n(pu(o));
      this.hasMutatedConstraints = !!a, a && (o = ca(a));
    }
    return o;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), c = this.constraints || {}, g = gt((l) => {
      if (!xe(l, n, this.currentDirection))
        return;
      let I = c && c[l] || {};
      (o === !0 || o === l) && (I = { min: 0, max: 0 });
      const u = s ? 200 : 1e6, C = s ? 40 : 1e7, A = {
        type: "inertia",
        velocity: i ? e[l] : 0,
        bounceStiffness: u,
        bounceDamping: C,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...r,
        ...I
      };
      return this.startAxisValueAnimation(l, A);
    });
    return Promise.all(g).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return ii(this.visualElement, e), i.start(Di(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    gt((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, s = this.visualElement.getProps()[n];
    return s || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
  }
  snapToCursor(e) {
    gt((n) => {
      const { drag: i } = this.getProps();
      if (!xe(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, r = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: o, max: a } = s.layout.layoutBox[n], c = r.get() || 0;
        r.set(e[n] - K(o, a, 0.5) + c);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!Dt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    gt((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const c = a.get();
        s[o] = jA({ min: c, max: c }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.constraints = !1, this.resolveConstraints(), gt((o) => {
      if (!xe(o, e, null))
        return;
      const a = this.getAxisMotionValue(o), { min: c, max: g } = this.constraints[o];
      a.set(K(c, g, s[o]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    UA.set(this.visualElement, this);
    const e = this.visualElement.current, n = ie(e, "pointerdown", (g) => {
      const { drag: l, dragListener: I = !0 } = this.getProps(), u = g.target, C = u !== e && ku(u);
      l && I && !C && this.start(g);
    });
    let i;
    const s = () => {
      const { dragConstraints: g } = this.getProps();
      Dt(g) && g.current && (this.constraints = this.resolveRefConstraints(), i || (i = KA(e, g.current, () => this.scalePositionWithinConstraints())));
    }, { projection: r } = this.visualElement, o = r.addEventListener("measure", s);
    r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), V.read(s);
    const a = Ie(window, "resize", () => this.scalePositionWithinConstraints()), c = r.addEventListener("didUpdate", (({ delta: g, hasLayoutChanged: l }) => {
      this.isDragging && l && (gt((I) => {
        const u = this.getAxisMotionValue(I);
        u && (this.originPoint[I] += g[I].translate, u.set(u.get() + g[I].translate));
      }), this.visualElement.render());
    }));
    return () => {
      a(), n(), o(), c && c(), i && i();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: r = !1, dragElastic: o = Ii, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: r,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function jo(t) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    t();
  };
}
function KA(t, e, n) {
  const i = Js(t, jo(n)), s = Js(e, jo(n));
  return () => {
    i(), s();
  };
}
function xe(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function LA(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class VA extends xt {
  constructor(e) {
    super(e), this.removeGroupControls = at, this.removeListeners = at, this.controls = new NA(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || at;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Tn = (t) => (e, n) => {
  t && V.update(() => t(e, n), !1, !0);
};
class DA extends xt {
  constructor() {
    super(...arguments), this.removePointerDownListener = at;
  }
  onPointerDown(e) {
    this.session = new Za(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Ya(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Tn(e),
      onStart: Tn(n),
      onMove: Tn(i),
      onEnd: (r, o) => {
        delete this.session, s && V.postRender(() => s(r, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = ie(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let On = !1;
class GA extends tl {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: r } = e;
    r && (n.group && n.group.add(r), i && i.register && s && i.register(r), On && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({
      ...r.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), je.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: r } = this.props, { projection: o } = i;
    return o && (o.isPresent = r, e.layoutDependency !== n && o.setOptions({
      ...o.options,
      layoutDependency: n
    }), On = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? o.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? o.promote() : o.relegate() || V.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: n } = this.props, { projection: i } = e;
    i && (i.options.layoutAnchor = n, i.root.didUpdate(), Yi.postRender(() => {
      !i.currentAnimation && i.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    On = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Ha(t) {
  const [e, n] = La(), i = Z(vi);
  return v(GA, { ...t, layoutGroup: i, switchLayoutGroup: Z(za), isPresent: e, safeToRemove: n });
}
const QA = {
  pan: {
    Feature: DA
  },
  drag: {
    Feature: VA,
    ProjectionNode: Ka,
    MeasureLayout: Ha
  }
};
function Mo(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, r = i[s];
  r && V.postRender(() => r(e, de(e)));
}
class JA extends xt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Ru(e, (n, i) => (Mo(this.node, i, "Start"), (s) => Mo(this.node, s, "End"))));
  }
  unmount() {
  }
}
class zA extends xt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Ce(Ie(this.node.current, "focus", () => this.onFocus()), Ie(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Fo(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), r = i[s];
  r && V.postRender(() => r(e, de(e)));
}
class BA extends xt {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: n, propagate: i } = this.node.props;
    this.unmount = Ou(e, (s, r) => (Fo(this.node, r, "Start"), (o, { success: a }) => Fo(this.node, o, a ? "End" : "Cancel")), {
      useGlobalTarget: n,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const ui = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), YA = (t) => {
  const e = ui.get(t.target);
  e && e(t);
}, ZA = (t) => {
  t.forEach(YA);
};
function WA({ root: t, ...e }) {
  const n = t || document;
  Pn.has(n) || Pn.set(n, {});
  const i = Pn.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(ZA, { root: t, ...e })), i[s];
}
function HA(t, e, n) {
  const i = WA(e);
  return ui.set(t, n), i.observe(t), () => {
    ui.delete(t), i.unobserve(t);
  };
}
const qA = {
  some: 0,
  all: 1
};
class XA extends xt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: r } = e, o = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : qA[s]
    }, a = (c) => {
      const { isIntersecting: g } = c;
      if (this.isInView === g || (this.isInView = g, r && !g && this.hasEnteredView))
        return;
      g && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", g);
      const { onViewportEnter: l, onViewportLeave: I } = this.node.getProps(), u = g ? l : I;
      u && u(c);
    };
    this.stopObserver = HA(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(_A(e, n)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function _A({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const $A = {
  inView: {
    Feature: XA
  },
  tap: {
    Feature: BA
  },
  focus: {
    Feature: zA
  },
  hover: {
    Feature: JA
  }
}, th = {
  layout: {
    ProjectionNode: Ka,
    MeasureLayout: Ha
  }
}, eh = {
  ...RA,
  ...$A,
  ...QA,
  ...th
}, jn = /* @__PURE__ */ mA(eh, yA), lh = ({
  nodes: t,
  activeNodeId: e,
  activeSubNodeId: n,
  onNodeSelect: i,
  onSubNodeSelect: s,
  isMobileMenuOpen: r,
  onClose: o
}) => {
  const { theme: a } = ft(), [c, g] = rt(typeof window < "u" ? window.innerWidth >= 1024 : !0), [l, I] = rt(/* @__PURE__ */ new Set([e || t[0]?.id])), u = D({}), C = D(l);
  X(() => {
    const d = Array.from(l).find((p) => !C.current.has(p));
    if (d !== void 0) {
      const p = u.current[d];
      p && setTimeout(() => {
        const y = p.closest("aside");
        y && y.scrollTo({
          top: p.offsetTop - 24,
          // Keep slight padding at top
          behavior: "smooth"
        });
      }, 450);
    }
    C.current = new Set(l);
  }, [l]), X(() => {
    const d = () => g(window.innerWidth >= 1024);
    return window.addEventListener("resize", d), () => window.removeEventListener("resize", d);
  }, []);
  const A = (d, p) => {
    p.stopPropagation();
    const y = new Set(l);
    y.has(d) ? y.delete(d) : y.add(d), I(y);
  }, h = (d) => {
    l.has(d) || I(new Set(l).add(d)), i(d);
  }, f = (d, p) => {
    s && s(d, p), c || o();
  };
  return /* @__PURE__ */ F(ue, { children: [
    /* @__PURE__ */ v(vo, { children: r && !c && /* @__PURE__ */ v(
      jn.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: o,
        className: "fixed inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm z-30",
        style: { top: "var(--fc-header-height, 80px)" }
      }
    ) }),
    /* @__PURE__ */ v(
      jn.aside,
      {
        initial: !1,
        animate: {
          x: c || r ? 0 : -320,
          visibility: c || r ? "visible" : "hidden"
        },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: `w-80 z-40 overflow-y-auto backdrop-blur-xl border-r shadow-2xl xl:shadow-none xl:sticky
                          fixed inset-y-0 left-0 pt-6 xl:pt-12 pb-24 xl:h-[calc(100vh-var(--fc-header-height,80px))] xl:top-[var(--fc-header-height,80px)]`,
        style: {
          backgroundColor: a.colors.bg.sidebar,
          borderColor: `${a.colors.border}30`
        },
        children: /* @__PURE__ */ F("nav", { className: "px-4", children: [
          /* @__PURE__ */ v("h2", { className: "text-xs font-black tracking-widest text-gray-400 uppercase mb-6 px-4", children: "Contents" }),
          /* @__PURE__ */ v("ul", { className: "space-y-3", children: t.map((d) => {
            const p = l.has(d.id), y = e === d.id, x = d.subNodes && d.subNodes.length > 0;
            return /* @__PURE__ */ F("li", { ref: (R) => {
              u.current[d.id] = R;
            }, className: "flex flex-col", children: [
              /* @__PURE__ */ F("div", { className: "flex relative", children: [
                /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => h(d.id),
                    className: `group flex-1 flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-bold interactive-effect ${y ? "shadow-sm ring-1 ring-inset" : "opacity-80 hover:opacity-100"}`,
                    style: {
                      backgroundColor: y ? a.colors.primary.DEFAULT : "transparent",
                      color: y ? a.colors.text.onDark : a.colors.text.primary,
                      borderColor: y ? `${a.colors.primary.DEFAULT}30` : "transparent"
                    },
                    children: /* @__PURE__ */ v("span", { className: "text-left line-clamp-2 pr-2 leading-snug text-[15px]", children: d.title })
                  }
                ),
                x && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: (R) => A(d.id, R),
                    onKeyDown: (R) => {
                      (R.key === "Enter" || R.key === " ") && (R.preventDefault(), A(d.id, R));
                    },
                    className: `absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-transform duration-300 hover:bg-black/5 focus-visible:ring-2 focus-visible:outline-none ${p ? "rotate-90" : "rotate-0"}`,
                    style: { color: y ? a.colors.text.onDark : a.colors.text.primary },
                    "aria-label": p ? "Collapse section" : "Expand section",
                    "aria-expanded": p,
                    children: /* @__PURE__ */ v("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ v("path", { d: "m9 18 6-6-6-6" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ v(vo, { initial: !1, children: p && x && /* @__PURE__ */ F(
                jn.ul,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.3, ease: "easeInOut" },
                  className: "overflow-hidden relative mt-1 ml-4",
                  children: [
                    /* @__PURE__ */ v(
                      "div",
                      {
                        className: "absolute left-[11px] top-2 bottom-2 w-[2px] rounded-full",
                        style: { backgroundColor: `${a.colors.border}40` }
                      }
                    ),
                    /* @__PURE__ */ v("div", { className: "py-2 space-y-1 pl-6 relative", children: d.subNodes.map((R) => {
                      const S = n === R.id;
                      return /* @__PURE__ */ v("li", { className: "relative", children: /* @__PURE__ */ v(
                        "button",
                        {
                          onClick: () => f(d.id, R.id),
                          className: `w-full text-left px-3 py-2 text-[14px] leading-tight font-medium rounded-lg transition-all duration-200 interactive-effect ${S ? "font-bold" : "opacity-70 hover:opacity-100"}`,
                          style: {
                            color: S ? a.colors.primary.DEFAULT : a.colors.text.primary,
                            backgroundColor: S ? `${a.colors.primary.DEFAULT}15` : "transparent"
                          },
                          children: R.title
                        }
                      ) }, R.id);
                    }) })
                  ]
                }
              ) })
            ] }, d.id);
          }) })
        ] })
      }
    )
  ] });
};
export {
  nl as APP_THEME,
  ul as Footer,
  oh as Layout,
  Et as NavDropdown,
  ll as Navbar,
  lh as Sidebar,
  rh as SmartTooltip,
  sl as ThemeProvider,
  ol as Topbar,
  zo as businessItems,
  Bo as communitiesItems,
  Go as departmentsItems,
  il as getActiveTheme,
  gl as getNativeMapUrl,
  Yo as howDoIItems,
  Qo as residentsItems,
  ft as useTheme,
  Jo as visitorsItems
};
//# sourceMappingURL=index.js.map
