from PIL import Image, ImageDraw

img = Image.new('RGB', (400, 400), color = (226, 232, 240))
d = ImageDraw.Draw(img)
d.ellipse((130, 70, 270, 210), fill=(148, 163, 184))
d.ellipse((60, 240, 340, 480), fill=(148, 163, 184))

img.save('public/placeholder-avatar.jpg')
