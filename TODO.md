# TODO: Computer Vision Study Portal

## 1. Image & Projections
- [x] Course Scope
- [x] Logistics & Discipline
- [x] Definition of an Image
- [x] Analog Images
- [x] Digital Images (Binary, Grayscale, RGB)
- [x] Image Dimensions & Resolution
- [x] Bit Depth
- [x] Computer Vision Representation (2D/3D Arrays)
- [x] Mathematical Concept - Image as a Function ($f(x, y)$, $f(x, y, c)$)
- [x] Function Arithmetic (Addition, Subtraction)
- [x] Perspective Projection (Converging lines, Depth/Size relationship)
- [x] Orthographic Projection (Parallel lines, preserve scale)
- [x] Pinhole Camera (Aperture, Inverted image)
- [x] Analogue Camera (Lens, Film)
- [x] Digital Camera (Sensor, Pixels)
- [x] Camera Calibration (Overview)
- [x] Coordinate Systems Pipeline (World -> Camera -> Image -> Pixel)
- [x] Camera Extrinsics (Location, Orientation, $[R|t]$ Matrix)
- [x] Camera Intrinsics ($K$ Matrix: Focal length, Optical center, Scale, Shear)
- [x] Full Projection Equation ($x = K [R|t] X_{world}$)
- [x] Homogeneous Coordinates & Normalization ($[x, y, w]^T \rightarrow (x/w, y/w)$)

## 2. Color Spaces
- [x] Color Physics (Prism, visible spectrum 400nm-700nm)
- [x] Chromaticity (Definition, Luminance vs Chrominance)
- [x] CIE Chromaticity Diagram (Horseshoe plot, white point)
- [x] Additive vs. Subtractive Models (RGB vs CMYK)
- [x] Grayscale (Subtopics, Luma Formula: $Gray = 0.2989 \cdot R + 0.5870 \cdot G + 0.1140 \cdot B$)
- [x] RGB Space (BGR order, lack of perceptual uniformity)
- [x] HSV Space (Hue angle, Saturation purity, Value brightness)
- [x] CIELAB (Lab) (Perceptual uniformity, $L^*$, $a^*$, $b^*$ components)
- [x] 8-bit OpenCV scaling for Lab ($L^* \times 2.55$, $a^*/b^* + 128$)
- [x] CMYK Space (Pigments, absorption logic)
- [x] HSL & YCbCr (Overview)

## 3. Filtering Math
- [x] Fundamentals (Smoothing, sharpening, denoising)
- [x] Spatial vs. Frequency Domain (Overview)
- [x] Frequency Domain Filtering (Fourier Transform concept, $F(u,v)$)
- [x] Low-pass, High-pass, and Band-pass filters
- [x] Linear Filtering (Weighted sum, neighborhood)
- [x] Linearity Principles (Additivity & Homogeneity)
- [x] Convolution vs. Cross-correlation (The flip step)
- [x] Box Filter (Average, $1/9$ kernel)
- [x] Gaussian Filter (Exponential decay, edge preservation)
- [x] Laplacian Filter (Second-order derivative)
- [x] Laplacian of Gaussian (LoG) & Zero-Crossing Detection
- [x] High Boost Filter
- [x] Sobel & Prewitt Kernels (Gradient $I_x, I_y$)
- [x] Gabor Filter (Directional, parameters: $\Lambda, \Theta, \Psi, \sigma, \gamma$)
- [x] Non-Linear Filtering (Median, Max, Min)
- [x] Canny Edge Detection (5-step pipeline)

## 4. Feature Extraction
- [x] Global vs. Local Features
- [x] Characteristics of Good Features (Invariance, Repeatability, etc.)
- [x] The Aperture Problem
- [x] Harris Corner Detector (Structure Tensor $M$, Eigenvalues)
- [x] FAST (16-pixel ring, early termination)
- [x] SURF (Integral Images, Hessian approximation)
- [x] BRIEF (Binary strings, intensity pairs)
- [x] ORB (FAST + Rotated BRIEF, Intensity Centroid)
- [x] SIFT (4-step algorithm: Scale-space, Localization, Orientation, Descriptor)
- [x] Matching (Euclidean vs Hamming distance, Ratio Test)

## 5. CNN Architecture
- [x] Biological Inspiration (Visual Cortex V1-IT)
- [x] Convolutional vs. Dense Layers
- [x] Core Mechanics (Filters, Stride, Padding)
- [x] Pooling Layers (Max, Average)
- [x] Historical Models (LeNet-5, AlexNet, GoogLeNet/Inception, ResNet)
- [x] Parameter Counting & Output Dimension Formulas
- [x] Residual Learning (Skip connections $F(x) + x$)

## 6. Applied DL
- [x] Handling Small Datasets (Overfitting problem)
- [x] Data Preprocessing (Decoding, Tensors, Normalization)
- [x] Data Augmentation (Random transformations)
- [x] Transfer Learning (Freezing base, Feature Extraction)
- [x] Fine-Tuning (Unfreezing top layers)
