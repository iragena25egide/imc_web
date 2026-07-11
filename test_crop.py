from PIL import Image
img = Image.open('public/logo.png')
pixels = img.load()
width, height = img.size

# Find first transparent/white row from bottom to separate text and logo
for y in range(height-1, -1, -1):
    non_transparent = 0
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 10:  # slightly opaque
            non_transparent += 1
    print(f"Row {y}: {non_transparent} pixels")
