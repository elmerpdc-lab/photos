// Family Photos dashboard settings. See SETUP.md for how to get each value.
window.PHOTO_CONFIG = {
  // Name shown at the top of the page.
  title: 'Our Family Photos',

  // Application (client) ID from your Microsoft app registration (SETUP.md, step 2).
  clientId: '9e6377c2-c3a7-41db-ab5b-38725a1418cc',

  // "Personal Microsoft accounts only" registrations use /consumers.
  authority: 'https://login.microsoftonline.com/consumers',

  // Optional: the "Specific people" share link to the Photos folder (SETUP.md, step 1).
  // Never paste an "Anyone with the link" link here - this file is public once hosted.
  // Left blank, the page finds the folder in the owner's OneDrive or in "Shared with me".
  // Shared with the Microsoft Family Group only: verified 2026-09-27 that it's refused without sign-in
  // and refused for an account outside the family.
  shareUrl: 'https://1drv.ms/f/c/18cafbba587bf2dd/IgDd8ntYuvvKIIAYKScAAAAAARd7ZtBbeOqWGg2ju43HcyU',

  // Where the folder lives in the owner's OneDrive, and its name as family members see it.
  ownerPath: 'EEE/Photos',
  folderName: 'Photos',

  // The owner's private folder: NOT shared, outside Photos. Only the owner sees it in the dashboard, and
  // OneDrive itself keeps everyone else out. "Make private" moves photos here; "Share again" moves them back.
  privatePath: 'EEE/Photos-Priv',

  // Folders shared with the Family Group that should appear in family members' Files tab.
  // Use the folder's share link (it only works for signed-in family members). The owner always sees all of EEE.
  familyFolders: [
    // Verified 2026-10-02: refused without sign-in (403 / 401), like the Photos link.
    { name: 'Family Documents', shareUrl: 'https://1drv.ms/f/c/18cafbba587bf2dd/IgCzWlldJpTQRrFhcs-Y1PftAXm0hmpUOi-lLhmDlY8Y78s' },
  ],

  // Top-level folders that hold no family photos (Lightroom files, etc.).
  skipFolders: ['Catalogs', 'Lightroom Presets'],
};
