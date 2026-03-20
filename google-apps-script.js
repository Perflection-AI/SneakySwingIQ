/**
 * Google Apps Script — Van Westendorp Survey Sheet Writer
 *
 * Setup:
 * 1. Open your Google Sheet (or create a new one)
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file into the script editor
 * 4. In your sheet, create a header row with these columns:
 *    Timestamp | pricing_mode | pricing_tab | pricing_tab_name |
 *    price_too_cheap | price_best_value | price_expensive |
 *    price_too_expensive | acceptable_range_width | currency |
 *    survey_version
 * 5. Deploy → New deployment → Web app
 *    - Description: "Survey API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the Web app URL and set it as VITE_GOOGLE_SCRIPT_URL in your .env
 */

// Handle GET requests (optional, for health check)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
}

// Handle POST requests — write survey data to sheet
function doPost(e) {
  try {
    const sheetId = e.parameter.sheet || 'Sheet1'
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = ss.getSheetByName(sheetId)

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetId)
      sheet.appendRow([
        'Timestamp',
        'pricing_mode',
        'pricing_tab',
        'pricing_tab_name',
        'price_too_cheap',
        'price_best_value',
        'price_expensive',
        'price_too_expensive',
        'acceptable_range_width',
        'currency',
        'survey_version',
      ])
      // Bold header row
      const headerRange = sheet.getRange(1, 1, 1, 11)
      headerRange.setFontWeight('bold')
    }

    // Parse the incoming JSON body
    const body = JSON.parse(e.postData.contents)

    // Append row
    sheet.appendRow([
      new Date().toISOString(),
      body.pricing_mode,
      body.pricing_tab,
      body.pricing_tab_name,
      body.price_too_cheap,
      body.price_best_value,
      body.price_expensive,
      body.price_too_expensive,
      body.acceptable_range_width,
      body.currency,
      body.survey_version,
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
