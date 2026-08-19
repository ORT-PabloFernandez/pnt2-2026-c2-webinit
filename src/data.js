// ========================================
// PNT2 Datos Compartidos
// ========================================
// Este archivo contiene datos compartidos entre páginas
// para evitar duplicación de código
// ========================================

// ========================================
// Función que retorna el array de usuarios
// ========================================
// Separar los datos en una función nos permite:
// 1. Reutilizar los datos en otras partes
// 2. Simular una llamada a una API
// 3. Facilitar pruebas y modificaciones
function getUsers() {
  return [
    {
      id: 1,
      name: 'Adele Vance',
      role: 'Software Engineer',
      location: 'Seattle, WA',
      description: 'Building scalable applications and cloud infrastructure.',
      image: 'img/Adele%20Vance.jpg'
    },
    {
      id: 2,
      name: 'Alex Wilber',
      role: 'Senior Product Designer',
      location: 'San Francisco, CA',
      description: 'Designing the future of collaboration tools and digital experiences.',
      image: 'img/Alex%20Wilber.jpg'
    },
    {
      id: 3,
      name: 'Diego Siciliani',
      role: 'Full Stack Developer',
      location: 'Brooklyn, NY',
      description: 'Building scalable web architectures and robust backend systems.',
      image: 'img/Diego%20Siciliani.jpg'
    },
    {
      id: 4,
      name: 'Grady Archie',
      role: 'Marketing Manager',
      location: 'London, UK',
      description: 'Focused on strategic growth and global brand positioning.',
      image: 'img/Grady%20Archie.jpg'
    },
    {
      id: 5,
      name: 'Henrietta Mueller',
      role: 'Data Scientist',
      location: 'Toronto, ON',
      description: 'Transforming raw complex data into actionable business insights.',
      image: 'img/Henrietta%20Mueller.jpg'
    },
    {
      id: 6,
      name: 'Isaiah Langer',
      role: 'Product Manager',
      location: 'Berlin, DE',
      description: 'Bridging the gap between user needs and technical feasibility.',
      image: 'img/Isaiah%20Langer.jpg'
    },
    {
      id: 7,
      name: 'Joni Sherman',
      role: 'UX Researcher',
      location: 'Austin, TX',
      description: 'Deeply understanding user behaviors to inform product strategy.',
      image: 'img/Joni%20Sherman.jpg'
    },
    {
      id: 8,
      name: 'Laura E Fernandez',
      role: 'Frontend Developer',
      location: 'Miami, FL',
      description: 'Creating beautiful and interactive user interfaces.',
      image: 'img/Laura%20E%20Fernandez.jpg'
    },
    {
      id: 9,
      name: 'Lee Gu',
      role: 'DevOps Engineer',
      location: 'San Jose, CA',
      description: 'Automating deployment and infrastructure management.',
      image: 'img/Lee%20Gu.jpg'
    },
    {
      id: 10,
      name: 'Lidia Holloway',
      role: 'QA Engineer',
      location: 'Chicago, IL',
      description: 'Ensuring quality and reliability in software products.',
      image: 'img/Lidia%20Holloway.jpg'
    },
    {
      id: 11,
      name: 'Lynne Robbins',
      role: 'Technical Writer',
      location: 'Boston, MA',
      description: 'Creating clear and comprehensive technical documentation.',
      image: 'img/Lynne%20Robbins.jpg'
    },
    {
      id: 12,
      name: 'Megan Bowen',
      role: 'Business Analyst',
      location: 'Denver, CO',
      description: 'Analyzing business requirements and optimizing processes.',
      image: 'img/Megan%20Bowen.jpg'
    },
    {
      id: 13,
      name: 'Miriam Graham',
      role: 'Project Manager',
      location: 'Phoenix, AZ',
      description: 'Leading cross-functional teams to deliver successful projects.',
      image: 'img/Miriam%20Graham.jpg'
    },
    {
      id: 14,
      name: 'Nestor Wilke',
      role: 'Security Engineer',
      location: 'Portland, OR',
      description: 'Protecting systems and data from security threats.',
      image: 'img/Nestor%20Wilke.jpg'
    },
    {
      id: 15,
      name: 'Pablo Fernandez',
      role: 'Mobile Developer',
      location: 'Los Angeles, CA',
      description: 'Building native and cross-platform mobile applications.',
      image: 'img/Pablo%20Fernandez.jpg'
    },
    {
      id: 16,
      name: 'Patti Fernandez',
      role: 'HR Manager',
      location: 'Dallas, TX',
      description: 'Managing talent acquisition and employee development.',
      image: 'img/Patti%20Fernandez.jpg'
    },
    {
      id: 17,
      name: 'Pradeep Gupta',
      role: 'Database Administrator',
      location: 'Atlanta, GA',
      description: 'Managing and optimizing database systems for performance.',
      image: 'img/Pradeep%20Gupta.jpg'
    }
  ];
}