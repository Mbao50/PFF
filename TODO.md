# TODO: Add Image Upload Option for Clubs and Players

## Frontend Changes
- [x] Modify ClubManagement.tsx to add image upload option
- [x] Modify PlayerManagement.tsx to add image upload option
- [x] Add file input components with validation
- [x] Update form data interfaces to handle file uploads
- [x] Update ApiService.ts to handle file uploads for clubs and players

## Backend Changes
- [x] Update ClubController.php to handle file uploads
- [x] Update PlayerController.php to handle file uploads
- [x] Modify validation rules to accept files or URLs
- [x] Add image storage logic

## Database/Storage
- [x] Create storage directory for uploaded images
- [x] Update migrations if needed for file paths
- [x] Create storage symlink

## Testing
- [ ] Test image upload functionality
- [ ] Test URL input still works
- [ ] Verify image display in components
- [ ] Test file validation (size, type)
