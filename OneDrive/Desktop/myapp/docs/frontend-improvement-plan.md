# ArchitectureFirst - Frontend Improvement Plan
## Using Impeccable Design Principles

### Current State Assessment
The client exists as a scaffold with empty files. No components implemented. This is a greenfield frontend opportunity.

### Impeccable-Driven Improvements

#### 1. Establish Design System Foundation

**Create Design Tokens**
```bash
mkdir -p client/src/design
touch client/src/design/tokens.ts
```

Implement tokens for colors, spacing, typography, radius, shadows.

**Create Base Components** (shadcn/ui quality)
- Button variants (primary, secondary, ghost, danger)
- Card (project card base)
- Badge (difficulty indicators)
- Progress (learning progress)
- Modal (project detail)
- Toast (notifications)

#### 2. Implement Project Card System

The ProjectCard is the hero component. Impeccable requires:
- Complete, not placeholder
- Real imagery not lorem ipsum
- Scannable at glance
- Consistent hierarchy

**Required Fields**:
- Thumbnail (16:9)
- Title (2 lines max)
- Difficulty badge
- Hours estimate
- Prerequisites count
- Progress bar (if started)
- Actions (Continue/View)

#### 3. Build Learning Path Visualization

This is the core UX. Impeccable principles:
- Clear dependency visualization
- Progress immediately visible
- No hidden information

Implement Timeline component with:
- Vertical/horizontal responsive
- Node states (completed/current/locked)
- Prerequisite connections
- Hover states showing details

#### 4. Resource Hub Implementation

YouTube, GitHub, Demo integration must be:
- Consistent layout
- Clear hierarchy (YouTube primary)
- Collapsible but accessible
- Mobile-friendly

#### 5. Progress & Notes System

Key engagement features:
- Progress auto-saves
- Notes are position-anchored
- Bookmarks persist
- All states handled (empty, loading, error)

### Implementation Roadmap

#### Phase 1: Foundation (Week 1)
1. Design tokens setup
2. Base component library
3. Layout shell (header, sidebar, main)
4. Project card grid
5. Routing structure

#### Phase 2: Core Features (Week 2)
1. Project detail page
2. Learning path timeline
3. Prerequisites checker
4. Progress tracking UI
5. Resource stack

#### Phase 3: Engagement (Week 3)
1. Notes system
2. Bookmarks
3. Dashboard
4. Search & filters
5. User profile

#### Phase 4: Polish (Week 4)
1. Micro-interactions
2. Loading states
3. Error handling
4. Accessibility audit
5. Performance optimization

### Specific Impeccable Improvements

**1. Craft Floor Compliance**
- No empty states without guidance
- All buttons have focus states
- Color contrast passes WCAG AA
- Semantic HTML throughout
- Keyboard navigation works

**2. Visual Authority**
- Consistent spacing (4px grid)
- Typography scale maintained
- No ad-hoc colors
- Components reusable
- Design tokens enforced

**3. Progressive Enhancement**
- Works without JavaScript
- Loading states meaningful
- Error states helpful
- Offline indicator
- Graceful degradation

**4. Performance**
- Critical CSS inlined
- Images lazy loaded
- Code split by route
- Prefetch next project
- Debounce search

### Component Specifications

**ProjectCard.tsx**
```tsx
interface ProjectCardProps {
  project: Project;
  progress?: Progress;
  onContinue?: () => void;
  onView?: () => void;
}

// Must handle:
// - Empty thumbnail
// - Long titles
// - Multiple prerequisites
// - Zero progress
// - Completed state
// - Locked state
```

**LearningTimeline.tsx**
```tsx
interface TimelineProps {
  projects: Project[];
  progress: Record<string, Progress>;
  onProjectClick: (id: string) => void;
}

// Must handle:
// - Circular dependencies
// - Long project chains
// - Mobile horizontal scroll
// - Empty states
```

**ResourceStack.tsx**
```tsx
interface ResourceStackProps {
  youtubeUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  walkthrough?: string;
}

// Must handle:
// - Missing resources gracefully
// - External link warnings
// - Mobile video autoplay policies
// - Tab navigation
```

### Quality Gates

**Before Shipping Any Component**:
1. Verify in bounded pass (desktop + mobile)
2. Check all states (empty, loading, error, success)
3. Test keyboard navigation
4. Verify screen reader labels
5. Check color contrast
6. Performance budget met

**Impeccable Refactor Checklist**:
- [ ] No hedging - complete implementation
- [ ] Bold and distinct - not safe/generic
- [ ] Production-grade - handles edge cases
- [ ] Clear POV - design decisions justified
- [ ] Peak creativity - delightful details
- [ ] Deep understanding - user needs met

### Recommended Tools

**Design**:
- Figma for prototyping
- Storybook for component dev
- Chromatic for visual regression

**Code**:
- TypeScript strict mode
- ESLint with React hooks
- Prettier formatting
- Husky pre-commit hooks

**Testing**:
- Vitest for unit tests
- Playwright for E2E
- Accessibility tests (axe)

### Metrics for Success

- Lighthouse score >90
- First Contentful Paint <1.5s
- Component reuse >80%
- Accessibility score 100%
- Visual consistency 100%

### Next Actions

1. Create design tokens file
2. Set up Storybook
3. Build ProjectCard component
4. Build LearningTimeline component
5. Integrate with existing API
6. Test with real data
7. Polish with impeccable principles

The frontend will go from empty scaffold to production-ready learning platform following impeccable craft standards.