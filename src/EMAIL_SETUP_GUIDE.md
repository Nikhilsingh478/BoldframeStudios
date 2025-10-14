# EmailJS Setup & Contact Form Guide

## ✅ Current Configuration

The contact form is now **fully configured** and ready to send emails!

### 🔑 Credentials
- **Public Key**: `NwMPwoO6mOuR1IeSD`
- **Service ID**: `service_7ys7xff`
- **Admin Template**: `template_hl5a33o` (sends to nikhilwebworks@gmail.com)
- **Auto-Reply Template**: `template_tgqw9ag` (sends to user)

---

## 📧 How It Works

### When a user submits the contact form:

1. **User fills out form** with:
   - Name (required)
   - Email (required)
   - Phone (required)
   - Message (required)

2. **Two emails are sent automatically:**

   **Email 1: To Admin (nikhilwebworks@gmail.com)**
   - Subject: "Contact Us: New Contact Form Submission"
   - Contains all form data
   - Uses template: `template_hl5a33o`

   **Email 2: Auto-Reply to User**
   - Subject: "Contact Us: {{title}}"
   - Thank you message
   - Copy of their message
   - Uses template: `template_tgqw9ag`

3. **User sees success notification**
   - SweetAlert popup confirming message sent
   - Message: "We'll get back to you within 24 hours"
   - Instruction to check email for confirmation

---

## 🎨 User Experience Flow

### Success Flow:
```
User fills form → Clicks "Send Message" → 
Loading state → Both emails sent → 
Success popup appears → Form resets → Modal closes
```

### Error Handling:
- If EmailJS not loaded: Shows error with fallback email
- If network error: Shows retry message
- If fields empty: Browser validation prevents submission
- All errors shown via professional SweetAlert popup

---

## 📋 Template Variables

### Admin Template (template_hl5a33o)
Required variables:
- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{phone}}` - User's phone
- `{{message}}` - User's message
- `{{title}}` - Email subject
- `{{to_email}}` - Recipient (nikhilwebworks@gmail.com)

### Auto-Reply Template (template_tgqw9ag)
Required variables:
- `{{to_name}}` - User's name
- `{{to_email}}` - User's email (auto-reply recipient)
- `{{from_name}}` - "BoldFrame Studios"
- `{{message}}` - Original user message
- `{{reply_message}}` - Auto-generated thank you message

---

## 🔧 Template Setup in EmailJS Dashboard

### Admin Template Example:
```
Subject: Contact Us: {{title}}

New contact form submission from BoldFrame Studios website:

Name: {{name}}
Email: {{email}}
Phone: {{phone}}

Message:
{{message}}

---
Reply to this email to respond directly to the user.
```

### Auto-Reply Template Example:
```
Subject: Thank you for contacting BoldFrame Studios

Hi {{to_name}},

Thank you for contacting BoldFrame Studios! We have received your message and will get back to you within 24 hours.

Your message:
"{{message}}"

Best regards,
BoldFrame Studios Team

---
This is an automated confirmation email. Please do not reply to this email.
For urgent matters, contact us at nikhilwebworks@gmail.com
```

---

## 🛠️ Testing the Form

### Test Submission:
1. Fill out the contact form
2. Use a real email address (yours) for testing
3. Check:
   - ✅ Admin receives email at nikhilwebworks@gmail.com
   - ✅ User receives auto-reply confirmation
   - ✅ Success popup appears
   - ✅ Form resets

### Common Issues:

**Problem**: Emails not sending
- **Solution**: Check EmailJS dashboard for template IDs
- Verify public key is correct
- Ensure service is active

**Problem**: Auto-reply not working
- **Solution**: Check template_tgqw9ag exists
- Verify all template variables are mapped
- Check spam folder

**Problem**: Admin email not received
- **Solution**: Verify template_hl5a33o recipient email
- Check template variables match
- Look in spam folder

---

## 🌐 Direct Email Links

### Email Button:
Clicking "Email Us" in the floating contact button or footer opens the default email client with:
```
To: nikhilwebworks@gmail.com
Subject: (empty - user fills in)
Body: (empty - user fills in)
```

---

## 🎯 Form Validation

All fields are required:
- **Name**: Text input, no special requirements
- **Email**: Must be valid email format (browser validates)
- **Phone**: Text input (accepts any format)
- **Message**: Textarea, minimum text required

If any field is empty, browser prevents submission with native validation message.

---

## 📱 Mobile Optimization

- Form is fully responsive
- Touch-friendly input fields
- Proper keyboard types on mobile:
  - Email field: Shows @ keyboard
  - Phone field: Shows numeric keyboard
  - Text fields: Standard keyboard
- Modal adapts to screen size
- Success popups are mobile-optimized

---

## 🔐 Security

- ✅ Public key is safe to expose (client-side only)
- ✅ No API keys stored in code
- ✅ EmailJS handles rate limiting
- ✅ Form validation prevents empty submissions
- ⚠️ Consider adding reCAPTCHA for production to prevent spam

---

## 📊 Analytics (Optional)

You can track form submissions by:
1. Checking EmailJS dashboard for statistics
2. Adding Google Analytics events
3. Using form submission console logs (currently enabled)

Current console log format:
```javascript
{
  name: "User Name",
  email: "user@example.com",
  phone: "1234567890",
  message: "User message...",
  timestamp: "2025-10-14T11:51:45.682Z"
}
```

---

## ✨ Success!

Your contact form is now **fully functional** and sending real emails! 🎉

Test it out and verify both the admin email and auto-reply are working correctly.
