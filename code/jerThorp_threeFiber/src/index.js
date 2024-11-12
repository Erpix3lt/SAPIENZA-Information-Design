import { createRoot } from 'react-dom/client';
import './styles.css';
import { App } from './App';
import Overlay from './Overlay';

const images = [
  // Front
  {
    position: [0, 0, 1.5],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_c4f6b9ffc4aa4f38bc0819b5f78f2a3f~mv2.png/v1/fill/w_1206,h_654,al_c,q_85,usm_0.66_1.00_0.01/3e90e7_c4f6b9ffc4aa4f38bc0819b5f78f2a3f~mv2.png',
    name: 'Cascade',
    description: 'Cascade is a project about visualizing the real-time sharing of New York Times content on social networks. It served as a building block for Jer Thorp’s work, as it connects user behavior to sharing activity, allowing him to transform isolated data into compelling narratives and visualizations.'
  },
  // Back
  {
    position: [-0.8, 0, -0.6],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_20390c80c1e54f4c95e1a7a2d44e27cd~mv2.jpg/v1/fill/w_1206,h_678,al_c,q_85,usm_0.66_1.00_0.01/3e90e7_20390c80c1e54f4c95e1a7a2d44e27cd~mv2.jpg',
    name: 'Into the Okavango',
    description: 'Into the Okavango is a live data expedition led by Dr. Steve Boyes, featuring daily satellite-uploaded data from the Okavango Delta for virtual exploration. For Jer Thorp, the project marked a shift toward real-time data analysis and public engagement, allowing him to experiment with new visualization techniques. This approach deepened the narrative around conservation efforts in this pristine ecosystem.'
  },
  {
    position: [0.8, 0, -0.6],
    rotation: [0, 0, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_e81043c4fccb47a687002e49c49071e5~mv2.jpg/v1/fill/w_960,h_641,al_c,q_85,enc_auto/3e90e7_e81043c4fccb47a687002e49c49071e5~mv2.jpg',
    name: '9/11 Memorial',
    description: 'Jer Thorp collaborated with Jake Barton and Local Projects to design an algorithm and software tool for the 9/11 Memorial in Manhattan. Using Processing, they facilitated the placement of nearly 3,000 names on the memorial, addressing around 1,500 requests from families for "meaningful adjacency"—the desire for certain names to be placed near one another, reflecting their personal relationships. This project highlights Thorp`s commitment to blending data visualization with human narratives, creating a memorial that honors the connections between the victims.'
  },
  // Left
  {
    position: [-2, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_5c3269d3809543d49d81576b6f359de2~mv2.png/v1/fill/w_1280,h_800,al_c,q_90,enc_auto/3e90e7_5c3269d3809543d49d81576b6f359de2~mv2.png',
    name: 'Infinite Weft',
    description: 'Infinite Weft is a collaboration between Jer Thorp and his mother, Diana Thorp, who has been weaving for over 40 Years. This piece is highly interesting as it explores how textiles can function as digital object. Weaving machines were some of the very first highly complex machines, leading some researches to pronounce them as the origin of our modern computers. By applying non-repeating cellular automata, Thorp theorizes that a sufficiently long woven textile could be Turing-complete, embedding instructions to solve any problem, thus challenging conventional notions of patterns in fabric'
  },
  {
    position: [-2.15, 0, 1.9],
    rotation: [0, Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_1322702a5451468b8864a697000c83c0~mv2.png/v1/fill/w_990,h_990,al_c,q_90,enc_auto/3e90e7_1322702a5451468b8864a697000c83c0~mv2.png',
    name: '138 Years of popular science',
    description: 'In 2011, Jer Thorp created a visualization for Popular Science magazine`s archive, showcasing how technical and cultural terms have evolved over 140 years. The graphic features a molecular chain representing decade and year clusters, with each issue of the magazine represented as colored atoms sized by word count. Surrounding this chain are 70 histograms displaying the usage frequency of various terms, illustrating the progression of technology in both logical and whimsical ways.'
  },
  // Right
  {
    position: [1.9, 0, 0.1],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://static.wixstatic.com/media/3e90e7_a42c6aabada04a4a926f720f76015ed2~mv2.jpg/v1/fill/w_960,h_630,al_c,q_85,enc_auto/3e90e7_a42c6aabada04a4a926f720f76015ed2~mv2.jpg',
    name: 'St. Louis Map Room',
    description: 'The St. Louis Map Room is a collaborative project that empowers community members to create hand-drawn maps of their neighborhoods, integrating civic data to reflect their experiences and foster discussions on social justice.'
  },
  {
    position: [2.5, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://miro.medium.com/v2/resize:fit:1200/format:webp/0*mGiczxjl_hLSbLNC.jpg',
    name: 'Influence of early mac os',
    description: 'Jer Thorp`s journey into data visualization began with the early Apple machines and the HyperCard program, which allowed users to create interactive applications and stories. This formative experience inspired his fascination with visualizing data, leading him to explore socio-economic trends and the narratives hidden within numbers. HyperCard`s emphasis on interactivity shaped Thorp`s approach to data, encouraging him to develop projects that invite users to engage with information actively. This blend of technology and creativity laid the groundwork for his later work, where he combines art, science, and design to illuminate complex data in a relatable manner.'
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: 'https://i0.wp.com/www.themarginalian.org/wp-content/uploads/2012/03/jerthorp.jpg?w=500&ssl=1',
    name: 'Intersection of Design, Art and Science',
    description: 'In the age of big data, there is an urgent need for creatives—artists, designers, and writers—to humanize complex datasets. While traditional data analysis often focuses on numbers and algorithms, creatives bring empathy and narrative to the forefront, making data more accessible and relatable. By integrating artistic perspectives, they can illuminate the human stories behind the statistics, fostering a deeper understanding of issues like privacy, equity, and social justice. This collaboration between data scientists and creatives not only enriches data analysis but also empowers communities to engage with information in meaningful ways.'
  }
];

const audio = new Audio('./Jer-Thorp_The-Weight-of-Data.mp3'); // Replace with your MP3 URL
audio.play().catch(error => {
  console.error("Audio playback failed: ", error);
  alert("Audio playback failed, make sure your browser allows autoplay. Enable and reload the page.");
});

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <Overlay />
    <App images={images} />
  </>
);