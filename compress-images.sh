#!/bin/bash

echo "Checking current image sizes..."
echo "================================"

total_size=0
for img in public/images/*.jpg; do
    if [ -f "$img" ]; then
        size=$(stat -c%s "$img")
        size_mb=$(echo "scale=2; $size/1024/1024" | bc)
        echo "$(basename "$img"): ${size_mb} MB"
        total_size=$((total_size + size))
    fi
done

total_mb=$(echo "scale=2; $total_size/1024/1024" | bc)
echo "================================"
echo "Total size: ${total_mb} MB"
echo ""

# Check if total exceeds 25MB
if (( $(echo "$total_mb > 25" | bc -l) )); then
    echo "⚠️  Total size exceeds 25MB! Compressing images..."
    echo ""
    
    # Create backup
    mkdir -p public/images/backup
    cp public/images/*.jpg public/images/backup/
    echo "✓ Backup created in public/images/backup/"
    
    # Compress images
    for img in public/images/*.jpg; do
        if [ -f "$img" ]; then
            echo "Compressing $(basename "$img")..."
            magick "$img" -resize '1600x1600>' -quality 75 -strip "$img.tmp"
            mv "$img.tmp" "$img"
        fi
    done
    
    echo ""
    echo "Compression complete! New sizes:"
    echo "================================"
    
    new_total=0
    for img in public/images/*.jpg; do
        if [ -f "$img" ]; then
            size=$(stat -c%s "$img")
            size_mb=$(echo "scale=2; $size/1024/1024" | bc)
            echo "$(basename "$img"): ${size_mb} MB"
            new_total=$((new_total + size))
        fi
    done
    
    new_total_mb=$(echo "scale=2; $new_total/1024/1024" | bc)
    saved_mb=$(echo "scale=2; $total_mb - $new_total_mb" | bc)
    echo "================================"
    echo "New total size: ${new_total_mb} MB"
    echo "Space saved: ${saved_mb} MB"
else
    echo "✓ Total size is within 25MB limit. No compression needed."
fi
