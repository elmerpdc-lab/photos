// Family Dashboard settings. See SETUP.md for how to get each value.
window.PHOTO_CONFIG = {
  // Name shown at the top of the page.
  title: 'Family Dashboard',

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
  ownerPath: 'EEE/02_Photos',
  folderName: '02_Photos',

  // The owner's private folder: NOT shared, outside Photos. Only the owner sees it in the dashboard, and
  // OneDrive itself keeps everyone else out. "Make private" moves photos here; "Share again" moves them back.
  privatePath: 'EEE/03_Elmer/Photos-Priv',

  // Budget and Expense tab: a workbook inside one of the familyFolders below, read after sign-in
  // Properties, Insurance and Rewards tabs. Anyone who can open the shared folder sees them; ownerOnly: true would limit them to the owner, and ownerOnlyTabs limits single tabs (inv is Investments, acct is Accounts). accountsOwner picks whose accounts the Accounts tab shows.
  personalFile: { folder: '01_Documents', path: 'Journal/Personal_Dashboard_EPDC_v1.xlsx', ownerOnly: false, ownerOnlyTabs: [], accountsOwner: 'Elmer',
    accountsNote: "These are accounts under Elmer's name or joint with Ellie." },

  // Folders the Files tab reads from OneDrive only when asked
  filesOnDemand: ['EEE/05_Archive'],

  budgetFile: { folder: '01_Documents', path: 'Journal/Penang_Expense_Tracker.xlsx' },

  // Folders shared with the Family Group that should appear in family members' Files tab.
  // Use the folder's share link (it only works for signed-in family members). The owner always sees all of EEE.
  familyFolders: [
    // Verified 2026-10-02: refused without sign-in (403 / 401), like the Photos link.
    { name: '01_Documents', shareUrl: 'https://1drv.ms/f/c/18cafbba587bf2dd/IgCzWlldJpTQRrFhcs-Y1PftAXm0hmpUOi-lLhmDlY8Y78s' },
  ],

  // Top-level folders that hold no family photos (Lightroom files, etc.).
  skipFolders: ['Catalogs', 'Lightroom Presets'],
};
