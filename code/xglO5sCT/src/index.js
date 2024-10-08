import { createRoot } from 'react-dom/client';
import './styles.css';
import { App } from './App';

const images = [
  // Front
  {
    position: [0, 0, 1.5],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_c4f6b9ffc4aa4f38bc0819b5f78f2a3f~mv2.png/v1/fill/w_1206,h_654,al_c,q_85,usm_0.66_1.00_0.01/3e90e7_c4f6b9ffc4aa4f38bc0819b5f78f2a3f~mv2.png',
    name: 'Cascade',
    description: 'A captivating front view of the artwork showcasing its vibrant colors.'
  },
  // Back
  {
    position: [-0.8, 0, -0.6],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_20390c80c1e54f4c95e1a7a2d44e27cd~mv2.jpg/v1/fill/w_1206,h_678,al_c,q_85,usm_0.66_1.00_0.01/3e90e7_20390c80c1e54f4c95e1a7a2d44e27cd~mv2.jpg',
    name: 'Into the Okavango',
    description: 'The back view provides a unique perspective, highlighting different textures.'
  },
  {
    position: [0.8, 0, -0.6],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_e81043c4fccb47a687002e49c49071e5~mv2.jpg/v1/fill/w_960,h_641,al_c,q_85,enc_auto/3e90e7_e81043c4fccb47a687002e49c49071e5~mv2.jpg',
    name: '9/11 Memorial',
    description: 'This side view captures the intricate details of the artwork.'
  },
  // Left
  {
    position: [-2, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_5c3269d3809543d49d81576b6f359de2~mv2.png/v1/fill/w_1280,h_800,al_c,q_90,enc_auto/3e90e7_5c3269d3809543d49d81576b6f359de2~mv2.png',
    name: 'Infinite Weft',
    description: 'A left angle view of the piece, revealing more depth and shadows.'
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_1322702a5451468b8864a697000c83c0~mv2.png/v1/fill/w_990,h_990,al_c,q_90,enc_auto/3e90e7_1322702a5451468b8864a697000c83c0~mv2.png',
    name: '138 Years of popular science',
    description: 'A close-up of the left side, emphasizing the textures used in the piece.'
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_44e8459e75e7431cbd41f9a8f2e10f61~mv2_d_1920_1280_s_2.jpg/v1/fill/w_1839,h_1226,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3e90e7_44e8459e75e7431cbd41f9a8f2e10f61~mv2_d_1920_1280_s_2.jpg',
    name: 'Herald Harbinger',
    description: 'This view showcases the artwork from a distance, providing context to its surroundings.'
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_a42c6aabada04a4a926f720f76015ed2~mv2.jpg/v1/fill/w_960,h_630,al_c,q_85,enc_auto/3e90e7_a42c6aabada04a4a926f720f76015ed2~mv2.jpg',
    name: 'St. Louis Map Room',
    description: 'The right angle view highlights the contrasts in color and form.'
  },
  {
    position: [2.5, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://miro.medium.com/v2/resize:fit:1200/format:webp/0*mGiczxjl_hLSbLNC.jpg',
    name: 'Influence of early mac os',
    description: 'A close-up of the right side, focusing on details that captivate the eye.'
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://i0.wp.com/www.themarginalian.org/wp-content/uploads/2012/03/jerthorp.jpg?w=500&ssl=1',
    name: 'Intersection of Design, Art and Science',
    description: 'An image of Jer Thorp, an influential designer and artist, known for his unique approach to data visualization.'
  }
];

const audio = new Audio('./Jer-Thorp_The-Weight-of-Data.mp3'); // Replace with your MP3 URL
audio.play().catch(error => {
  console.error("Audio playback failed: ", error);
  alert("Audio playback failed, make sure your browser allows autoplay. Enable and reload the page.");
});

createRoot(document.getElementById('root')).render(<App images={images} />);
