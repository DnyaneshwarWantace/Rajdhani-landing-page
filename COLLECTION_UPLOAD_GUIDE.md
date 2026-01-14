# Collection Image Upload Guide

This guide explains how to upload images to the landing page collections stored in Cloudflare R2.

## Collection Structure

Images are organized in Cloudflare R2 with the following folder structure:

```
catalog/
├── rajdhani-digital-carpets/
├── wall-felt/
├── holi/
└── christmas/
```

## Upload Methods

### Method 1: Using the API (Recommended)

Use the backend API endpoint to upload images:

```bash
# Upload to Rajdhani Digital Carpets
curl -X POST \
  http://localhost:5000/api/collections/rajdhani-digital-carpets/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"

# Upload to Wall Felt
curl -X POST \
  http://localhost:5000/api/collections/wall-felt/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"

# Upload to Holi Collection
curl -X POST \
  http://localhost:5000/api/collections/holi/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"

# Upload to Christmas Collection
curl -X POST \
  http://localhost:5000/api/collections/christmas/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

### Method 2: Using the Upload Script

Use the Node.js script to upload images:

```bash
cd backend
node src/scripts/uploadCollectionImages.js <collection-name> <image-path>
```

**Examples:**

```bash
# Upload to Rajdhani Digital Carpets
node src/scripts/uploadCollectionImages.js rajdhani-digital-carpets ./images/carpet1.jpg

# Upload to Wall Felt
node src/scripts/uploadCollectionImages.js wall-felt ./images/wall-felt1.jpg

# Upload to Holi Collection
node src/scripts/uploadCollectionImages.js holi ./images/holi1.jpg

# Upload to Christmas Collection
node src/scripts/uploadCollectionImages.js christmas ./images/christmas1.jpg
```

### Method 3: Direct Cloudflare R2 Upload

You can also upload directly through the Cloudflare dashboard:

1. Go to Cloudflare Dashboard → R2
2. Select your bucket
3. Navigate to the collection folder (e.g., `catalog/rajdhani-digital-carpets/`)
4. Upload images directly

## API Endpoints

### Get Collection Images (Public)

```bash
GET /api/collections/:collectionName/images
```

**Example:**
```bash
curl http://localhost:5000/api/collections/rajdhani-digital-carpets/images
```

**Response:**
```json
{
  "success": true,
  "collection": "rajdhani-digital-carpets",
  "images": [
    {
      "url": "https://pub-xxx.r2.dev/catalog/rajdhani-digital-carpets/1234567890-abc123.jpg",
      "key": "catalog/rajdhani-digital-carpets/1234567890-abc123.jpg",
      "size": 245678,
      "lastModified": "2025-01-09T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Upload Image (Requires Authentication)

```bash
POST /api/collections/:collectionName/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Parameters:**
- `collectionName`: One of: `rajdhani-digital-carpets`, `wall-felt`, `holi`, `christmas`
- `image`: Image file (multipart/form-data)

### Delete Image (Requires Authentication)

```bash
DELETE /api/collections/delete
Content-Type: application/json
Authorization: Bearer <token>

{
  "imageUrl": "https://pub-xxx.r2.dev/catalog/rajdhani-digital-carpets/image.jpg"
}
```

## Collection Names

- `rajdhani-digital-carpets` → Rajdhani Digital Carpets
- `wall-felt` → Wall Felt Design Catalogues
- `holi` → Holi Collection
- `christmas` → Christmas Collection

## Frontend Integration

The landing page automatically fetches images from Cloudflare R2 when it loads. Images are displayed in the collection folders and can be viewed, downloaded, and shared.

## Notes

- Images are automatically assigned unique filenames to prevent conflicts
- Maximum file size: 50MB
- Supported formats: JPG, PNG, WebP, GIF
- Images are sorted by upload date (newest first)
