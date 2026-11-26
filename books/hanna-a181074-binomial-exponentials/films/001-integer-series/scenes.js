'use strict';

const headline = (label, y, size, alpha, color = C.white) =>
  txt(label, W / 2, y, { size, align: 'center', fam: F.mono, c: color, a: alpha });

SCENES.open = scene => {
  headline('WHEN FRACTIONS TURN INTO INTEGERS', 270, 50, at(scene, 0, 0.7));
  headline('1   1   2   5   23   …', 465, 103, at(scene, 0, 0.8), C.cyan);
  headline('OEIS A181074  /  EVERY DEGREE?', 650, 38, at(scene, 1, 0.6), C.now);
};

SCENES.cubic = scene => {
  headline('KEEP THE DIAGONAL n + k = 3', 205, 44, at(scene, 0, 0.6));
  const pairs = ['(1, 2)', '(2, 1)', '(3, 0)'];
  const contributions = ['1', '2', '1/3'];
  pairs.forEach((pair, index) => {
    const left = 310 + index * 450;
    panel(left, 320, 400, 235, at(scene, 0, 0.6, 0.16 * index), C.cyan, pair);
    txt(contributions[index], left + 200, 457, { size: 84, align: 'center', fam: F.mono, c: C.white, a: at(scene, 1, 0.6, 0.16 * index) });
  });
  headline('10/3  +  3/2  +  1/6  =  5', 695, 62, at(scene, 2, 0.8), C.now);
};

SCENES.factor = scene => {
  headline('FACTOR BEFORE EXPANDING', 215, 48, at(scene, 0, 0.6));
  headline('1/(1−x) · 1/(1−x²) · 1/(1−x³)³ · …', 400, 54, at(scene, 0, 0.8), C.cyan);
  headline('1 + x + 2x² + 5x³ + …', 540, 50, at(scene, 0, 0.9, 0.6));
  headline('(n, k)  →  (pn, pk)  →  INTEGER PRODUCT EXPONENTS', 710, 36, at(scene, 1, 0.7), C.now);
};

SCENES.close = scene => {
  headline('A181074: ALL COEFFICIENTS ARE INTEGERS', 285, 44, at(scene, 0, 0.8));
  headline('k + 1  →  k   gives   [x⁶] = 1481/2', 470, 58, at(scene, 0, 0.8, 1.2), C.now);
  headline('HAOBO MA AND WENLIN ZHANG  /  PAPER v3', 660, 33, at(scene, 0, 0.8, 2.5));
  headline('DOI 10.5281/zenodo.24408311', 720, 30, at(scene, 0, 0.8, 2.5), C.cyan);
};
