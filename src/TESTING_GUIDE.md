# 🧪 FakeCheck Testing Guide

This guide helps you test all the error handling and validation features in the FakeCheck application.

## ✅ Validation Tests

### Phone Number Validation

**Valid Inputs (Should Work):**
- `+1 (555) 123-4567` - Standard US format
- `555-123-4567` - Basic format
- `5551234567` - No formatting
- `+44 20 7123 4567` - International format

**Invalid Inputs (Should Show Error):**
- ` ` (empty/spaces) - Error: "Phone number is required"
- `123` - Error: "Phone number is too short (minimum 7 digits)"
- `abc-def-ghij` - Error: "Phone number must contain at least 7 digits"
- `555@1234#567` - Error: "Phone number contains invalid characters"
- `12345678901234567890123` - Error: "Phone number is too long (maximum 20 characters)"

**Threat Detection Tests:**
- `555-0100` - Should be flagged as DANGEROUS
- `555-0199` - Should be flagged as DANGEROUS
- `+1-900-123-4567` - Should be flagged as SUSPICIOUS (premium rate)
- `000-000-0000` - Should be flagged as SUSPICIOUS
- `555-9876` - Should be flagged as SAFE

### Website URL Validation

**Valid Inputs (Should Work):**
- `https://example.com` - Standard HTTPS URL
- `http://example.com` - HTTP URL
- `example.com` - Auto-adds https://
- `www.example.com` - Auto-adds https://

**Invalid Inputs (Should Show Error):**
- ` ` (empty/spaces) - Error: "URL is required"
- `abc` - Error: "Please enter a valid URL"
- `ht://invalid` - Error: "Invalid URL format"
- A URL longer than 2048 characters - Error: "URL is too long"

**Threat Detection Tests:**
- `https://free-prize.com` - Should be flagged as DANGEROUS
- `https://urgent-verify.example.com` - Should be flagged as DANGEROUS
- `https://bit.ly/abc123` - Should be flagged as SUSPICIOUS (URL shortener)
- `http://example.com` - Should be SAFE but note HTTP warning
- `https://google.com` - Should be flagged as SAFE

### Message Validation

**Valid Inputs (Should Work):**
- Any text between 5-5000 characters
- `Hello, this is a test message` - Standard message
- Messages with URLs, numbers, special characters

**Invalid Inputs (Should Show Error):**
- ` ` (empty/spaces) - Error: "Message is required"
- `Test` - Error: "Message is too short (minimum 5 characters)"
- A message longer than 5000 characters - Error: "Message is too long"

**Threat Detection Tests:**
- `Click here now to verify your account!` - Should be flagged as DANGEROUS
- `Urgent action required - your account is suspended` - Should be flagged as DANGEROUS
- `Claim your prize immediately!` - Should be flagged as DANGEROUS
- `Limited time offer - act now!` - Should be flagged as SUSPICIOUS
- `Congratulations! You won!` - Should be flagged as SUSPICIOUS
- `Hello, how are you today?` - Should be flagged as SAFE

## 🔧 Error Handling Tests

### Network Error Simulation
The app has a 1% chance of simulating a network error. To test:
1. Keep checking items repeatedly
2. Eventually you'll see an error result
3. Toast notification should appear
4. Error details should be shown in results

### Empty Input Tests
1. Try submitting without entering anything
2. Validation should prevent submission
3. Error message should appear below input field

### Boundary Tests
**Phone Numbers:**
- Exactly 7 digits: `1234567` ✅ Should work
- Exactly 20 characters: `12345678901234567890` ✅ Should work
- 6 digits: `123456` ❌ Should fail
- 21 characters: `123456789012345678901` ❌ Should fail

**URLs:**
- Very long valid URL (test up to 2048 chars) ✅ Should work
- 2049+ characters ❌ Should fail

**Messages:**
- Exactly 5 characters: `Hello` ✅ Should work
- Exactly 5000 characters ✅ Should work
- 4 characters: `Test` ❌ Should fail
- 5001+ characters ❌ Should fail

## 🎯 UI/UX Tests

### Error Display
1. **Field-level errors** should show:
   - Red border on input field
   - Error alert below the field
   - Clear error message
   - Icon indicating error

2. **Toast notifications** should show:
   - Success toast when check completes
   - Error toast when check fails
   - Appropriate icons and colors

### Loading States
1. Submit a check
2. Button should show:
   - Loading spinner
   - "Analyzing..." / "Scanning..." text
   - Disabled state
3. Form inputs should be disabled during check

### Dark Mode Tests
1. Toggle theme between Light/Dark/System
2. All error messages should be visible
3. Colors should adjust appropriately
4. Contrast should remain readable

## 🛡️ Security Score Tests

Check that scores are properly displayed:
- **SAFE**: Score 80-100 (Green)
- **SUSPICIOUS**: Score 40-79 (Amber/Yellow)
- **DANGEROUS**: Score 0-39 (Red)

## 📱 Responsive Tests

Test on different screen sizes:
- **Desktop** (1920x1080): Full layout
- **Tablet** (768x1024): Medium layout
- **Mobile** (375x667): Compact layout

Error messages should:
- Be readable on all screens
- Not overflow containers
- Wrap text appropriately

## 🔄 Recent Checks Tests

1. Make multiple checks
2. Recent checks should update
3. Maximum 5 recent items shown
4. Each should show correct icon and timestamp

## ⚠️ Edge Cases to Test

### Special Characters
- Phone: `+1-555-123-4567 ext. 123` (should handle extensions)
- URL: `https://example.com/path?query=value&test=123` (query params)
- Message: Emojis, unicode, special symbols

### Copy-Paste
- Copy from email/text with extra whitespace
- Should trim and validate correctly

### Browser Refresh
- Make a check
- Refresh page
- Should restart cleanly (recent checks cleared)

### Multiple Tabs
- Open in multiple tabs
- Theme changes should sync (via localStorage)
- Each tab should work independently

## 🐛 Known Limitations

1. **Mock Data**: All analysis is client-side mock data
2. **Network Simulation**: Only 1% chance of error (for demo)
3. **No Real Backend**: No actual threat database connections
4. **Local Storage**: Theme persists, but checks don't

## 📊 Test Checklist

- [ ] Phone number validation (all cases)
- [ ] URL validation (all cases)
- [ ] Message validation (all cases)
- [ ] Threat detection patterns work
- [ ] Error messages display correctly
- [ ] Toast notifications appear
- [ ] Loading states work
- [ ] Dark mode compatibility
- [ ] Responsive on mobile
- [ ] Recent checks update
- [ ] Login/logout works
- [ ] Theme toggle works
- [ ] Error boundary catches crashes

## 🎓 For Developers

### Adding New Patterns

**To add dangerous phone patterns:**
```typescript
const dangerousPatterns = ['5550100', '5550199', '1900', 'YOUR_PATTERN'];
```

**To add phishing URL keywords:**
```typescript
const dangerousKeywords = ['free-prize', 'urgent-verify', 'YOUR_KEYWORD'];
```

**To add scam message phrases:**
```typescript
const dangerousKeywords = ['click here now', 'YOUR_PHRASE'];
```

### Error Logging

All errors are logged to console:
```javascript
console.error('Check error:', error);
```

In production, replace with proper error tracking (Sentry, LogRocket, etc.)

---

**Happy Testing! 🚀**

For issues or questions, check the console for detailed error logs.
