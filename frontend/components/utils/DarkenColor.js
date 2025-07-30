// Utility to darken RGBA/Hex color
const DarkenColor = (color, factor = 0.75) => {
  let r, g, b;

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (color.startsWith("rgba") || color.startsWith("rgb")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return color;
    r = parseInt(match[1]);
    g = parseInt(match[2]);
    b = parseInt(match[3]);
  } else {
    return color;
  }

  r = Math.max(0, Math.floor(r * (1 - factor)));
  g = Math.max(0, Math.floor(g * (1 - factor)));
  b = Math.max(0, Math.floor(b * (1 - factor)));

  return `rgb(${r}, ${g}, ${b})`;
};

export default DarkenColor;
