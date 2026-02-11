# Backend Requirements for Multiple File Upload

## Overview
The Contact Form has been updated to support multiple file uploads (up to 40 files). The backend API at `http://localhost:5114/api/contact` needs to be updated to handle an array of files.

## Changes Required

### 1. Update API Endpoint to Accept Multiple Files

**Current (Single File):**
```csharp
[HttpPost]
public async Task<IActionResult> Contact([FromForm] string ContactName, [FromForm] IFormFile ContactFile, ...)
```

**Required (Multiple Files):**
```csharp
[HttpPost]
public async Task<IActionResult> Contact([FromForm] string ContactName, [FromForm] List<IFormFile> ContactFiles, ...)
```

### 2. Validate File Count Server-Side

Add validation to ensure max 40 files:

```csharp
if (ContactFiles != null && ContactFiles.Count > 40)
{
    return BadRequest(new { error = "Maximum 40 files allowed" });
}
```

### 3. Process All Files

Update file processing logic to iterate through all files:

```csharp
if (ContactFiles != null && ContactFiles.Count > 0)
{
    foreach (var file in ContactFiles)
    {
        // Validate file type
        var allowedExtensions = new[] { ".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        
        if (!allowedExtensions.Contains(extension))
        {
            return BadRequest(new { error = $"File type not allowed: {extension}" });
        }
        
        // Save or process file
        // ... your existing file handling logic
    }
}
```

### 4. Update Email Attachments (if applicable)

If files are attached to notification emails, update the email service to handle multiple attachments:

```csharp
foreach (var file in ContactFiles)
{
    using var stream = file.OpenReadStream();
    mailMessage.Attachments.Add(new Attachment(stream, file.FileName));
}
```

### 5. Update File Storage Logic

If files are saved to disk or cloud storage, ensure the logic handles multiple files:

```csharp
var uploadedFilePaths = new List<string>();

foreach (var file in ContactFiles)
{
    var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
    var filePath = Path.Combine(uploadsFolder, uniqueFileName);
    
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }
    
    uploadedFilePaths.Add(filePath);
}
```

### 6. Update Max Request Size (Optional)

If needed, increase the maximum request body size to accommodate multiple files:

**In Program.cs or Startup.cs:**
```csharp
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024; // 100 MB
});
```

## Frontend Changes Made

- ✅ File input now has `multiple` attribute
- ✅ Client-side validation: max 40 files
- ✅ Error message displayed if limit exceeded
- ✅ File count display: "X files selected"
- ✅ Form data sends files as array: `ContactFiles` (multiple entries)
- ✅ Accepted file types unchanged: `.pdf,.jpg,.jpeg,.png,.doc,.docx`
- ✅ Submit button disabled when file error exists

## Testing Checklist

Backend should test:
- [ ] Accepting 1 file works
- [ ] Accepting 40 files works
- [ ] Rejecting 41+ files with appropriate error
- [ ] All file types (.pdf, .jpg, .jpeg, .png, .doc, .docx) accepted
- [ ] Invalid file types rejected
- [ ] Files properly saved/attached/processed
- [ ] Email notifications include all attachments (if applicable)

## API Request Format

The frontend now sends:
```
POST /api/contact
Content-Type: multipart/form-data

ContactName: "John"
ContactSurname: "Doe"
ContactCompany: "ACME Corp"
ContactEmail: "john@example.com"
ContactPhone: "+1234567890"
ContactLocation: "Beirut"
ServiceSlug: "facade"
ContactMessage: "Hello..."
ContactFiles: [file1]
ContactFiles: [file2]
ContactFiles: [file3]
...
```

Note: `ContactFiles` is repeated for each file (standard FormData behavior for arrays).
