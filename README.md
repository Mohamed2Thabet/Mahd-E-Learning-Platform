# Mahd-E-Learning-Platform

Transform your future through modern education. **Mahd-E-Learning-Platform** is a comprehensive, full-featured online learning platform that connects students, instructors, and a global community through interactive courses, gamified learning, and collaborative tools.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Modern Landing Page**: Engaging hero section, popular courses, testimonials, and unique value propositions.
- **Authentication**: Email/password and Google OAuth login, registration, password reset, and secure token management.
- **Student Dashboard**: Personalized dashboard with enrolled courses, progress tracking, achievements, certificates, and learning schedule.
- **Instructor Dashboard**: Tools for course creation, analytics, earnings, and student management.
- **Course Catalog**: Advanced search, filtering, and sorting of courses by category, difficulty, and price.
- **Course Details & Player**: Rich course detail pages, video player, curriculum navigation, progress tracking, and interactive tabs.
- **Quizzes & Assessments**: Integrated quiz engine for self-assessment and progress validation.
- **Community**: Discussion forums, collaborative Q&A, and peer interaction.
- **Platform Insights**: Admin analytics dashboard with user stats, activity charts, and top courses.
- **Help Center**: Comprehensive support, FAQs, and categorized help articles.
- **Mobile & TV Support**: Downloadable app for learning on mobile, tablet, or TV.
- **Gamification**: Badges, certificates, and achievements to motivate learners.
- **Responsive & Accessible**: Fully responsive design with accessibility best practices.

---

## Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit, React Router, Styled Components, Bootstrap 5, AOS
- **State Management**: Redux Toolkit, React Context API
- **Forms & Validation**: React Hook Form, Zod
- **Authentication**: Custom API, Google OAuth
- **Payments**: Stripe integration
- **Email**: EmailJS
- **Icons**: React Icons, Lucide, Heroicons
- **Testing & Linting**: ESLint
- **Containerization**: Docker, Nginx
- **Other**: Swiper, Axios

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamed2thabet/Mahd-E-Learning-Platform.git
   cd Mahd-E-Learning-Platform
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## Usage

- **Development**: `npm run dev` — Starts the app with hot module reloading.
- **Build**: `npm run build` — Builds the app for production.
- **Preview**: `npm run preview` — Serves the production build locally.
- **Lint**: `npm run lint` — Runs ESLint on the codebase.
- **Deploy**: `npm run deploy` — Deploys to GitHub Pages (configured in `package.json`).

### Docker

To build and run the app in a Docker container:

```bash
docker build -t mahd-elearning .
docker run -p 80:80 mahd-elearning
```

---

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and media
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers (e.g., Theme)
│   ├── data/              # Static data
│   ├── pages/             # Main app pages (Home, Courses, Community, etc.)
│   ├── store/             # Redux slices and store config
│   ├── styles/            # Global and component styles
│   ├── utils/             # Utility functions
│   └── main.jsx           # App entry point
├── Dockerfile             # Docker build instructions
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## Deployment

- **Static Hosting**: The app is ready for static hosting (e.g., GitHub Pages, Netlify, Vercel).
- **Docker**: Use the provided Dockerfile for containerized deployments with Nginx.

---

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

---

## License

[MIT](LICENSE)

---

**Mahd-E-Learning-Platform** — Empowering modern learners and educators.
