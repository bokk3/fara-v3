#!/bin/bash

echo "Image Replacement Script"
echo "========================"
echo ""

# Check if source images exist
if [ ! -f "DSC_6154.JPG" ] && [ ! -f "DSC_6154.jpg" ]; then
    echo "❌ DSC_6154 not found in current directory"
    echo "Please place DSC_6154.JPG in the project root"
    exit 1
fi

if [ ! -f "DSC_6327.JPG" ] && [ ! -f "DSC_6327.jpg" ]; then
    echo "❌ DSC_6327 not found in current directory"
    echo "Please place DSC_6327.JPG in the project root"
    exit 1
fi

# Find the actual filenames (case insensitive)
DSC_6154=$(find . -maxdepth 1 -iname "DSC_6154.JPG" -o -iname "DSC_6154.jpg" | head -1)
DSC_6327=$(find . -maxdepth 1 -iname "DSC_6327.JPG" -o -iname "DSC_6327.jpg" | head -1)

echo "✓ Found source images"
echo ""

# Create backup
echo "Creating backup..."
mkdir -p public/images/backup-$(date +%Y%m%d)
cp public/images/hero_stretch.jpg public/images/backup-$(date +%Y%m%d)/
cp public/images/action_jump.jpg public/images/backup-$(date +%Y%m%d)/
echo "✓ Backup created in public/images/backup-$(date +%Y%m%d)/"
echo ""

# Process DSC_6154 -> hero_stretch.jpg
echo "Processing DSC_6154 -> hero_stretch.jpg..."
magick "$DSC_6154" \
    -resize '1920x1920>' \
    -quality 85 \
    -strip \
    public/images/hero_stretch.jpg

if [ $? -eq 0 ]; then
    size=$(stat -c%s public/images/hero_stretch.jpg)
    size_mb=$(echo "scale=2; $size/1024/1024" | bc)
    echo "✓ hero_stretch.jpg created (${size_mb} MB)"
else
    echo "❌ Failed to process DSC_6154"
    exit 1
fi

# Process DSC_6327 -> action_jump.jpg
echo "Processing DSC_6327 -> action_jump.jpg..."
magick "$DSC_6327" \
    -resize '1920x1920>' \
    -quality 85 \
    -strip \
    public/images/action_jump.jpg

if [ $? -eq 0 ]; then
    size=$(stat -c%s public/images/action_jump.jpg)
    size_mb=$(echo "scale=2; $size/1024/1024" | bc)
    echo "✓ action_jump.jpg created (${size_mb} MB)"
else
    echo "❌ Failed to process DSC_6327"
    exit 1
fi

echo ""
echo "========================"
echo "✓ Image replacement complete!"
echo ""
echo "New images:"
ls -lh public/images/hero_stretch.jpg public/images/action_jump.jpg | awk '{print $9, $5}'
echo ""
echo "You can now delete the source DSC_* files if you want."
