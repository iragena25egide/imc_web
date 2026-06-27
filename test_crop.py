from PIL import Image

img = Image.open('public/logo.png').convert('RGBA')
width, height = img.size
pixels = img.load()

# Blue color in the logo is roughly (0, 75, 140) or similar dark blue.
# Let's just find the text based on coordinates.
# Text "INTERAFRICAN..." is at the bottom. Let's say y > 150.
# Text "IMC" is roughly in the middle-bottom. x between 100 and 200, y between 100 and 150?
# Let's save a version with a grid to see where to crop.

for x in range(width):
    for y in range(height):
        # make it semi-transparent so we can see grid
        pass

# We will just write a script that clears out the bottom text and IMC text
for x in range(width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        # if it's below y=160, clear it
        if y > 155:
            pixels[x, y] = (255, 255, 255, 0)
        # clear IMC text - we can guess the box
        elif 85 < x < 185 and 90 < y < 140:
            pixels[x, y] = (255, 255, 255, 0)
        # make white transparent
        elif r > 200 and g > 200 and b > 200:
            pixels[x, y] = (255, 255, 255, 0)

img.save('public/mountain-bg-test.png')
print("Saved test crop")
