# Theme toggle

## Goal

Let visitors choose the website theme explicitly instead of deriving it from
the operating system's `prefers-color-scheme` setting.

## Requirements

- The website provides a Light/Dark toggle in the existing fixed controls area.
- Dark is the initial theme when no saved choice exists.
- Selecting a theme updates the entire website, including the animated
  background and controls.
- The selected theme is saved in `localStorage` and restored on later visits.
- The implementation does not read or react to `prefers-color-scheme`.
- The toggle is keyboard accessible and exposes its current state through
  `aria-pressed`.
- The toggle label and accessible name are translated in English and
  Portuguese.
- A footer notice explains that only the theme preference is stored in local
  storage and that no personal data is collected or stored.
- Design-wise, the toggle should be a pill with two icons representing the light and dark themes, with the active theme icon highlighted. There should be no text visible, but the toggle should have an accessible name for screen readers.

## Acceptance scenarios

### Choose light theme

Given a visitor has no saved theme choice,
when they activate the theme toggle,
then the document theme becomes `light`, the toggle reports `aria-pressed="true"`,
and the light theme is visible.

### Choose dark theme

Given the light theme is active,
when the visitor activates the theme toggle,
then the document theme becomes `dark`, the toggle reports
`aria-pressed="false"`, and the dark theme is visible.

### Restore a saved choice

Given `localStorage` contains the saved light theme,
when the visitor opens the website,
then the document restores the light theme and the toggle reports
`aria-pressed="true"`.

### Explain local storage usage

Given a visitor views any page,
then the footer displays a notice explaining that only the selected theme
preference is stored in local storage and that no personal data is collected or
stored.
