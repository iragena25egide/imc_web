from PIL import Image

def remove_background(input_path, output_path, tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    
    bg_color1 = (242, 242, 242)
    bg_color2 = (235, 243, 234)
    # The map itself is gray: maybe around (156, 163, 175)
    # The green circle is (34, 197, 94)
    # The pin is yellow (250, 204, 21)
    
    for item in datas:
        # Check if color is close to bg_color1
        if (abs(item[0] - bg_color1[0]) < tolerance and
            abs(item[1] - bg_color1[1]) < tolerance and
            abs(item[2] - bg_color1[2]) < tolerance):
            new_data.append((255, 255, 255, 0)) # transparent
        # Check if color is close to bg_color2
        elif (abs(item[0] - bg_color2[0]) < tolerance and
              abs(item[1] - bg_color2[1]) < tolerance and
              abs(item[2] - bg_color2[2]) < tolerance):
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_background("public/map.png", "public/images/rwanda-map-districts.png")
print("Done removing background.")
