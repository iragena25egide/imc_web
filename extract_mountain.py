from PIL import Image

def process_logo(input_path, output_path):
    try:
        img = Image.open(input_path).convert('RGBA')
        width, height = img.size
        pixels = img.load()

        for x in range(width):
            for y in range(height):
                r, g, b, a = pixels[x, y]
                
                # Make white background transparent
                if r > 200 and g > 200 and b > 200:
                    pixels[x, y] = (255, 255, 255, 0)
                    continue
                
                # Remove bottom text
                if y > 155:
                    pixels[x, y] = (255, 255, 255, 0)
                    continue
                
                # Remove IMC text
                if 85 < x < 185 and 100 < y < 145:
                    pixels[x, y] = (255, 255, 255, 0)
                    continue

                # Make the remaining blue extremely faint (e.g. ~1.5% opacity)
                # Max alpha is 255. 1.5% of 255 is ~4.
                pixels[x, y] = (r, g, b, 4)
                
        img.save(output_path, 'PNG')
        print(f"Successfully created {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

process_logo('public/logo.png', 'public/mountain-pattern.png')
