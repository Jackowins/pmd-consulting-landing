'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  nationality: string;
  image: string;
  description: string;
  bio: string;
}

interface LanguageContent {
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  about: {
    title: string;
    story: string;
    diversity: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  project: {
    title: string;
    subtitle: string;
    description: string;
    outcomes: {
      title: string;
      description: string;
    }[];
    cta: string;
  };
  team: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
  assistant: {
    title: string;
    placeholder: string;
    welcome: string;
  };
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  const [userInput, setUserInput] = useState('');
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const content: Record<'en' | 'fr', LanguageContent> = {
    en: {
      hero: {
        title: "Transform Your Business with PMD Consulting",
        subtitle: "Strategic solutions that drive growth, innovation, and sustainable success for forward-thinking organizations.",
        cta1: "Explore Our Services",
        cta2: "Get Started Today"
      },
      about: {
        title: "About PMD Consulting",
        story: "Founded through a collaborative capstone project that demonstrated exceptional innovation and strategic thinking, PMD Consulting emerged from a student-led initiative that captured the attention of industry leaders. Our breakthrough solution was acquired by a Fortune 500 corporation, validating our approach and propelling us into the professional consulting arena.",
        diversity: "Today, we operate as a globally diverse team, bringing together exceptional talent from Ghana, Nigeria, Vietnam, and India. This multicultural foundation enables us to deliver innovative, culturally-aware solutions that resonate across international markets and diverse business environments."
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive consulting solutions tailored to your unique business challenges and growth objectives."
      },
      project: {
        title: "Modernizing Emissions Monitoring for Impact",
        subtitle: "Our Recent Project with a Canadian Energy Company",
        description: "PMD Consulting was engaged to assess and modernize emissions tracking for a major Canadian energy producer. Our OEMS pilot focuses on real-time visibility, compliance readiness, and financial efficiency.",
        outcomes: [
          {
            title: "+58.1% ROI by Year 4",
            description: "Significant financial returns through operational optimization"
          },
          {
            title: "Facility-level Real-time Dashboards",
            description: "Comprehensive monitoring and reporting capabilities"
          },
          {
            title: "Compliance-aligned with Federal Carbon Caps",
            description: "Meeting regulatory requirements and sustainability goals"
          }
        ],
        cta: "Explore Dashboard"
      },
      team: {
        title: "Meet Our Team",
        subtitle: "Experienced professionals from around the world, dedicated to delivering exceptional results for your business."
      },
      contact: {
        title: "Ready to Transform Your Business?",
        subtitle: "Let's discuss how PMD Consulting can help you achieve your strategic goals and drive sustainable growth."
      },
      assistant: {
        title: "PMD Assistant",
        placeholder: "Ask me anything about PMD Consulting...",
        welcome: "Hello! I'm your PMD Assistant. How can I help you today?"
      }
    },
    fr: {
      hero: {
        title: "Transformez Votre Entreprise avec PMD Consulting",
        subtitle: "Solutions stratégiques qui stimulent la croissance, l'innovation et le succès durable pour les organisations visionnaires.",
        cta1: "Explorer Nos Services",
        cta2: "Commencer Aujourd'hui"
      },
      about: {
        title: "À Propos de PMD Consulting",
        story: "Fondée à travers un projet de fin d'études collaboratif qui a démontré une innovation et une pensée stratégique exceptionnelles, PMD Consulting est née d'une initiative dirigée par des étudiants qui a capté l'attention des leaders de l'industrie. Notre solution révolutionnaire a été acquise par une entreprise Fortune 500, validant notre approche et nous propulsant dans l'arène du conseil professionnel.",
        diversity: "Aujourd'hui, nous opérons comme une équipe mondialement diversifiée, réunissant des talents exceptionnels du Ghana, du Nigeria, du Vietnam et de l'Inde. Cette fondation multiculturelle nous permet de fournir des solutions innovantes et culturellement conscientes qui résonnent à travers les marchés internationaux et les environnements commerciaux diversifiés."
      },
      services: {
        title: "Nos Services",
        subtitle: "Solutions de conseil complètes adaptées à vos défis commerciaux uniques et objectifs de croissance."
      },
      project: {
        title: "Modernisation du Suivi des Émissions pour l'Impact",
        subtitle: "Notre Projet Récent avec une Entreprise Énergétique Canadienne",
        description: "PMD Consulting a été engagé pour évaluer et moderniser le suivi des émissions pour un important producteur d'énergie canadien. Notre pilote OEMS se concentre sur la visibilité en temps réel, la préparation à la conformité et l'efficacité financière.",
        outcomes: [
          {
            title: "+58,1% ROI d'ici l'Année 4",
            description: "Rendements financiers significatifs grâce à l'optimisation opérationnelle"
          },
          {
            title: "Tableaux de Bord en Temps Réel au Niveau des Installations",
            description: "Capacités complètes de surveillance et de reporting"
          },
          {
            title: "Conformité Alignée avec les Plafonds Fédéraux de Carbone",
            description: "Répondre aux exigences réglementaires et aux objectifs de durabilité"
          }
        ],
        cta: "Explorer le Tableau de Bord"
      },
      team: {
        title: "Rencontrez Notre Équipe",
        subtitle: "Professionnels expérimentés du monde entier, dédiés à fournir des résultats exceptionnels pour votre entreprise."
      },
      contact: {
        title: "Prêt à Transformer Votre Entreprise?",
        subtitle: "Discutons de la façon dont PMD Consulting peut vous aider à atteindre vos objectifs stratégiques et stimuler une croissance durable."
      },
      assistant: {
        title: "Assistant PMD",
        placeholder: "Posez-moi n'importe quelle question sur PMD Consulting...",
        welcome: "Bonjour! Je suis votre Assistant PMD. Comment puis-je vous aider aujourd'hui?"
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const teamMembers: TeamMember[] = [
    {
      id: 'jackson',
      name: 'Jackson, David',
      role: 'Project Manager',
      nationality: 'Ghana',
      image: '/team/jackson.jpg',
      description: 'Experienced project manager with expertise in leading cross-functional teams and delivering complex business solutions.',
      bio: 'David brings over 8 years of project management experience, specializing in strategic planning and team leadership. He has successfully delivered numerous high-impact projects across various industries, ensuring on-time delivery and stakeholder satisfaction.'
    },
    {
      id: 'patience',
      name: 'Adefehinti, Patience',
      role: 'Team Lead',
      nationality: 'Nigeria',
      image: '/team/pato.jpg',
      description: 'Dynamic team leader with strong analytical skills and a proven track record of driving team performance and project success.',
      bio: 'Patience excels in team leadership and strategic planning, with expertise in process optimization and stakeholder management. She has led diverse teams to achieve exceptional results in challenging business environments.'
    },
    {
      id: 'phu',
      name: 'Vinh, Phu',
      role: 'Assistant Project Manager',
      nationality: 'Vietnam',
      image: '/team/phu.jpg',
      description: 'Detail-oriented assistant project manager with strong organizational skills and technical expertise.',
      bio: 'Phu specializes in project coordination and technical implementation, bringing valuable insights from his background in technology and business process management.'
    },
    {
      id: 'dolapo',
      name: 'Adegoke, Oluwadolapo',
      role: 'Business Analyst',
      nationality: 'Nigeria',
      image: '/team/dolapo.jpg',
      description: 'Analytical business analyst with expertise in data-driven decision making and process improvement.',
      bio: 'Oluwadolapo combines strong analytical skills with business acumen to identify opportunities for improvement and drive strategic initiatives.'
    },
    {
      id: 'pam',
      name: 'Parminder, Kaur',
      role: 'Business Analyst',
      nationality: 'India',
      image: '/team/pam.jpg',
      description: 'Skilled business analyst with expertise in requirements gathering and solution design.',
      bio: 'Parminder brings extensive experience in business analysis, specializing in stakeholder engagement and solution architecture.'
    },
    {
      id: 'michael',
      name: 'Uduokhai, Michael',
      role: 'Business Analyst',
      nationality: 'Nigeria',
      image: '/team/mich.jpg',
      description: 'Results-driven business analyst with strong problem-solving skills and technical expertise.',
      bio: 'Michael excels in translating business requirements into technical solutions, with a focus on efficiency and innovation.'
    }
  ];

  const getNationalityFlag = (nationality: string) => {
    switch (nationality) {
      case 'Ghana': return '🇬🇭';
      case 'Nigeria': return '🇳🇬';
      case 'Vietnam': return '🇻🇳';
      case 'India': return '🇮🇳';
      default: return '🌍';
    }
  };

  const openTeamModal = (member: TeamMember) => {
    setSelectedTeamMember(member);
    setIsModalOpen(true);
  };

  const closeTeamModal = () => {
    setIsModalOpen(false);
    setSelectedTeamMember(null);
  };

  const handleAssistantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput('');
    setAssistantMessages(prev => [...prev, { type: 'user', message: userMessage }]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setAssistantMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "PMD Consulting specializes in strategic planning, digital transformation, process optimization, market analysis, change management, and performance consulting. We help businesses achieve operational excellence through data-driven insights.";
    } else if (lowerMessage.includes('team') || lowerMessage.includes('who')) {
      return "Our diverse team includes David Jackson (Project Manager from Ghana), Patience Adefehinti (Team Lead from Nigeria), Phu Vinh (Assistant Project Manager from Vietnam), Oluwadolapo Adegoke (Business Analyst from Nigeria), Parminder Kaur (Business Analyst from India), and Michael Uduokhai (Business Analyst from Nigeria).";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('energy')) {
      return "We recently completed a major project with a Canadian energy company, modernizing their emissions monitoring system. The project achieved +58.1% ROI by Year 4, implemented real-time dashboards, and ensured compliance with federal carbon caps.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "You can reach us at hello@pmdconsulting.com or call us at +1 (555) 123-4567. We're located at 80 Mooregate Crescent, Kitchener, Ontario N2M 2E8.";
    } else if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return "We started as a group of students working on a capstone project. After our project was purchased by a large corporation, we decided to continue and have grown into an impactful player in the consulting space.";
    } else {
      return "Thank you for your question! I'm here to help with information about PMD Consulting's services, team, projects, and how we can assist your business. Feel free to ask about our recent Canadian energy project, our diverse team, or our consulting services.";
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-black mr-2">
                  <span style={{ color: '#ea580c' }}>PMD</span>
                </div>
                <div className="text-lg font-black text-black">CONSULTING</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'Home' : 'Accueil'}</button>
                <button onClick={() => scrollToSection('services')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'Services' : 'Services'}</button>
                <button onClick={() => scrollToSection('about')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'About' : 'À Propos'}</button>
                <button onClick={() => scrollToSection('project')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'Project' : 'Projet'}</button>
                <button onClick={() => scrollToSection('team')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'Team' : 'Équipe'}</button>
                <button onClick={() => scrollToSection('contact')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">{language === 'en' ? 'Contact' : 'Contact'}</button>
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                  className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  {language === 'en' ? 'FR' : 'EN'}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-orange-500 focus:outline-none focus:text-orange-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('home')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'Home' : 'Accueil'}</button>
              <button onClick={() => scrollToSection('services')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'Services' : 'Services'}</button>
              <button onClick={() => scrollToSection('about')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'About' : 'À Propos'}</button>
              <button onClick={() => scrollToSection('project')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'Project' : 'Projet'}</button>
              <button onClick={() => scrollToSection('team')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'Team' : 'Équipe'}</button>
              <button onClick={() => scrollToSection('contact')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">{language === 'en' ? 'Contact' : 'Contact'}</button>
              <button 
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="bg-orange-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors w-full text-left"
              >
                {language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              {currentContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {currentContent.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg"
              >
                {currentContent.hero.cta1}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                {currentContent.hero.cta2}
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-30"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {currentContent.services.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Planning",
                description: "Develop comprehensive business strategies that align with your vision and market opportunities.",
                icon: "🎯"
              },
              {
                title: "Digital Transformation",
                description: "Modernize your operations with cutting-edge technology solutions and digital strategies.",
                icon: "💻"
              },
              {
                title: "Process Optimization",
                description: "Streamline workflows and improve efficiency through data-driven process improvements.",
                icon: "⚡"
              },
              {
                title: "Market Analysis",
                description: "Deep-dive market research and competitive analysis to inform strategic decisions.",
                icon: "📊"
              },
              {
                title: "Change Management",
                description: "Guide your organization through successful transitions and cultural transformations.",
                icon: "🔄"
              },
              {
                title: "Performance Consulting",
                description: "Optimize team performance and organizational effectiveness through proven methodologies.",
                icon: "📈"
              }
            ].map((service, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                {currentContent.about.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {currentContent.about.story}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {currentContent.about.diversity}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600">{language === 'en' ? 'Projects Completed' : 'Projets Terminés'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">98%</div>
                  <div className="text-gray-600">{language === 'en' ? 'Client Satisfaction' : 'Satisfaction Client'}</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="h-96 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/consul/consulting-blog.jpg)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 text-white bg-black bg-opacity-50 rounded-lg">
                    <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{language === 'en' ? 'Strategic Excellence' : 'Excellence Stratégique'}</h3>
                    <p className="text-orange-200 text-lg font-medium">{language === 'en' ? 'Innovation • Growth • Success' : 'Innovation • Croissance • Succès'}</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {currentContent.project.title}
            </h2>
            <p className="text-xl text-orange-600 font-semibold mb-4">
              {currentContent.project.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentContent.project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {currentContent.project.outcomes.map((outcome, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="text-3xl font-bold text-orange-500 mb-4">{outcome.title}</div>
                <p className="text-gray-600">{outcome.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setIsDashboardModalOpen(true)}
              className="btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg"
            >
              {currentContent.project.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {currentContent.team.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="service-card bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openTeamModal(member)}
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-3">{getNationalityFlag(member.nationality)} {member.nationality}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
                <div className="mt-4 text-orange-500 text-sm font-medium">
                  {language === 'en' ? 'Click to learn more →' : 'Cliquez pour en savoir plus →'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {isModalOpen && selectedTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-black">{selectedTeamMember.name}</h2>
                <button
                  onClick={closeTeamModal}
                  className="text-gray-500 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="relative w-48 h-48 mx-auto md:mx-0">
                  <Image
                    src={selectedTeamMember.image}
                    alt={selectedTeamMember.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-orange-50 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-bold text-orange-600 mb-2">{selectedTeamMember.role}</h3>
                    <p className="text-gray-700">{selectedTeamMember.bio}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-2">🌍</span>
                    <span className="font-medium">From {selectedTeamMember.nationality}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-bold text-black mb-3">{language === 'en' ? 'Key Expertise' : 'Expertise Clé'}</h4>
                <p className="text-gray-600">{selectedTeamMember.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Modal */}
      {isDashboardModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-black">Modernizing GHG Monitoring in Energy Sector</h2>
                <button
                  onClick={() => setIsDashboardModalOpen(false)}
                  className="text-gray-500 hover:text-black text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">PMD Consulting - GHG Monitoring Dashboard</h3>
                  <p className="text-gray-600">Comprehensive overview of our Canadian energy sector project</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-4 text-blue-800">Project Overview</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Client:</strong> Major Canadian energy producer</li>
                      <li><strong>Focus:</strong> Facility-level emissions monitoring</li>
                      <li><strong>Technology:</strong> OEMS (Operational Emission Monitoring System)</li>
                      <li><strong>Scope:</strong> 2 Oil Sands Sites in Alberta</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-4 text-green-800">Key Outcomes</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>ROI:</strong> +58.1% by Year 4</li>
                      <li><strong>Savings:</strong> $734K-$786K annually (Years 3-4)</li>
                      <li><strong>Compliance:</strong> Real-time dashboards & alerts</li>
                      <li><strong>Scalability:</strong> Across upstream/downstream assets</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                  <h4 className="font-bold text-lg mb-4 text-orange-800">Implementation Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="font-bold text-blue-800">Phase 1</div>
                      <div>Site Selection & Setup</div>
                      <div className="text-xs text-gray-600">2 years</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="font-bold text-green-800">Phase 2</div>
                      <div>Configuration & Rollout</div>
                      <div className="text-xs text-gray-600">12 people</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="font-bold text-orange-800">Phase 3</div>
                      <div>Feedback & Improvement</div>
                      <div className="text-xs text-gray-600">$264K</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="font-bold text-purple-800">Phase 4</div>
                      <div>Scale & Optimize</div>
                      <div className="text-xs text-gray-600">Ongoing</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    This dashboard represents our comprehensive approach to modernizing emissions monitoring 
                    for Canada's leading energy producers, delivering measurable results and sustainable solutions.
                  </p>
                  <button
                    onClick={() => setIsDashboardModalOpen(false)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Close Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {language === 'en' ? 'What Our Clients Say' : 'Ce que Disent Nos Clients'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: language === 'en' 
                  ? "PMD Consulting transformed our business strategy and helped us achieve 40% growth in just one year."
                  : "PMD Consulting a transformé notre stratégie commerciale et nous a aidés à atteindre 40% de croissance en seulement un an.",
                author: "Jennifer Smith",
                company: "TechCorp Inc."
              },
              {
                quote: language === 'en'
                  ? "Their expertise in digital transformation was invaluable. We're now leading our industry in innovation."
                  : "Leur expertise en transformation numérique était inestimable. Nous menons maintenant notre industrie en innovation.",
                author: "David Wilson",
                company: "Global Solutions"
              },
              {
                quote: language === 'en'
                  ? "Professional, results-driven, and truly committed to our success. Highly recommended!"
                  : "Professionnel, axé sur les résultats et vraiment engagé dans notre succès. Fortement recommandé!",
                author: "Maria Garcia",
                company: "InnovateCo"
              }
            ].map((testimonial, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-orange-500 text-2xl mb-4">"</div>
                <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <div className="font-bold text-black">{testimonial.author}</div>
                  <div className="text-orange-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {currentContent.contact.title}
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {currentContent.contact.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">{language === 'en' ? 'Get In Touch' : 'Contactez-nous'}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📍</div>
                  <div>
                    <div className="font-semibold">{language === 'en' ? 'Address' : 'Adresse'}</div>
                    <div className="text-gray-300">80 Mooregate Crescent<br />Kitchener, Ontario N2M 2E8</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📧</div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@pmdconsulting.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📞</div>
                  <div>
                    <div className="font-semibold">{language === 'en' ? 'Phone' : 'Téléphone'}</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'First Name' : 'Prénom'}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Last Name' : 'Nom'}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder={language === 'en' ? 'Email Address' : 'Adresse Email'}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                />
                <textarea
                  placeholder={language === 'en' ? 'Tell us about your project' : 'Parlez-nous de votre projet'}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="btn-primary w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg"
                >
                  {language === 'en' ? 'Send Message' : 'Envoyer le Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-2xl font-bold text-white mr-2">
                  <span style={{ color: '#ea580c' }}>PMD</span>
                </div>
                <div className="text-lg font-black text-white">CONSULTING</div>
              </div>
              <p className="text-gray-400">
                {language === 'en' 
                  ? 'Transforming businesses through strategic innovation and sustainable growth solutions.'
                  : 'Transformer les entreprises par l\'innovation stratégique et les solutions de croissance durable.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'en' ? 'Services' : 'Services'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'en' ? 'Strategic Planning' : 'Planification Stratégique'}</li>
                <li>{language === 'en' ? 'Digital Transformation' : 'Transformation Numérique'}</li>
                <li>{language === 'en' ? 'Process Optimization' : 'Optimisation des Processus'}</li>
                <li>{language === 'en' ? 'Market Analysis' : 'Analyse de Marché'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'en' ? 'Company' : 'Entreprise'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'en' ? 'About Us' : 'À Propos'}</li>
                <li>{language === 'en' ? 'Our Team' : 'Notre Équipe'}</li>
                <li>{language === 'en' ? 'Careers' : 'Carrières'}</li>
                <li>{language === 'en' ? 'Contact' : 'Contact'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'en' ? 'Connect' : 'Connecter'}</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-md">
                  <span className="text-blue-600 text-lg">📘</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-md">
                  <span className="text-blue-400 text-lg">🐦</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-md">
                  <span className="text-blue-800 text-lg">💼</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{language === 'en' ? 'Built with pride by PMD Consulting, 2025' : 'Construit avec fierté par PMD Consulting, 2025'}</p>
          </div>
        </div>
      </footer>

      {/* PMD Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {isAssistantOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="bg-orange-500 text-white p-4 rounded-t-lg">
              <h3 className="font-bold">{currentContent.assistant.title}</h3>
            </div>
            <div className="h-64 overflow-y-auto p-4">
              {assistantMessages.length === 0 ? (
                <p className="text-gray-600 text-sm">{currentContent.assistant.welcome}</p>
              ) : (
                <div className="space-y-3">
                  {assistantMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleAssistantSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={currentContent.assistant.placeholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
