# 🛡️ FakeCheck - Advanced Threat Detection Platform

A powerful web application for detecting fake websites, spam phone numbers, and malicious messages with real-time analysis and threat intelligence.

## ✨ Features

### Core Threat Detection
- 📱 **Phone Number Verification** - Check if a phone number is associated with scams or spam
- 🌐 **Website Security Scanner** - Detect phishing sites and malicious URLs
- 💬 **Message Analysis** - Identify spam and phishing messages

### Advanced Validation (NEW!)
- ✅ **Real Existence Checking** - Validates if phone numbers and URLs actually exist
- 📊 **Detailed Metadata** - Country, carrier, registration dates, hosting info, and more
- 🔍 **Content Extraction** - Automatically finds URLs, emails, and phone numbers in messages
- 🏢 **Domain Intelligence** - SSL status, reputation scores, registrar info, and security scans
- 📈 **Spam Scoring** - Advanced algorithms calculate threat probability

### AI-Powered Analysis (NEW!)
- 🤖 **AI Assistant** - Interactive chatbot for security education and real-time help
- ⚡ **Real-Time Analysis** - Live feedback as you type with pattern detection
- 🧠 **Intelligent Recommendations** - Contextual advice based on threat type
- 🎯 **Advanced Pattern Matching** - 50+ threat detection patterns

### User Experience
- 🎨 **Dark Mode** - Beautiful light, dark, and system theme options
- 🔐 **User Authentication** - Secure login and signup system
- 📊 **Real-time Statistics** - Live threat detection metrics
- 💡 **Security Tips** - Educational content to stay safe online
- 🚩 **Community Reporting** - Report new threats to protect others
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Modern web browser

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Application will automatically open at `http://localhost:3000`
   - Or manually navigate to `http://localhost:3000`

### Demo Credentials

This is a demonstration app. You can login with any email and password:
- Email: `demo@fakecheck.com`
- Password: `anything`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📁 Project Structure

```
fakecheck/
├── src/
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                    # Entry point
│   ├── components/
│   │   ├── AIAssistant.tsx         # AI chatbot for security help
│   │   ├── AIAnalysisPanel.tsx     # Real-time threat analysis
│   │   ├── aiService.ts            # AI threat detection engine
│   │   ├── validationService.ts    # Validation & metadata extraction
│   │   ├── ValidationDetails.tsx   # Detailed validation display
│   │   ├── AuthContext.tsx         # Authentication logic
│   │   ├── CheckForm.tsx           # Threat checking form
│   │   ├── ResultsDisplay.tsx      # Results presentation
│   │   ├── LoginPage.tsx           # Login interface
│   │   ├── SignupPage.tsx          # Registration interface
│   │   ├── ThemeProvider.tsx       # Theme management
│   │   └── ui/                     # Reusable UI components
│   └── styles/
│       └── globals.css             # Global styles
├── VALIDATION_FEATURES.md          # Validation features documentation
├── index.html                      # HTML template
├── package.json                   # Dependencies
└── vite.config.ts                # Vite configuration
```

## 🎨 Themes

Switch between Light, Dark, and System themes using the theme toggle in the header.

## 📖 Documentation

- **[VALIDATION_FEATURES.md](VALIDATION_FEATURES.md)** - Complete guide to validation features and metadata
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing instructions and example inputs
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Full project documentation
- **[ERROR_HANDLING_IMPROVEMENTS.md](ERROR_HANDLING_IMPROVEMENTS.md)** - Error handling details

## 🧪 Example Test Inputs

### Phone Numbers
- `+1 (555) 123-4567` - Test number (spoofed)
- `+1 (800) 555-1234` - Toll-free pattern (spam)
- `+1 (212) 555-0100` - NYC number (suspicious)

### URLs
- `https://paypa1-verify-account.tk` - Phishing attempt
- `http://urgent-action-required.com` - No SSL + urgent keywords
- `https://example.com` - Clean domain

### Messages
```
"URGENT! Your account has been suspended. Click here immediately: http://fake-bank.com to verify your identity and password."
```
(Contains: urgency, phishing keywords, suspicious URL, requests credentials)

## 🔒 Security Note

**Important:** This is a demonstration application for educational purposes. For production use:
- Implement real backend authentication
- Connect to actual threat databases
- Add proper data validation and sanitization
- Use secure API endpoints
- Implement rate limiting
- Never store sensitive user data without proper encryption

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demo project, but feel free to fork and customize for your needs!

## ⚠️ Disclaimer

FakeCheck is a demonstration tool. Always verify threats with multiple trusted sources and official channels. Do not use this for collecting personally identifiable information (PII) or securing sensitive data in production environments.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
