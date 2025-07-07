# InterviewOS

A modern, React-based static website for technical interview preparation. Built with a clean, IBM-inspired design featuring a resizable sidebar navigation and comprehensive technical content.

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Resizable Sidebar**: Adjustable width sidebar for optimal viewing experience
- **Expandable Navigation**: Hierarchical topic and subtopic organization
- **Modern Typography**: IBM Plex fonts for professional appearance
- **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Top navigation header
│   ├── Sidebar.js         # Expandable topic navigation
│   ├── ContentPanel.js    # Main content display area
│   └── ResizablePanel.js  # Resizable panel container
├── data/
│   └── sampleData.js      # Sample content data
├── App.js                 # Main application component
└── index.js              # React entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TechNotes2InterviewOS.git
cd TechNotes2InterviewOS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
```json
"homepage": "https://yourusername.github.io/TechNotes2InterviewOS"
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Customization

### Adding New Content

Edit `src/data/sampleData.js` to add new topics and subtopics:

```javascript
{
  id: 'new-topic',
  title: 'New Topic',
  subtopics: [
    {
      id: 'subtopic-1',
      title: 'Subtopic Title',
      content: `<h2>Your HTML content here</h2>`
    }
  ]
}
```

### Styling

The project uses CSS modules and follows IBM Design System principles:
- Colors: IBM's color palette
- Typography: IBM Plex font family
- Spacing: Consistent 8px grid system

## Technology Stack

- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with IBM Design System inspiration
- **IBM Plex Fonts**: Professional typography
- **GitHub Pages**: Static site hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Search functionality
- Dark mode support
- Content filtering
- Progress tracking
- Interactive code examples
- Mobile app version 