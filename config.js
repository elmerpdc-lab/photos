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
  shareUrl: '',

  // Where the folder lives in the owner's OneDrive, and its name as family members see it.
  ownerPath: 'EEE/Photos',
  folderName: 'Photos',

  // Top-level folders that hold no family photos (Lightroom files, etc.).
  skipFolders: ['Catalogs', 'Lightroom Presets'],
};
