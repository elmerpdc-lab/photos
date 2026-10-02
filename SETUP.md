# Family Photos dashboard: setup

This is a single web page that your family opens in a browser, on a phone or a computer. Each person signs in with
their own Microsoft account. The page then reads the shared `Photos` folder straight from OneDrive, using
OneDrive's thumbnails. Nothing is copied or uploaded anywhere else, and people only see what you shared with them.

Setup takes about 20 minutes, once.

---

## 1. Share the Photos folder (you may have done this already)

1. Go to <https://onedrive.live.com>, open **EEE**, select **Photos**, and click **Share**.
2. Choose **Specific people**, set it to **Can view**, and add each family member's email address.
   Each person must have a Microsoft account (Outlook, Hotmail, Xbox and so on) on that email address.
3. Optional: click **Copy link** and keep the link for step 3. It only works for the people you added.

> ⚠️ Don't use an **"Anyone with the link"** link for this. `config.js` becomes public once the site is
> online, so anyone who found it could open the whole folder.

## 2. Register the app with Microsoft (free)

This gives the page permission to ask people to sign in.

1. Go to <https://entra.microsoft.com> and sign in with **your** Microsoft account.
   If Microsoft asks you to create a directory or a free Azure account first, do that (it's free), then continue.
2. Go to **Applications → App registrations → New registration**.
   - **Name:** `Family Photos`
   - **Supported account types:** *Personal Microsoft accounts only*
   - **Redirect URI:** choose **Single-page application (SPA)** and enter the address of your site
     (from step 4). For example: `https://YOUR-GITHUB-NAME.github.io/family-photos/`
3. Click **Register**. Copy the **Application (client) ID** (it looks like `1a2b3c4d-…`).
4. Open **Authentication**. Under *Single-page application*, **add another URI**: `http://localhost:8765/`
   This lets you test on your own PC. Save.
5. Open **API permissions → Add a permission → Microsoft Graph → Delegated permissions**, tick
   **Files.Read.All**, and click **Add permissions**. `User.Read` is already there. No admin consent is needed.
   Each person approves once at their first sign-in.

## 3. Fill in `config.js`

```js
clientId: 'paste-the-Application-(client)-ID-here',
shareUrl: 'paste the Specific-people link from step 1 (optional)',
```

Family members can leave `shareUrl` blank. The page looks in their **Shared** list for a folder called `Photos`.
If it can't find the folder, it asks them to paste the link from their sharing email.

## 4. Put the page online (free, with GitHub Pages)

1. Create a free account at <https://github.com>, then click **New repository**.
   - Name it `family-photos`, make it **Public**, and create it.
2. Click **uploading an existing file**, then drag in **only** `index.html` and `config.js`.
   Don't upload `demo.json`, which lists your file names. Click **Commit changes**.
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch* and **Branch** to *main / (root)*, and save.
4. After a minute your site is live at `https://YOUR-GITHUB-NAME.github.io/family-photos/`.
   Make sure this matches the redirect URI from step 2, including the `/` at the end.

Send that link to your family. On phones, they can use **Share → Add to Home Screen** to open it like an app.

---

## How it works for your family

- **First visit:** they sign in, and the page builds a catalog of the whole folder. That takes a minute or two for
  about 55,000 files. The catalog is kept in their browser, so later visits open instantly.
- **New photos:** the page checks for changes in the background every 12 hours, or when someone taps ⟳.
  When it finds new photos, it offers to show them.
- **Browse:** Newest, Oldest or Shuffle. The **Through the years** chart filters by year
  (Ctrl-click to pick several years). The **Folders** list lets you drill into events like `2003 → 2003_06_19_Denzel_BDAY`.
- **Search:** folder and file names, months and years, and camera models. For example `boracay`,
  `christmas 2013`, `reunion`, `june 2003` or `canon`.
- **Places:** photos that recorded a GPS location (most phone photos; older cameras usually didn't) are
  grouped by **country → region → town** in the sidebar, and town names are searchable (`tokyo`, `cebu`,
  `singapore 2016`). Place names are worked out **inside each person's browser** from a free world city list
  (GeoNames, about 3 MB, downloaded once), so photo locations are never sent to any other service.
- **Places for photos without GPS:** `Photos/dashboard-places.json` gives a place to whole folders
  (for example `2007/2007_06_17_US_Trip` → Las Vegas). It also lists where the family lived and when, so
  everyday photos from those years get that city. In the viewer, these show as *"from the folder name"* or
  *"estimated: where you lived then"*, and estimated spots get hollow pins on the map. The file sits in the
  shared folder, not on the website, so only the family can read it. Edit it in any text editor. Each place is
  written `"Town, Region, Country"`, and the page picks up changes the next time it loads.
- **Map:** the **Map** button shows every photo in view as clustered pins on an OpenStreetMap map. Click a cluster
  to zoom in, click a pin to open that photo, or pan to a spot and tap **Show photos in this area**.
  In the viewer, a photo's place links to its filter, and **map** opens the exact spot.
- **On this day:** photos taken on today's date in past years.
- **More categories:** screenshots, wallpapers, Facebook/Messenger/WhatsApp images, downloads, and RAW (`.CR2`)
  copies of JPEGs are hidden by default. Their checkboxes are at the bottom of the left panel: tick one to mix it
  back in, or press **Only** to see that category and nothing else. The folders, places and timeline then shrink to
  match. Press **Only** again, or the ✕ on its chip, to go back. Document scans (Office Lens, receipts, IDs) are a
  category too.
- **Files tab (owner only):** next to the title, **Photos | Files** switches to a list of every file in `EEE`, except
  `Photos` and `Photos-Priv`. It's set by `filesPath` in `config.js`. You get a folder tree, type filters (PDF, Word,
  Spreadsheets, Images…), sorting by name, date or size, and name search (files whose name matches come first).
  **Search inside documents** uses OneDrive's full-text search. Clicking a file opens a panel with a preview of its first
  page and **Open in OneDrive / Download / Show in folder**. Family members never get this tab, and nothing in `EEE` is
  shared by it. ⟳ updates the list, and it also refreshes itself every 12 hours. Office lock files (`~$…`) are hidden.
- **Private photos (owner only):** `EEE\Photos-Priv` is *not* shared, so only you can open it. OneDrive enforces
  this, not the website. When you're signed in, the dashboard spots that you own the Photos folder and adds an
  **"Only you see this"** box at the top of the left panel:
  - **Review clutter:** shared screenshots, wallpapers, downloads and document scans, ready to sort. Tap photos to select
    them (Shift-click selects a range), then choose **Keep** (stays shared and stops being suggested), **Make private**
    (moves to Photos-Priv, keeping the same folder path), or **Delete** (goes to the OneDrive recycle bin for 30 days).
  - **Select photos:** the same actions anywhere, for example on a folder.
  - **Private (only you)** under More categories shows your private photos: tick it to mix them in, or press **Only**.
    Private photos show a 🔒, and **Share again** moves them back.
  - The photo viewer has the same buttons. The first time you move or delete something, Microsoft asks you once to
    allow the app to change files. Family members never see these tools and stay read-only.
- **Share a view:** the address bar keeps the current search and filters, so you can copy a link
  (for example to the Boracay folder) and send it to a family member.
- **Viewer:** use the arrow keys or swipe, **Download** the original, or **Open in OneDrive**.
  MP4 and MOV videos play in the page. Older AVI and 3GP videos have to be downloaded to play.

## Dates

Each photo's date comes from, in order:

1. The camera's own date (EXIF).
2. A date in the file name, such as `IMG_20240725_…`, `20240120_201950` or `FB_IMG_1705748764219`.
3. A date in the folder name, such as `wedding_2002_09_21`.
4. The file's modified date, if it falls within its year folder.
5. The year folder itself, shown as *"exact date unknown"*.

## Testing on your PC

From the `EEE` folder, run the following and open <http://localhost:8765/>:

```bash
python -m http.server 8765 --directory photo-dashboard
```

To preview the layout with your real folder structure and no sign-in, open <http://localhost:8765/?demo>
(run `python make_demo.py` first to create `demo.json`). The demo only has locations for photos that are already
downloaded to this PC; the real site gets them for every photo from OneDrive.
