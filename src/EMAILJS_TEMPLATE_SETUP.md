# EmailJS Template Setup Guide

## 🚨 IMPORTANT: Template Configuration Required

You need to configure **TWO templates** in your EmailJS dashboard for the contact form to work properly.

---

## 📧 Template 1: Admin Notification

**Template ID:** `template_hl5a33o`

### Purpose
This email is sent to YOU (admin) when someone submits the contact form.

### Template Configuration in EmailJS Dashboard

#### To Email
In the EmailJS dashboard, set the **To Email** field to:
```
{{to_email}}
```

#### Email Subject
```
New Contact Form Submission from Boldframe Studios
```

#### Email Content
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0F1316; color: #E6EEF3;">
  <h2 style="color: #5B3CFF; margin-bottom: 20px;">🎯 New Project Inquiry</h2>
  
  <p style="color: #98A3AA; margin-bottom: 30px;">You have received a new contact form submission from the Boldframe Studios website.</p>
  
  <div style="background-color: #0B0D0F; padding: 20px; border-radius: 8px; border-left: 4px solid #5B3CFF;">
    <p style="margin: 10px 0;"><strong style="color: #67E8F9;">Name:</strong> {{from_name}}</p>
    <p style="margin: 10px 0;"><strong style="color: #67E8F9;">Email:</strong> {{from_email}}</p>
    <p style="margin: 10px 0;"><strong style="color: #67E8F9;">Phone:</strong> {{phone}}</p>
    <p style="margin: 10px 0;"><strong style="color: #67E8F9;">Message:</strong></p>
    <p style="margin: 10px 0; padding: 15px; background-color: rgba(91, 60, 255, 0.1); border-radius: 4px;">{{message}}</p>
  </div>
  
  <p style="margin-top: 30px; color: #7C8A96; font-size: 14px;">
    Reply directly to this email to contact the client at: {{reply_to}}
  </p>
  
  <hr style="border: none; border-top: 1px solid #7C8A96; margin: 30px 0;">
  
  <p style="color: #7C8A96; font-size: 12px; text-align: center;">
    Sent from Boldframe Studios Contact Form
  </p>
</div>
```

#### Template Variables
Make sure these variables are mapped:
- `{{to_email}}` → nikhilwebworks@gmail.com (set in template settings)
- `{{from_name}}` → Client's name
- `{{from_email}}` → Client's email
- `{{phone}}` → Client's phone number
- `{{message}}` → Client's message
- `{{reply_to}}` → Client's email (for reply-to header)

---

## 📧 Template 2: Client Auto-Reply

**Template ID:** `template_tgqw9ag`

### Purpose
This email is automatically sent to the USER who submitted the form as a confirmation/thank you message.

### Template Configuration in EmailJS Dashboard

#### To Email
In the EmailJS dashboard, set the **To Email** field to:
```
{{to_email}}
```

#### Email Subject
```
Thank you for contacting Boldframe Studios! 🎨
```

#### Email Content
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0F1316; color: #E6EEF3;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #5B3CFF; margin: 0; font-size: 32px;">BoldFrame Studios</h1>
    <p style="color: #67E8F9; margin: 5px 0;">Craft. Move. Convert.</p>
  </div>
  
  <div style="background: linear-gradient(135deg, rgba(91, 60, 255, 0.2), rgba(103, 232, 249, 0.2)); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
    <h2 style="color: #E6EEF3; margin-top: 0;">Hi {{to_name}},</h2>
    
    <p style="color: #E6EEF3; line-height: 1.6;">
      Thank you for contacting <strong style="color: #67E8F9;">Boldframe Studios</strong>! 🚀
    </p>
    
    <p style="color: #E6EEF3; line-height: 1.6;">
      We've received your message and our team will reach out to you within <strong style="color: #67E8F9;">24 hours</strong>.
    </p>
    
    <p style="color: #E6EEF3; line-height: 1.6;">
      We're excited to learn more about your project and explore how we can bring your vision to life!
    </p>
  </div>
  
  <div style="background-color: #0B0D0F; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
    <h3 style="color: #67E8F9; margin-top: 0;">What happens next?</h3>
    <ul style="color: #98A3AA; line-height: 1.8; padding-left: 20px;">
      <li>Our team reviews your project details</li>
      <li>We'll prepare initial ideas and questions</li>
      <li>You'll receive a personalized response within 24 hours</li>
      <li>We'll schedule a call to discuss your project in detail</li>
    </ul>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <p style="color: #E6EEF3; margin-bottom: 10px;">Have an urgent question?</p>
    <a href="mailto:nikhilwebworks@gmail.com" style="display: inline-block; padding: 12px 30px; background: linear-gradient(90deg, #5B3CFF, #7055ff); color: #E6EEF3; text-decoration: none; border-radius: 8px; font-weight: 600;">
      Email Us Directly
    </a>
  </div>
  
  <hr style="border: none; border-top: 1px solid #7C8A96; margin: 30px 0;">
  
  <div style="text-align: center;">
    <p style="color: #E6EEF3; margin-bottom: 15px; font-weight: 600;">
      Warm regards,<br>
      Nikhil Singh<br>
      <span style="color: #67E8F9;">Founder, Boldframe Studios</span>
    </p>
    
    <div style="margin-top: 20px;">
      <a href="https://github.com/Nikhilsingh478" style="color: #67E8F9; text-decoration: none; margin: 0 10px;">GitHub</a>
      <a href="https://www.linkedin.com/in/nikhilsingh14788" style="color: #67E8F9; text-decoration: none; margin: 0 10px;">LinkedIn</a>
      <a href="https://www.instagram.com/webdevw_nikhil" style="color: #67E8F9; text-decoration: none; margin: 0 10px;">Instagram</a>
    </div>
  </div>
  
  <p style="color: #7C8A96; font-size: 12px; text-align: center; margin-top: 30px;">
    This is an automated confirmation email.<br>
    Please do not reply to this email. For inquiries, contact us at nikhilwebworks@gmail.com
  </p>
</div>
```

#### Template Variables
Make sure these variables are mapped:
- `{{to_email}}` → Client's email (recipient)
- `{{to_name}}` → Client's name
- `{{from_name}}` → "BoldFrame Studios"
- `{{reply_to}}` → nikhilwebworks@gmail.com

---

## ⚙️ Step-by-Step Setup in EmailJS Dashboard

### For Both Templates:

1. **Go to EmailJS Dashboard** → https://dashboard.emailjs.com/
2. **Click "Email Templates"** in the left sidebar
3. **Find your template** by ID (`template_hl5a33o` or `template_tgqw9ag`)
4. **Click "Edit"**

### Important Settings:

#### Service
Make sure it's connected to: `service_7ys7xff`

#### To Email Field
**This is crucial!** Set it to: `{{to_email}}`

This allows the code to dynamically set the recipient email address.

#### From Name
- Admin template: `"{{from_name}}" (via Boldframe Studios)`
- Client template: `"Boldframe Studios"`

#### Reply-To
- Admin template: `{{reply_to}}` (so you can reply directly to the client)
- Client template: `nikhilwebworks@gmail.com`

#### Subject Line
- Admin template: `New Contact Form Submission from Boldframe Studios`
- Client template: `Thank you for contacting Boldframe Studios! 🎨`

---

## 🧪 Testing the Setup

After configuring the templates:

1. **Fill out the contact form** on your website
2. **Check both email inboxes:**
   - Admin email: nikhilwebworks@gmail.com should receive notification
   - Client email: The email you entered in the form should receive auto-reply

3. **Check console logs** for debugging:
   ```
   📧 Sending emails...
   ✅ Admin email sent: {status: 200, text: 'OK'}
   ✅ Client auto-reply sent: {status: 200, text: 'OK'}
   🎉 All emails sent successfully!
   ```

4. **Verify spam folders** if emails don't appear

---

## 🐛 Troubleshooting

### Error: "The recipients address is empty"
**Solution:** Make sure the "To Email" field in the EmailJS template is set to `{{to_email}}`

### Error: "Template not found"
**Solution:** Verify the template IDs match exactly:
- `template_hl5a33o` (admin)
- `template_tgqw9ag` (client)

### Emails not arriving
**Solutions:**
1. Check spam/junk folders
2. Verify service ID: `service_7ys7xff`
3. Check EmailJS dashboard for delivery logs
4. Make sure your EmailJS account email is verified

### Only one email sends
**Solution:** Check console logs to see which one failed. Verify both templates are configured correctly.

---

## 📋 Template Variable Mapping

### What the code sends:

```javascript
// Admin email variables
{
  to_email: 'nikhilwebworks@gmail.com',
  from_name: formData.name,
  from_email: formData.email,
  phone: formData.phone || 'Not provided',
  message: formData.message,
  reply_to: formData.email,
}

// Client email variables
{
  to_email: formData.email,
  to_name: formData.name,
  from_name: 'BoldFrame Studios',
  reply_to: 'nikhilwebworks@gmail.com',
}
```

### What the templates should use:

**Admin Template:**
- `{{to_email}}` → nikhilwebworks@gmail.com
- `{{from_name}}` → Client's name
- `{{from_email}}` → Client's email
- `{{phone}}` → Client's phone
- `{{message}}` → Client's message
- `{{reply_to}}` → Client's email

**Client Template:**
- `{{to_email}}` → Client's email
- `{{to_name}}` → Client's name
- `{{from_name}}` → "BoldFrame Studios"
- `{{reply_to}}` → nikhilwebworks@gmail.com

---

## ✅ Checklist

Before testing:
- [ ] Service `service_7ys7xff` is active
- [ ] Admin template `template_hl5a33o` exists and is configured
- [ ] Client template `template_tgqw9ag` exists and is configured
- [ ] Both templates have "To Email" set to `{{to_email}}`
- [ ] All template variables are mapped correctly
- [ ] EmailJS public key is loaded in the website
- [ ] SweetAlert2 is loaded for success/error popups

---

## 🎉 Success!

Once everything is configured correctly:
- ✅ User submits form
- ✅ Admin receives detailed notification
- ✅ Client receives thank you email
- ✅ Success popup shows
- ✅ Form resets and closes

**Your contact form is now fully functional!** 🚀
