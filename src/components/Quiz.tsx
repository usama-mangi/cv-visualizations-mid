import { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  answer: number[];
  explanation: string;
  topic: string;
}

const QUIZ_DATA: Question[] = [
  {
    "question": "How is an image mathematically represented as a function?",
    "options": [
      "f(x, y) for grayscale and f(x, y, c) for color",
      "f(x, y) for color and f(c) for grayscale",
      "f(x) for grayscale and f(y) for color",
      "f(c) for both color and grayscale"
    ],
    "answer": [0],
    "explanation": "An image is a mathematical function f(x, y) for 2D grayscale and f(x, y, c) for 3D color where c represents the channel (R, G, B).",
    "topic": "Image Fundamentals"
  },
  {
    "question": "Which of the following is true about analog images?",
    "options": [
      "They are made of pixels",
      "They are stored in rows and columns like a matrix",
      "They are continuous representations of visual information",
      "They have a fixed bit depth"
    ],
    "answer": [2],
    "explanation": "Analog images, such as film photography and paintings, are continuous representations of visual information and are not made of pixels.",
    "topic": "Image Fundamentals"
  },
  {
    "question": "What happens to the projected image in a pinhole camera when the hole is made smaller?",
    "options": [
      "The image becomes sharper and brighter",
      "The image becomes sharper but dimmer",
      "The image becomes blurrier and brighter",
      "The image becomes blurrier and dimmer"
    ],
    "answer": [1],
    "explanation": "In a pinhole camera, making the hole smaller causes the image to be sharper, but it becomes dimmer due to less light entering.",
    "topic": "Image Fundamentals"
  },
  {
    "question": "Which of the following represents the weighted Luma formula used to compute a grayscale image from an RGB image?",
    "options": [
      "Gray = 0.3333·R + 0.3333·G + 0.3333·B",
      "Gray = 0.2989·R + 0.5870·G + 0.1140·B",
      "Gray = 0.1140·R + 0.5870·G + 0.2989·B",
      "Gray = 0.5870·R + 0.2989·G + 0.1140·B"
    ],
    "answer": [1],
    "explanation": "The formula is Gray = 0.2989·R + 0.5870·G + 0.1140·B, where Green is weighted more heavily because the human eye is more sensitive to it.",
    "topic": "Color Spaces"
  },
  {
    "question": "Which type of projection maps 3D objects onto a 2D plane using parallel lines and preserves scale regardless of depth?",
    "options": [
      "Perspective Projection",
      "Orthographic Projection",
      "Isometric Projection",
      "Pin-hole Projection"
    ],
    "answer": [1],
    "explanation": "Orthographic projection projects 3D objects onto a 2D plane using parallel lines, preserving their accurate dimensions without perspective distortion.",
    "topic": "Projections"
  },
  {
    "question": "What parameters are specifically described by camera extrinsics?",
    "options": [
      "Focal length and principal point",
      "Rotation matrix and translation vector",
      "Shear parameter and scale difference",
      "Image width and height"
    ],
    "answer": [1],
    "explanation": "Camera extrinsics describe the camera's location and orientation in the 3D world, represented by a rotation matrix [R] and a translation vector [t].",
    "topic": "Projections"
  },
  {
    "question": "What is the correct projection equation to convert a 3D world coordinate to a 2D pixel coordinate?",
    "options": [
      "x_pixel = K [R|t] X_world",
      "x_pixel = [R|t] K X_world",
      "x_pixel = K + [R|t] X_world",
      "x_pixel = K / [R|t] X_world"
    ],
    "answer": [0],
    "explanation": "The full camera projection equation is x_pixel = K [R|t] X_world, bridging world coordinates to pixel coordinates via extrinsic and intrinsic matrices.",
    "topic": "Projections"
  },
  {
    "question": "What does 'chromaticity' refer to in image color spaces?",
    "options": [
      "Brightness and intensity only",
      "Color information excluding brightness",
      "The sum of all RGB channels",
      "The difference between hue and saturation"
    ],
    "answer": [1],
    "explanation": "Chromaticity (or chrominance) defines the color of a pixel (such as hue and saturation) without including its luminance or brightness.",
    "topic": "Color Spaces"
  },
  {
    "question": "Which of the following is considered a subtractive color model?",
    "options": [
      "RGB",
      "HSV",
      "CMYK",
      "Lab"
    ],
    "answer": [2],
    "explanation": "CMYK is a subtractive color model where colors are created by removing (absorbing) light wavelengths using pigments or inks.",
    "topic": "Color Spaces"
  },
  {
    "question": "In the CIELAB (Lab) color space, what does the 'a*' axis represent?",
    "options": [
      "Lightness (black to white)",
      "Blue (–) to Yellow (+)",
      "Green (–) to Red (+)",
      "Hue and Saturation"
    ],
    "answer": [2],
    "explanation": "In the Lab color space, the 'a*' channel represents the color axis from Green (–) to Red (+).",
    "topic": "Color Spaces"
  },
  {
    "question": "In frequency domain filtering, where are the low frequencies typically located in the visual representation?",
    "options": [
      "At the outer edges",
      "In the center",
      "Scattered randomly",
      "In the top-left corner"
    ],
    "answer": [1],
    "explanation": "In the frequency domain representation, the center represents the low frequencies (smooth areas), while the edges represent high frequencies.",
    "topic": "Filtering"
  },
  {
    "question": "Which of the following is an example of a non-linear filter?",
    "options": [
      "Gaussian filter",
      "Sobel filter",
      "Median filter",
      "Box filter"
    ],
    "answer": [2],
    "explanation": "The Median filter is a non-linear filter because its output replaces the pixel with the median of its neighbors, which cannot be expressed as a linear weighted sum.",
    "topic": "Filtering"
  },
  {
    "question": "In the Canny edge detector algorithm, what step is responsible for thinning thick edges to one-pixel-wide lines?",
    "options": [
      "Gaussian smoothing",
      "Non-maximum suppression",
      "Double thresholding",
      "Edge tracking by hysteresis"
    ],
    "answer": [1],
    "explanation": "Non-maximum suppression thins thick edges to single-pixel lines by suppressing pixels that are not local maxima along the gradient direction.",
    "topic": "Filtering"
  },
  {
    "question": "A Gabor filter functions as a sinusoidal signal modulated by what kind of function?",
    "options": [
      "A Box function",
      "A Gaussian wave",
      "A Laplacian operator",
      "A median filter"
    ],
    "answer": [1],
    "explanation": "A Gabor filter is a sinusoidal signal of a particular frequency and orientation that is modulated by a Gaussian wave envelope.",
    "topic": "Filtering"
  },
  {
    "question": "What two operations does the Laplacian of Gaussian (LoG) filter combine?",
    "options": [
      "Gaussian smoothing and second-derivative edge detection",
      "Gaussian smoothing and first-derivative edge detection",
      "Median smoothing and Sobel operators",
      "Box filtering and Canny edge tracking"
    ],
    "answer": [0],
    "explanation": "The LoG filter combines a Gaussian filter for smoothing noise and a Laplacian operator for second-order derivative edge detection.",
    "topic": "Filtering"
  },
  {
    "question": "Which of the following is considered a Global Feature in an image?",
    "options": [
      "Corners (Harris)",
      "Blobs (LoG)",
      "Color Histograms",
      "SIFT keypoints"
    ],
    "answer": [2],
    "explanation": "Color Histograms are global features because they describe overall properties or statistics of the entire image, unlike local features like corners or blobs.",
    "topic": "Feature Extraction"
  },
  {
    "question": "What is the mathematical formula for the Harris corner response function (R)?",
    "options": [
      "R = trace(M) - k * det(M)^2",
      "R = det(M) - k * trace(M)^2",
      "R = det(M) + k * trace(M)",
      "R = trace(M) / det(M)"
    ],
    "answer": [1],
    "explanation": "The Harris corner score is calculated as R = det(M) - k * trace(M)^2, where M is the structure tensor matrix.",
    "topic": "Feature Extraction"
  },
  {
    "question": "In the Harris Corner Detector, what do the eigenvalues λ1 and λ2 of the structure tensor matrix M indicate if both are large?",
    "options": [
      "A flat region",
      "An edge",
      "A corner",
      "A blob"
    ],
    "answer": [2],
    "explanation": "If both eigenvalues are large, the image structure at that point is identified as a corner. If only one is large, it's an edge.",
    "topic": "Feature Extraction"
  },
  {
    "question": "In the FAST algorithm, how many contiguous pixels in the circle of 16 must typically be significantly brighter or darker than the center pixel to detect a corner?",
    "options": [
      "4",
      "8",
      "12",
      "16"
    ],
    "answer": [2],
    "explanation": "In practice, FAST identifies a pixel as a corner if 12 contiguous pixels in the surrounding circle of 16 are all brighter or darker than the center pixel plus/minus a threshold.",
    "topic": "Feature Extraction"
  },
  {
    "question": "What type of descriptor does the BRIEF algorithm produce?",
    "options": [
      "128-dimensional floating-point vector",
      "64-dimensional floating-point vector",
      "A binary string (sequence of 0s and 1s)",
      "A color histogram"
    ],
    "answer": [2],
    "explanation": "BRIEF produces a binary descriptor by comparing pixel intensities at predefined random pairs, resulting in a compact binary string composed of 0s and 1s.",
    "topic": "Feature Extraction"
  },
  {
    "question": "How does the ORB algorithm achieve orientation estimation for keypoints?",
    "options": [
      "Using Haar wavelet responses",
      "Using the intensity centroid method",
      "Using a 36-bin histogram of gradients",
      "By calculating the Hessian matrix determinant"
    ],
    "answer": [1],
    "explanation": "ORB computes the center of mass of image intensities within a patch (intensity centroid method) to find the orientation vector from the keypoint to the centroid.",
    "topic": "Feature Extraction"
  },
  {
    "question": "Which area of the human visual cortex is analogous to the deeper layers of a CNN that recognize specific abstract representations and objects?",
    "options": [
      "V1 (Primary Visual Cortex)",
      "V2 (Secondary Visual Cortex)",
      "IT (Inferotemporal Cortex)",
      "Local Geniculate Nucleus"
    ],
    "answer": [2],
    "explanation": "The Inferotemporal (IT) Cortex handles high-level processing like object recognition, which is analogous to the final deep layers of a CNN.",
    "topic": "CNN Architecture"
  },
  {
    "question": "Calculate the CNN output size given: Input size = 224x224, Kernel size = 11x11, Padding = SAME (effectively P=4 per side, P_total=8), and Stride = 4.",
    "options": [
      "53x53",
      "55x55",
      "112x112",
      "224x224"
    ],
    "answer": [1],
    "explanation": "Using the formula: Output Size = ((W - F + Padding_total) / S) + 1. Here, ((224 - 11 + 8) / 4) + 1 = 221 / 4 + 1 = 55.25. Following standard integer operations, the output map dimension is 55x55.",
    "topic": "CNN Architecture"
  },
  {
    "question": "For an input feature map of size 32x32, what is the resulting output size after applying a pooling filter of size 2x2 with a stride of 2?",
    "options": [
      "8x8",
      "16x16",
      "30x30",
      "64x64"
    ],
    "answer": [1],
    "explanation": "Using the pooling size formula: ((W - F) / S) + 1 = ((32 - 2) / 2) + 1 = 15 + 1 = 16x16.",
    "topic": "CNN Architecture"
  },
  {
    "question": "A convolutional layer has 64 filters, each of size 3x3. It receives an input feature map with 32 channels. How many total learnable parameters does this layer have?",
    "options": [
      "18496",
      "18432",
      "36928",
      "2304"
    ],
    "answer": [0],
    "explanation": "The number of weights is (3 * 3 * 32) * 64 = 18432. Adding 64 biases (one for each filter) results in a total of 18496 learnable parameters.",
    "topic": "CNN Architecture"
  },
  {
    "question": "Which of the following is true about a standard pooling layer in a CNN?",
    "options": [
      "It has learnable weights that are updated during training.",
      "It uses an aggregation function like max or mean and has no weights.",
      "It increases the spatial dimensions of the input image.",
      "It applies a fully connected dot product to the feature maps."
    ],
    "answer": [1],
    "explanation": "A pooling layer aggregates inputs using a function such as max or mean, and it contains no learnable weights.",
    "topic": "CNN Architecture"
  },
  {
    "question": "Why is a Flatten layer typically used before the final Dense layers in a CNN?",
    "options": [
      "To convert 1D dense vectors into 3D tensors",
      "To convert 3D feature map tensors into 1D vectors for the classifier",
      "To reduce the number of channels to 1",
      "To apply max pooling across all channels"
    ],
    "answer": [1],
    "explanation": "Densely connected classifiers process 1D vectors, while convolutional base outputs are 3D tensors, meaning the 3D outputs must be flattened to 1D before dense layers.",
    "topic": "CNN Architecture"
  },
  {
    "question": "What technique is commonly used to mitigate overfitting when training a CNN from scratch on a small dataset?",
    "options": [
      "Fine-tuning",
      "Feature Extraction",
      "Data Augmentation",
      "Gradient Clipping"
    ],
    "answer": [2],
    "explanation": "Data augmentation prevents overfitting on small datasets by generating more training data via random transformations of existing images.",
    "topic": "Applied Deep Learning"
  },
  {
    "question": "When fine-tuning a pretrained model, why is it recommended to unfreeze only the top few layers of the convolutional base?",
    "options": [
      "Earlier layers encode highly specialized features that must be kept frozen.",
      "Earlier layers encode generic, reusable features, while higher layers encode specialized features relevant to the new problem.",
      "Unfreezing the whole base reduces the overall parameter count.",
      "The dense layers cannot be trained if the entire base is unfrozen."
    ],
    "answer": [1],
    "explanation": "Earlier layers encode generic features, whereas higher layers hold specialized features. Fine-tuning top layers repurposes these specialized features while avoiding the overfitting risks associated with training all parameters.",
    "topic": "Applied Deep Learning"
  },
  {
    "question": "What mechanism does the ResNet architecture use to address the vanishing gradient and degradation problems?",
    "options": [
      "Inception modules",
      "Local Response Normalization",
      "Skip (residual) connections",
      "Extensive Dropout layers"
    ],
    "answer": [2],
    "explanation": "ResNet employs skip connections (or shortcut connections) that bypass layers, allowing gradients to flow directly and forcing the network to perform residual learning.",
    "topic": "Applied Deep Learning"
  }
];

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const shuffle = (array: any[]) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const prepared = shuffle(QUIZ_DATA).map((q: Question) => {
      const originalOptions = q.options.map((opt: string, idx: number) => ({ text: opt, originalIdx: idx }));
      const shuffledOptions = shuffle(originalOptions);
      const newAnswer = q.answer.map((oldIdx: number) => 
        shuffledOptions.findIndex(opt => opt.originalIdx === oldIdx)
      );
      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        answer: newAnswer
      };
    });

    setShuffledQuestions(prepared);
  }, []);

  if (shuffledQuestions.length === 0) return null;

  if (isFinished) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
        <h2>Quiz Completed!</h2>
        <p className="description" style={{ margin: '0 auto 32px' }}>You've finished the comprehensive Computer Vision final assessment.</p>
        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>
          {((score / shuffledQuestions.length) * 100).toFixed(0)}%
        </div>
        <p style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Score: {score} / {shuffledQuestions.length}</p>
        <button className="btn-primary" style={{ marginTop: '40px' }} onClick={() => window.location.reload()}>
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = shuffledQuestions[currentIdx];
  const isMulti = q.answer.length > 1;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    if (isMulti) {
      setSelectedOptions(prev => 
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    } else {
      setSelectedOptions([idx]);
      checkResult([idx]);
    }
  };

  const checkResult = (selected: number[]) => {
    const isCorrect = selected.length === q.answer.length && selected.every(val => q.answer.includes(val));
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < shuffledQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptions([]);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#fef3c7', color: '#92400e' }}>Final Assessment</span>
        <h2>Knowledge Mastery Quiz</h2>
        <p className="description">30 randomized questions covering the full course syllabus.</p>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>QUESTION {currentIdx + 1} OF {shuffledQuestions.length}</div>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>SCORE: {score}</div>
      </div>

      <div className="card" style={{ border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '12px', textTransform: 'uppercase' }}>{q.topic}</div>
        <h3 style={{ marginTop: 0, fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '32px' }}>{q.question}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {q.options.map((opt, idx) => {
            let bgColor = '#fff';
            let borderColor = 'var(--border)';
            let textColor = 'var(--text-primary)';

            if (showResult) {
              if (q.answer.includes(idx)) {
                bgColor = '#ecfdf5';
                borderColor = 'var(--success)';
                textColor = '#065f46';
              } else if (selectedOptions.includes(idx)) {
                bgColor = '#fef2f2';
                borderColor = '#ef4444';
                textColor = '#991b1b';
              }
            } else if (selectedOptions.includes(idx)) {
              borderColor = 'var(--primary)';
              bgColor = '#f5f3ff';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  color: textColor,
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  border: `2px solid ${selectedOptions.includes(idx) ? 'var(--primary)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
                  background: selectedOptions.includes(idx) ? 'var(--primary)' : 'transparent',
                  color: '#fff'
                }}>
                  {selectedOptions.includes(idx) && '✓'}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        {isMulti && !showResult && (
          <button className="btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={() => checkResult(selectedOptions)} disabled={selectedOptions.length === 0}>
            Submit Answer
          </button>
        )}

        {showResult && (
          <div style={{ marginTop: '32px', animation: 'fadeIn 0.4s ease-out' }}>
            <div className="retention-card" style={{ background: '#f8fafc', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <div className="retention-header" style={{ color: 'var(--text-primary)' }}>Explanation</div>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{q.explanation}</p>
            </div>
            <button className="btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }} onClick={nextQuestion}>
              {currentIdx + 1 < shuffledQuestions.length ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}