# ArchitectureFirst - Design System

## DESIGN.md

### Project Identity
**Name**: ArchitectureFirst  
**Mode**: Operate - Learning platform with task completion focus  
**Voice**: Professional, clear, supportive

### Visual World

**Concept**: "Learning Studio" - Clean, focused, progress-oriented. Like a well-organized workshop where materials are clearly labeled and tools are within reach.

**Key Attributes**:
- Functional over decorative
- Progress visible always
- Clear hierarchy
- Generous whitespace
- Subtle depth

### Color System

**Primary Palette**:
- Background: #FAFAFA (neutral-50)
- Surface: #FFFFFF
- Text primary: #0A0A0A
- Text secondary: #52525B (neutral-600)
- Border: #E4E4E7 (neutral-200)

**Semantic Colors**:
- Progress Blue: #2563EB
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Info: #0EA5E9

**Difficulty Coding**:
- Beginner: #10B981 (green)
- Intermediate: #F59E0B (amber)
- Advanced: #EF4444 (red)

### Typography

**Font System**:
- Display/Headings: Inter (600 weight)
- Body: Inter (400 weight)
- Code/Mono: JetBrains Mono (400 weight)

**Scale**:
- h1: 32px / 40px line
- h2: 24px / 32px line
- h3: 20px / 28px line
- body: 16px / 24px line
- small: 14px / 20px line
- caption: 12px / 16px line

### Component Specifications

#### Project Card
```
Container: White surface, 8px radius, subtle shadow
Padding: 20px
Header: Thumbnail (16:9), difficulty badge (top-right)
Title: 18px bold, 2 lines max
Meta: 14px secondary, icon + text
Footer: Progress bar (if started), actions
Hover: Shadow increases, subtle lift
```

#### Progress Timeline
```
Vertical line: 2px border
Nodes: 40px circles with status icon
Completed: Filled green with check
Current: Filled blue with pulse
Locked: Gray outline
Spacing: 48px between nodes
```

#### Prerequisite Checker
```
Block: Amber border, amber background tint
Icon: Warning circle
Text: "Complete these first:"
List: Checkboxes with links
CTA: Primary button "Start Prerequisites"
```

#### Resource Stack
```
Stacked cards with 8px overlap
Active card: Full opacity, shadow
Inactive: 60% opacity
Tabs: YouTube | Code | Demo | Walkthrough
YouTube: 16:9 embed, collapsible
Code: Link + stars + language badge
Demo: Screenshot + "Open" button
```

### Layout Patterns

**Desktop Grid**:
- Sidebar: 280px fixed
- Main: Flex 1
- Content max-width: 1200px
- Gutter: 24px

**Project Grid**:
- 3 columns: 1fr 1fr 1fr
- Gap: 24px
- Card min-height: 400px

**Mobile**:
- Stacked single column
- Bottom nav: 64px height
- Content padding: 16px

### Interaction Design

**Micro-interactions**:
- Hover (200ms ease-out)
- Press (100ms scale 0.98)
- Success (checkmark draw 300ms)
- Error (shake 400ms)

**Focus States**:
- 2px solid blue outline
- 4px offset
- Always visible

**Loading**:
- Skeleton screens match final layout
- Pulse animation 1.5s loop
- Never show spinner alone

### Accessibility

**WCAG AA Compliance**:
- Color contrast minimum 4.5:1
- Focus order logical
- Keyboard accessible
- Screen reader labels
- Reduced motion support

**Keyboard Navigation**:
- Tab: Next focusable
- Enter: Activate
- Escape: Close modal
- Arrow keys: Grid navigation

### Performance

**Critical Path**:
- Inline critical CSS
- Lazy load images
- Prefetch next project
- Code split by route

**Images**:
- WebP format
- Responsive sizes
- Lazy loading
- Blur placeholder

### Quality Floor (Craft Rules)

**Never**:
- Use color alone to convey meaning
- Hide required actions
- Truncate without ellipsis
- Use non-semantic elements for layout
- Skip focus states
- Use placeholder lorem ipsum

**Always**:
- Show progress state
- Provide clear error messages
- Support keyboard navigation
- Test at 200% zoom
- Check color blindness sim

### Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Design Tokens

```json
{
  "colors": {
    "background": "#FAFAFA",
    "surface": "#FFFFFF",
    "text": { "primary": "#0A0A0A", "secondary": "#52525B" },
    "border": "#E4E4E7",
    "primary": "#2563EB",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444"
  },
  "spacing": {
    "xs": "4px", "sm": "8px", "md": "16px", 
    "lg": "24px", "xl": "32px", "2xl": "48px"
  },
  "radius": { "sm": "4px", "md": "8px", "lg": "12px" },
  "shadow": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)"
  }
}
```

### Implementation Notes

**Priority Order**:
1. Design tokens + base styles
2. ProjectCard component
3. ProgressTimeline component
4. Project detail page
5. ResourceStack component
6. Notes system
7. Dashboard

**Tech Stack**:
- React 18+
- TypeScript strict
- Tailwind CSS (utility first)
- shadcn/ui components
- Framer Motion (micro-interactions)
- React Query (data fetching)

### Brand Guidelines

**Do**:
- Keep whitespace generous
- Use clear, descriptive labels
- Show progress explicitly
- Maintain consistent spacing
- Test with real content

**Don't**:
- Use decorative gradients
- Animate everything
- Hide navigation
- Use non-standard patterns
- Prioritize novelty over clarity