import type { Shape } from '../types';

export const geometryData: Shape[] = [
  // 2D Shapes
  {
    name: 'Circle',
    dimension: '2D',
    formulas: {
      Area: 'pi * r^2',
      Circumference: '2 * pi * r'
    },
    variables: {
      r: 'Radius'
    }
  },
  {
    name: 'Square',
    dimension: '2D',
    formulas: {
      Area: 's^2',
      Perimeter: '4 * s'
    },
    variables: {
      s: 'Side Length'
    }
  },
  {
    name: 'Rectangle',
    dimension: '2D',
    formulas: {
      Area: 'l * w',
      Perimeter: '2 * (l + w)'
    },
    variables: {
      l: 'Length',
      w: 'Width'
    }
  },
  {
    name: 'Ellipse',
    dimension: '2D',
    formulas: {
      Area: 'pi * a * b',
      'Approx. Circumference': 'pi * (3*(a+b) - sqrt((3*a + b) * (a + 3*b)))'
    },
    variables: {
      a: 'Semi-major axis',
      b: 'Semi-minor axis'
    }
  },
  {
    name: 'Right Triangle',
    dimension: '2D',
    formulas: {
      Area: '0.5 * b * h',
      Hypotenuse: 'sqrt(b^2 + h^2)',
      Perimeter: 'b + h + sqrt(b^2 + h^2)'
    },
    variables: {
      b: 'Base',
      h: 'Height'
    }
  },
  {
    name: 'Parallelogram',
    dimension: '2D',
    formulas: {
      Area: 'b * h',
      Perimeter: '2 * (b + s)'
    },
    variables: {
      b: 'Base',
      h: 'Height',
      s: 'Side'
    }
  },
  {
    name: 'Rhombus',
    dimension: '2D',
    formulas: {
      Area: '(p * q) / 2',
      'Side Length': 'sqrt((p/2)^2 + (q/2)^2)',
      Perimeter: '4 * sqrt((p/2)^2 + (q/2)^2)'
    },
    variables: {
      p: 'Diagonal p',
      q: 'Diagonal q'
    }
  },
  {
    name: 'Trapezoid',
    dimension: '2D',
    formulas: {
        Area: '0.5 * (a + b) * h'
    },
    variables: {
        a: 'Base a',
        b: 'Base b',
        h: 'Height'
    }
  },
  {
    name: 'Regular Polygon',
    dimension: '2D',
    formulas: {
      Area: '(n * s^2) / (4 * tan(pi / n))',
      Perimeter: 'n * s'
    },
    variables: {
      n: 'Number of Sides',
      s: 'Side Length'
    }
  },
  // 3D Shapes
  {
    name: 'Cube',
    dimension: '3D',
    formulas: {
      Volume: 's^3',
      'Surface Area': '6 * s^2'
    },
    variables: {
      s: 'Side Length'
    }
  },
  {
    name: 'Rectangular Prism',
    dimension: '3D',
    formulas: {
      Volume: 'l * w * h',
      'Surface Area': '2 * (l*w + l*h + w*h)'
    },
    variables: {
      l: 'Length',
      w: 'Width',
      h: 'Height'
    }
  },
  {
    name: 'Sphere',
    dimension: '3D',
    formulas: {
      Volume: '(4/3) * pi * r^3',
      'Surface Area': '4 * pi * r^2'
    },
    variables: {
      r: 'Radius'
    }
  },
  {
    name: 'Cylinder',
    dimension: '3D',
    formulas: {
        'Volume': 'pi * r^2 * h',
        'Surface Area': '2 * pi * r * (r + h)'
    },
    variables: {
        r: 'Radius',
        h: 'Height'
    }
  },
  {
    name: 'Cone',
    dimension: '3D',
    formulas: {
        'Volume': '(1/3) * pi * r^2 * h',
        'Slant Height': 'sqrt(r^2 + h^2)',
        'Lateral Surface Area': 'pi * r * sqrt(r^2 + h^2)',
        'Total Surface Area': 'pi * r * (r + sqrt(r^2 + h^2))'
    },
    variables: {
        r: 'Radius',
        h: 'Height'
    }
  },
  {
    name: 'Square Pyramid',
    dimension: '3D',
    formulas: {
      Volume: '(1/3) * b^2 * h',
      'Slant Height': 'sqrt(h^2 + (b/2)^2)',
      'Surface Area': 'b^2 + 2 * b * sqrt((b/2)^2 + h^2)'
    },
    variables: {
      b: 'Base Side',
      h: 'Height'
    }
  },
  {
    name: 'Torus',
    dimension: '3D',
    formulas: {
      Volume: '(pi * r^2) * (2 * pi * R)',
      'Surface Area': '(2 * pi * r) * (2 * pi * R)'
    },
    variables: {
      R: 'Major Radius',
      r: 'Minor Radius'
    }
  }
];