from PIL import Image
import sys
import math

def distance(c1, c2):
    (r1, g1, b1) = c1[:3]
    (r2, g2, b2) = c2[:3]
    return math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)

def remove_background(input_path, output_path, threshold=50, fade=30):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    bg_color = datas[0] # Top-left pixel
    
    newData = []
    for item in datas:
        d = distance(item, bg_color)
        if d < threshold:
            newData.append((0, 0, 0, 0))
        elif d < threshold + fade:
            # Linear fade for anti-aliasing
            alpha = int(((d - threshold) / fade) * 255)
            # Keep original color but adjust alpha
            newData.append((item[0], item[1], item[2], alpha))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved soft-transparent image to {output_path} (threshold={threshold}, fade={fade})")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input> <output> [threshold] [fade]")
    else:
        threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 50
        fade = int(sys.argv[4]) if len(sys.argv) > 4 else 30
        remove_background(sys.argv[1], sys.argv[2], threshold, fade)
