# Quick Start Guide - Manuel du Plombier

## How to Run

```bash
cd c:\Users\Jerem\carnet-plomberie
npm run dev
```

Then open browser to: **http://localhost:5174** (or the URL shown in terminal)

---

## First Launch - What You'll See

### 1. Home Page 🏠
You'll see a beautiful home page with:
- **Title:** 📘 Manuel Plomberie & Chauffage
- **Two Buttons:**
  - **👤 Mode Visiteur** (Read-only access)
  - **🔐 Mode Admin** (With password)

---

## Using Visitor Mode

1. **Click "👤 Mode Visiteur"**
2. You'll see the main app interface with:
   - **Header** with search, gallery, dark mode button
   - **Menu button** (☰) to browse categories
   - **Main content area** showing categories/modules
   - **Gallery sidebar** showing all images

3. **What you can do:**
   - ✅ Browse all content
   - ✅ Search categories/modules
   - ✅ View images in gallery
   - ✅ Toggle dark/light mode
   - ❌ Cannot edit/create content
   - ❌ Edit button won't appear

---

## Using Admin Mode

### Step 1: Login
1. **Click "🔐 Mode Admin"** on home page
2. **Login modal appears**
3. **Enter password:** `ITSTIEC2026`
4. **Click "✓ Valider"** to login

### Step 2: Unlock Edit Mode
1. **Click the edit button** (🔒) in header
2. Button changes to **✏️** (edit mode active)
3. **Edit buttons now visible** on all categories/modules

### Step 3: Manage Content

#### Create Category
1. Scroll to top of content area
2. Fill in:
   - **Title** - Category name
   - **Grande partie** - Choose section (Plomberie/Chauffage)
   - **Emoji** - Icon for category
   - **Color** - Category color
3. **Click "✅ Créer"**

#### Edit Category
1. **Click the ✏️ button** on category
2. Edit title/color
3. **Click ✅ to save** or **❌ to cancel**

#### Add Module (Subsection)
1. **Click the ➕ button** at bottom of category
2. Fill in:
   - **Titre** - Module name
   - **Description** - Full content (supports colors!)
   - **Color** - Highlight color for title
3. **Click ✅ to add**

#### Color Words in Content
1. When editing a module:
2. Type word/phrase to highlight in **"Mot ou phrase à colorer"** field
3. Choose color
4. **Click "➕ Ajouter"**
5. The colored text will be added to your content
6. Syntax: `[color=#FF0000]your text[/color]`

#### Add Images to Module
1. **Click 📷 button** on module
2. Modal appears to select image
3. **Click file upload** or drag/drop
4. **Click "💾 Sauvegarder"**

#### Delete Content
1. Click **🗑️ button** on any category/module
2. Confirm deletion
3. Content is permanently removed

#### Reorder Categories
1. Click **⬆️ or ⬇️ buttons** on category
2. Category moves up or down in list

---

## Gallery Features

### View Gallery
- **Click 📷 button** in header
- See all images in app
- Click **👁️ "Voir"** to jump to module

### Filter Images
- **Click category button** to filter by category
- **Click "Toutes"** to see all images

### Delete Images
- In gallery, **click 🗑️** on image
- Image is removed from module

---

## Search Features

1. **Click 🔍** in header
2. **Type your search term**
3. Results show matching modules
4. **Press Enter** to close search
5. Click **👁️ "Voir"** to jump to result

---

## Settings & Theme

### Dark/Light Mode
- **Click ☀️ or 🌙** button in header
- App immediately switches theme
- Preference is saved

### Edit Mode Toggle
- **Click 🔒** to enable editing (while logged in)
- **Click ✏️** to disable editing
- Visual indicator shows current mode

### Logout
- **Click 🚪 Déconnexion** button
- Returns to home page
- Data is saved

---

## Data & Storage

### Auto-Save
- All changes are automatically saved
- Refreshing the page keeps your data
- Data stored in browser localStorage

### Reset Data (if needed)
Open browser console (F12) and paste:
```javascript
localStorage.removeItem('memo_plomberie_full_v6_complete');
location.reload();
```

---

## Tips & Tricks

💡 **Pro Tips:**
- Use the menu button (☰) to quickly navigate sections
- Images are automatically compressed when uploaded
- You can use `[color=#HEXCOLOR]text[/color]` for custom colored text
- Edit mode is only available when logged in as admin
- The gallery sidebar only shows images from selected category
- Search works on both titles and full content

⚠️ **Important:**
- Password is **case-sensitive**
- Correct password: `ITSTIEC2026`
- Images over 200KB will be rejected
- Module descriptions support plain text and color syntax
- All data is stored locally in your browser

---

## Troubleshooting

### "Mot de passe incorrect"
- Make sure caps lock is **off**
- Correct password: `ITSTIEC2026`
- No spaces before/after

### Edit buttons not showing
- Make sure you're **logged in** (admin only)
- Click 🔒 button to **enable edit mode**

### Images not appearing
- Check that image format is supported (JPG, PNG, WebP)
- Make sure image isn't corrupted
- Try uploading again

### Data disappeared
- Check localStorage isn't cleared
- Run the reset command to restore defaults
- All data is lost if browser cache is cleared

---

## Questions?

The app is fully functional! All features are ready to use. Enjoy managing your plumbing and heating manual! 🔧🔥
