from PIL import Image

# Open original logo
img = Image.open('public/logo.png')

# Crop from top (0) to row 135 (which is safely above the text)
# Box is (left, upper, right, lower)
width, height = img.size
cropped = img.crop((0, 0, width, 138))

# Save as logo-icon.png
cropped.save('public/logo-icon.png')
print("Successfully saved logo-icon.png")
