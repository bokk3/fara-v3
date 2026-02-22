#!/bin/bash

# Create optimized directory
mkdir -p public/images/optimized

# Process each image
for img in public/images/new/*.JPG; do
    filename=$(basename "$img" .JPG)
    echo "Processing $filename..."
    
    # Resize to max 1920px width, maintain aspect ratio, quality 85%, strip metadata
    magick "$img" \
        -resize '1920x1920>' \
        -quality 85 \
        -strip \
        "public/images/optimized/${filename}.jpg"
    
    echo "✓ Created public/images/optimized/${filename}.jpg"
done

echo ""
echo "Optimization complete! Checking sizes..."
du -h public/images/new/*.JPG
echo ""
du -h public/images/optimized/*.jpg
