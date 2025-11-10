# 🛡️ FakeCheck - Complete Project Documentation

## 📊 Project Overview

**FakeCheck** is a comprehensive threat detection platform designed to help users identify:
- 🚫 Fake/phishing websites
- 📱 Spam phone numbers
- 💬 Malicious messages and SMS

### Key Highlights
- **Technology Stack**: React 18 + TypeScript + Tailwind CSS 4
- **Build Tool**: Vite 5.4.9
- **UI Framework**: Radix UI (shadcn/ui components)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Authentication**: Mock authentication system (demo purposes)
- **Theme Support**: Light, Dark, and System themes
- **Color Scheme**: Red-Orange gradient (security/alert focused)

---

## 🏗️ Architecture Overview

### Project Structure

```
fakecheck/
├── 📁 src/                      # Source files (entry point)
│   ├── App.tsx                  # Main app component (actual used file)
│   └── main.tsx                 # React entry point
│
├── 📁 components/               # All React components
│   ├── AuthContext.tsx          # Authentication state management
│   ├── CheckForm.tsx            # Main threat checking form
│   ├── ExampleThreats.tsx       # Interactive test examples
│   ├── LoginPage.tsx            # Login interface
│   ├── SignupPage.tsx           # Registration interface
│   ├── PhoneChecker.tsx         # Phone number verification
│   ├── WebsiteChecker.tsx       # URL/website scanner
│   ├── ResultsDisplay.tsx       # Threat analysis results
│   ├── RecentChecks.tsx         # Check history sidebar
│   ├── ReportThreat.tsx         # Community reporting
│   ├── SecurityTips.tsx         # Educational content
│   ├── StatsPanel.tsx           # Live statistics dashboard
│   ├── ThemeProvider.tsx        # Theme context provider
│   ├── ThemeToggle.tsx          # Theme switcher component
│   │
│   ├── 📁 ui/                   # shadcn/ui components (50+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tabs.tsx
│   │   └── ... (and many more)
│   │
│   └── 📁 figma/
│       └── ImageWithFallback.tsx # Protected image component
│
├── 📁 styles/
│   └── globals.css              # Global styles + Tailwind config
│
├── 📁 guidelines/               # Development guidelines
│   └── Guidelines.md
│
├── 📄 index.html                # HTML template
├── 📄 package.json              # Dependencies & scripts
├── 📄 vite.config.ts            # Vite configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 README.md                 # Quick start guide
└── 📄 Attributions.md           # Credits & licenses
```

### Important Note
⚠️ There are two `App.tsx` files:
- `/App.tsx` - Legacy/backup file (not used)
- `/src/App.tsx` - **Active file** used by Vite (defined in main.tsx)

---

## 🔄 Application Flow

### 1. Entry Point Flow
```
index.html
    ↓
src/main.tsx (imports styles & App)
    ↓
src/App.tsx (root component)
    ↓
Wraps with: ThemeProvider → AuthProvider → AppContent
```

### 2. Authentication Flow
```
User visits app
    ↓
Check isAuthenticated (from AuthContext)
    ↓
    ├─→ FALSE: Show LoginPage or SignupPage
    │           ↓
    │       User enters credentials (any credentials work for demo)
    │           ↓
    │       Call login() from AuthContext
    │           ↓
    │       Store user in localStorage
    │           ↓
    │       Update isAuthenticated = true
    │
    └─→ TRUE: Show Dashboard
                ↓
            Display main threat detection interface
```

### 3. Threat Checking Flow
```
User selects check type (Phone/URL/Message)
    ↓
Enter input in CheckForm component
    ↓
Click "Analyze Threat"
    ↓
handleCheck() function called
    ↓
Simulate API call (1.5s delay)
    ↓
analyzeInput() runs threat detection logic
    ↓
Generate CheckResult object:
    - threatLevel: 'safe' | 'suspicious' | 'dangerous'
    - score: 0-100
    - details: array of findings
    - timestamp
    ↓
Display ResultsDisplay component
    ↓
Add to RecentChecks history
```

---

## 🧩 Component Breakdown

### Core Components

#### 1. **App.tsx** (`/src/App.tsx`)
- **Purpose**: Root application component
- **Responsibilities**:
  - Wraps app with ThemeProvider and AuthProvider
  - Routes between login/signup and dashboard
  - Manages global state for checks and results
  - Coordinates all child components
- **Key Functions**:
  - `handleCheck()`: Processes threat analysis requests
  - `analyzeInput()`: Mock threat detection algorithm
  - `handleTestExample()`: Loads example threats

#### 2. **AuthContext.tsx**
- **Purpose**: Global authentication state management
- **Features**:
  - React Context API for auth state
  - localStorage persistence
  - Mock login (accepts any credentials)
  - User session management
- **Exported**:
  - `AuthProvider`: Wraps app
  - `useAuth()`: Hook to access auth state
  - Methods: `login()`, `signup()`, `logout()`

#### 3. **ThemeProvider.tsx**
- **Purpose**: Dark mode & theme management
- **Themes**: Light, Dark, System (auto)
- **Features**:
  - localStorage persistence
  - System preference detection
  - CSS class toggling on `<html>` element
- **Exported**:
  - `ThemeProvider`: Wraps app
  - `useTheme()`: Hook to access theme

#### 4. **CheckForm.tsx**
- **Purpose**: Main threat input form
- **Features**:
  - 3 check types: Phone, URL, Message
  - Tabbed interface
  - Input validation
  - Loading states
  - Dark mode support
- **Props**:
  - `onCheck(type, input)`: Callback when user submits
  - `isChecking`: Loading state

#### 5. **ResultsDisplay.tsx**
- **Purpose**: Shows threat analysis results
- **Features**:
  - Color-coded threat levels (green/amber/red)
  - Score visualization (0-100)
  - Detailed findings list
  - Animated appearance
  - Share functionality
- **Props**:
  - `result`: CheckResult object

#### 6. **StatsPanel.tsx**
- **Purpose**: Live statistics dashboard
- **Displays**:
  - Total threats blocked
  - Active users
  - Scans performed today
  - Real-time updates
- **Features**:
  - Animated counters
  - Gradient backgrounds
  - Icon indicators

#### 7. **RecentChecks.tsx**
- **Purpose**: History of user's checks
- **Features**:
  - Shows last 5 checks
  - Color-coded by threat level
  - Timestamp display
  - Empty state handling
- **Props**:
  - `checks`: Array of CheckResult

#### 8. **ExampleThreats.tsx**
- **Purpose**: Interactive test examples
- **Features**:
  - Pre-configured threat examples
  - One-click testing
  - Educational tooltips
  - Categorized examples
- **Props**:
  - `onTestExample(type, example)`: Click handler

#### 9. **SecurityTips.tsx**
- **Purpose**: Educational content
- **Features**:
  - Accordion interface
  - Security best practices
  - Visual icons
  - Expandable sections

#### 10. **ReportThreat.tsx**
- **Purpose**: Community threat reporting
- **Features**:
  - Form for reporting new threats
  - Input validation
  - Toast notifications
  - Thank you messages

#### 11. **LoginPage.tsx & SignupPage.tsx**
- **Purpose**: Authentication UI
- **Features**:
  - Modern gradient design
  - Form validation
  - Error handling
  - Switch between login/signup
  - Social login mockups
  - Dark mode support

#### 12. **ThemeToggle.tsx**
- **Purpose**: Theme switcher button
- **Features**:
  - Dropdown with 3 options
  - Icons for each theme
  - Persistent selection

---

## 🎨 Design System

### Color Palette

#### Light Mode
```css
Primary:     Red-Orange gradient (#DC2626 → #EA580C)
Background:  Slate-50 → Blue-50 → Indigo-50
Cards:       White with slate-200 borders
Text:        Slate-900 (primary), Slate-600 (secondary)
```

#### Dark Mode
```css
Primary:     Red-Orange gradient (same)
Background:  Slate-950 → Blue-950 → Indigo-950
Cards:       Slate-900 with slate-800 borders
Text:        White (primary), Slate-400 (secondary)
```

### Threat Level Colors
- **Safe**: Green (#16A34A)
- **Suspicious**: Amber (#D97706)
- **Dangerous**: Red (#DC2626)

### Typography
Defined in `styles/globals.css`:
- Headings: Bold, larger sizes
- Body: Regular weight
- Small text: xs size for metadata

---

## 🔒 Authentication System

### How It Works
```typescript
// Mock authentication - accepts any credentials
const login = (email: string, password: string) => {
  // No actual validation for demo
  const user = {
    id: '1',
    name: email.split('@')[0],
    email: email
  };
  
  setUser(user);
  localStorage.setItem('fakecheck-user', JSON.stringify(user));
};
```

### Storage
- **Key**: `fakecheck-user`
- **Location**: localStorage
- **Data**: `{ id, name, email }`

### Protected Routes
```typescript
if (!isAuthenticated) {
  return <LoginPage />; // or SignupPage
}
return <Dashboard />;
```

---

## 🎯 Threat Detection Logic

### Algorithm Overview
The `analyzeInput()` function uses pattern matching:

#### Phone Number Detection
```typescript
Dangerous patterns:
- '555-0100', '555-0199' → Known scam numbers
- '+1-900' → Premium rate scams
- Score: 15/100

Suspicious patterns:
- '555-01xx' → Unusual patterns
- '000-000-xxxx' → Invalid formats
- Score: 45/100

Safe:
- Everything else
- Score: 95/100
```

#### URL Detection
```typescript
Dangerous keywords:
- 'free-prize', 'urgent-verify'
- 'account-suspended', 'click-here-now'
- Mimics legitimate services
- Score: 10/100

Suspicious:
- URL shorteners (bit.ly, tinyurl)
- Unknown redirects
- Score: 50/100

Safe:
- Valid SSL, clean scan
- Score: 95/100
```

#### Message Detection
```typescript
Dangerous phrases:
- "click here now"
- "verify your account"
- "suspended"
- "urgent action required"
- Score: 20/100

Suspicious:
- "limited time", "act now"
- Marketing pressure tactics
- Score: 55/100
```

### Result Format
```typescript
interface CheckResult {
  id: string;              // Random generated ID
  type: 'phone' | 'url' | 'message';
  input: string;           // User's input
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;           // 0-100 (higher = safer)
  details: string[];       // Array of findings
  timestamp: Date;         // Check time
}
```

---

## 🎭 Theme System

### Implementation
```typescript
// ThemeProvider stores theme in state + localStorage
const [theme, setTheme] = useState<Theme>(() => {
  return (localStorage.getItem('fakecheck-theme') as Theme) || 'system';
});

// Apply theme to DOM
useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}, [theme]);
```

### Usage in Components
```typescript
// Tailwind dark: prefix
className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
```

---

## 📦 Dependencies Explained

### Core Dependencies
| Package | Purpose | Version |
|---------|---------|---------|
| react | UI framework | 18.3.1 |
| react-dom | React renderer | 18.3.1 |
| typescript | Type safety | 5.6.2 |
| vite | Build tool | 5.4.9 |
| tailwindcss | Styling | 4.0.0 |

### UI Components
| Package | Purpose |
|---------|---------|
| lucide-react | Icon library (500+ icons) |
| @radix-ui/* | Accessible UI primitives |
| recharts | Chart components |
| sonner | Toast notifications |
| react-hook-form | Form management |

### Utilities
| Package | Purpose |
|---------|---------|
| clsx | Conditional classNames |
| tailwind-merge | Merge Tailwind classes |
| class-variance-authority | Component variants |
| date-fns | Date formatting |

---

## 🚀 Running the Project

### Development
```bash
npm install        # Install dependencies (first time)
npm run dev        # Start dev server on port 3000
```

### Production Build
```bash
npm run build      # Build for production → /dist folder
npm run preview    # Preview production build
```

### Linting
```bash
npm run lint       # Check code quality
```

---

## 📂 File Import Paths

### Current Configuration
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': '/src',
  }
}
```

### Import Examples
```typescript
// From src/main.tsx
import App from './App';                    // Same directory
import './styles/globals.css';              // From root

// From src/App.tsx
import { Button } from './components/ui/button';    // Relative
import { useAuth } from './components/AuthContext'; // Relative
import { ThemeProvider } from './components/ThemeProvider';
```

**Note**: All imports in `/src/App.tsx` use `./components/` because components are at the root level, not inside `/src/`.

---

## 🔍 Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│           index.html (entry)                │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│           src/main.tsx                      │
│   - Imports globals.css                     │
│   - Imports App component                   │
│   - Renders to #root                        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         src/App.tsx (Root)                  │
│                                             │
│   ThemeProvider                             │
│     └─ AuthProvider                         │
│          └─ Toaster                         │
│               └─ AppContent                 │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
┌──────────────┐   ┌──────────────┐
│  LoginPage   │   │  Dashboard   │
│  SignupPage  │   │              │
└──────────────┘   └──────┬───────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
  ┌──────────┐     ┌───────────┐    ┌──────────┐
  │ Header   │     │  Main     │    │  Footer  │
  │ - Logo   │     │  Content  │    │          │
  │ - Theme  │     │           │    │          │
  │ - Logout │     │           │    │          │
  └──────────┘     └─────┬─────┘    └──────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐    ┌────────────┐   ┌───────────┐
  │StatsPanel│    │ CheckForm  │   │ RecentChks│
  └──────────┘    │     ↓      │   │           │
                  │ Results    │   │ Examples  │
                  └────────────┘   └───────────┘
                         │
                         ▼
                  ┌────────────┐
                  │SecurityTips│
                  │ReportThreat│
                  └────────────┘
```

---

## 🧪 Testing the Application

### Demo Credentials
**Any email and password works** for demo purposes.

Example:
```
Email: test@example.com
Password: password123
```

### Test Cases

#### 1. Phone Number Tests
```
DANGEROUS:
- 555-0100
- 555-0199
- +1-900-555-0100

SUSPICIOUS:
- 555-0150
- 000-000-0000

SAFE:
- 123-456-7890
- +1-555-1234
```

#### 2. URL Tests
```
DANGEROUS:
- http://free-prize.com
- https://urgent-verify.net
- http://account-suspended.com

SUSPICIOUS:
- https://bit.ly/suspicious
- http://tinyurl.com/xyz

SAFE:
- https://google.com
- https://github.com
```

#### 3. Message Tests
```
DANGEROUS:
"Click here now to verify your account - urgent action required!"

SUSPICIOUS:
"Congratulations! Limited time offer - act now!"

SAFE:
"Hi, how are you doing today?"
```

---

## 🎨 Customization Guide

### Change Brand Colors
Edit `styles/globals.css`:
```css
/* Find and replace gradient colors */
.bg-gradient-to-br {
  /* Current: from-red-600 to-orange-600 */
  /* Change to your colors */
  background-image: linear-gradient(to bottom right, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Add New Check Type
1. Update type in App.tsx:
   ```typescript
   type CheckType = 'phone' | 'url' | 'message' | 'email'; // Add 'email'
   ```
2. Add tab in CheckForm.tsx
3. Add detection logic in analyzeInput()

### Modify Threat Thresholds
```typescript
// In analyzeInput() function
if (score < 30) {
  threatLevel = 'dangerous';  // Adjust threshold
} else if (score < 60) {
  threatLevel = 'suspicious'; // Adjust threshold
}
```

---

## 🔐 Security Considerations

### Current Implementation (Demo Only)
⚠️ **This is a DEMONSTRATION project**

**Security limitations**:
- ❌ No real authentication
- ❌ Credentials stored in localStorage (unencrypted)
- ❌ No backend validation
- ❌ Mock threat detection
- ❌ No rate limiting
- ❌ No CSRF protection

### For Production Use
✅ **Required changes**:
1. **Backend API**: Node.js/Python/Go server
2. **Real Authentication**: JWT tokens, OAuth
3. **Database**: PostgreSQL/MongoDB for threat data
4. **API Integration**: Connect to real threat databases
5. **Encryption**: HTTPS, encrypted storage
6. **Validation**: Server-side input sanitization
7. **Rate Limiting**: Prevent abuse
8. **Monitoring**: Error tracking, analytics

---

## 📊 Performance Optimization

### Current Optimizations
- ✅ Vite for fast builds
- ✅ Code splitting (automatic)
- ✅ CSS purging (Tailwind)
- ✅ React 18 concurrent features
- ✅ localStorage caching

### Future Improvements
- [ ] Lazy load components
- [ ] Image optimization
- [ ] Service worker for offline
- [ ] Virtual scrolling for large lists
- [ ] Debounce input validation

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use
```bash
# Edit vite.config.ts
server: {
  port: 3001,  // Change port
}
```

#### 2. Import Errors
```bash
# Check file paths - use relative imports
import { Button } from './components/ui/button';  // ✅
import { Button } from 'components/ui/button';    // ❌
```

#### 3. Dark Mode Not Working
```typescript
// Check html element has class
document.documentElement.classList.contains('dark'); // Should be true
```

#### 4. Login Not Persisting
```javascript
// Clear localStorage and try again
localStorage.removeItem('fakecheck-user');
```

---

## 📈 Future Enhancements

### Planned Features
1. **Real-time Collaboration**: Multiple users can review threats together
2. **Browser Extension**: Quick threat checks from any page
3. **Mobile Apps**: iOS and Android versions
4. **API Access**: Developer API for integrations
5. **Premium Features**: Advanced threat intelligence
6. **ML Integration**: Machine learning for better detection
7. **Reporting Dashboard**: Analytics and insights
8. **Community Features**: User ratings, comments

### Potential Integrations
- Google Safe Browsing API
- VirusTotal API
- PhishTank database
- WHOIS lookup
- SSL certificate validation
- Domain age checking

---

## 📝 Contributing

### Development Workflow
1. Clone repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive comments
- Keep components small and focused

---

## 📄 License & Attribution

See `Attributions.md` for:
- Open source licenses
- Third-party components
- Icon attributions
- Design credits

---

## 🆘 Support

### Resources
- **Documentation**: This file
- **README**: Quick start guide
- **Guidelines**: Development standards

### Contact
For questions or issues, refer to the project repository.

---

## 🎯 Quick Reference

### Key Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development
npm run build       # Build for production
npm run preview     # Preview build
```

### Key Files
- **Entry**: `src/main.tsx`
- **Root**: `src/App.tsx`
- **Styles**: `styles/globals.css`
- **Config**: `vite.config.ts`

### Key Concepts
- **Authentication**: AuthContext (mock)
- **Theme**: ThemeProvider (light/dark/system)
- **Checks**: analyzeInput() function
- **UI**: shadcn/ui + Tailwind CSS

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
**Status**: Production-ready (for demonstration purposes)

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*
