# ArchitectureFirst - Frontend Design Plan
## Generated with Impeccable Skill Principles

### Mode: Operate
The visitor completes learning tasks. Dashboards, project catalogs, progress tracking. Scanability, consistency, and native expectations outrank expression.

### Core Design Principles

**1. Progress-First Navigation**
- Global progress indicator (top bar or sidebar)
- Next logical project always visible
- Prerequisite chain clearly shown
- "Continue learning" as primary CTA

**2. Learning Path Visualization**
- Timeline view of projects in dependency order
- Visual indicators for completed/in-progress/locked
- Estimated time to complete
- Skills gained per project

**3. Project Cards as Learning Promises**
- Thumbnail (project screenshot/demo)
- Difficulty badge (color-coded)
- Estimated hours
- Prerequisites count
- Progress bar if started

**4. Resource Hub Pattern**
- YouTube walkthrough (primary)
- Code repo (secondary)
- Live demo (tertiary)
- Walkthrough docs (supporting)
- All in clear hierarchy

### Visual Design System

**Color Palette**
- Primary: #0A0A0A (near black) - professional, learning-focused
- Accent: #2563EB (blue) - trust, progress
- Success: #10B981 (green) - completion
- Warning: #F59E0B (amber) - in progress
- Error: #EF4444 (red) - prerequisites missing
- Background: #FAFAFA (light gray) - reduces eye strain

**Typography**
- Headings: Inter Bold (600), 24-32px
- Body: Inter Regular (400), 16px
- Code: JetBrains Mono, 14px
- Line height: 1.6 for readability

**Spacing System**
- 4px base unit
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Component Library**

1. **ProjectCard**
   - Cover image
   - Title + difficulty
   - Short description (2 lines max)
   - Meta: hours, prerequisites
   - Progress bar (if started)
   - Actions: Continue/View

2. **ProgressTimeline**
   - Vertical timeline for project path
   - Nodes for each project
   - Connection lines showing prerequisites
   - Completed nodes filled
   - Current node highlighted

3. **PrerequisiteChecker**
   - Before starting project
   - Shows required projects
   - Links to prerequisite projects
   - "Start prerequisites" CTA

4. **ResourceStack**
   - YouTube embed (collapsible)
   - GitHub button
   - Live demo button
   - Walkthrough tabs

5. **NoteSidebar**
   - Sticky notes panel
   - Auto-save
   - Position anchoring
   - Markdown support

6. **BookmarkToggle**
   - Heart icon
   - Instant feedback
   - Persistent across sessions

### Page Structure

**Homepage**
- Hero: "Architecture through projects"
- Progress snapshot (if logged in)
- Recommended next project
- Browse all projects (filterable)

**Project Catalog**
- Grid of ProjectCards
- Filters: difficulty, status, tags
- Sort: recommended, newest, most popular
- Search by title/description

**Project Detail**
- Hero with thumbnail
- Title + difficulty + hours
- Prerequisites (with links)
- Description
- Resources (YouTube, GitHub, demo)
- Walkthrough tabs/content
- Progress tracker
- Notes panel
- Related projects

**Learning Path**
- Timeline view of all projects
- Filter by tracked/started/completed
- Click project to view details
- Drag to reorder (if custom path)

**Dashboard**
- Overall progress stats
- Recent activity
- Next up projects
- Bookmarked projects
- Achievements

### Responsive Behavior

**Desktop (1280+)**
- Sidebar navigation
- 3-column project grid
- Timeline horizontal
- Side panel for notes

**Tablet (768-1279)**
- Collapsible sidebar
- 2-column grid
- Timeline vertical
- Notes below content

**Mobile (320-767)**
- Bottom nav
- Single column
- Accordion for details
- Swipeable resource tabs

### Accessibility Standards

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader labels
- Focus indicators
- Color contrast 4.5:1 minimum
- Semantic HTML
- ARIA labels for dynamic content

### Performance Targets

- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3.5s

### States & Edge Cases

**Empty States**
- No projects tracked: "Start your journey"
- No bookmarks: "Save projects for later"
- No notes: "Add notes as you learn"

**Loading States**
- Skeleton screens for project cards
- Progress bar for uploads
- Inline spinners for actions

**Error States**
- Prerequisites not met: Clear blocking UI
- Resource unavailable: Fallback link
- Offline: Cached content indicator

### Micro-interactions

- Project card hover: Subtle lift + shadow
- Progress completion: Checkmark animation
- Bookmark toggle: Heart fill animation
- Tab switching: 200ms fade
- Button press: 100ms scale down

### Design Tokens

```css
:root {
  /* Colors */
  --color-primary: #0A0A0A;
  --color-accent: #2563EB;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

### Implementation Priority

**Phase 1: Core**
- Project catalog
- Project detail
- Progress tracking
- Authentication

**Phase 2: Learning**
- Prerequisites
- Learning path
- Notes
- Bookmarks

**Phase 3: Polish**
- Dashboard
- Achievements
- Advanced filtering
- Dark mode

### Anti-Patterns to Avoid

- ❌ Flashy gradients over substance
- ❌ Too many animations
- ❌ Hidden navigation
- ❌ Non-standard UI patterns
- ❌ Color-coding without text labels
- ❌ Overwhelming project lists

### Success Criteria

- Users can find their next project in <3 clicks
- Progress is visible at all times
- Mobile learning experience is seamless
- Prerequisites are never confusing
- Notes are easy to find and use