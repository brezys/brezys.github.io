import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Code2, Terminal, Database, Brain, ExternalLink, GraduationCap, Briefcase, Calendar, Clock, Languages, FileText } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language, setLanguage, t } = useLanguage();
  const [repos, setRepos] = useState<any[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);
  const graduationDate = new Date('2025-05-09');
  const today = new Date();
  const daysUntilGraduation = Math.ceil((graduationDate - today) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    // Fetch regular repositories
    fetch('https://api.github.com/users/brezys/repos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sortedRepos = data.sort((a, b) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
          setRepos(sortedRepos);
        } else {
          console.error('Expected array of repos but received:', data);
          setRepos([]);
        }
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
        setRepos([]);
      });

    // Fetch pinned repositories using GraphQL API
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "brezys") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    createdAt
                    updatedAt
                    primaryLanguage {
                      name
                    }
                    stargazerCount
                  }
                }
              }
            }
          }
        `
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.data?.user?.pinnedItems?.nodes) {
        setPinnedRepos(data.data.user.pinnedItems.nodes);
      }
    })
    .catch(error => {
      console.error('Error fetching pinned repos:', error);
      setPinnedRepos([]);
    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ja-JP', {
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredRepos = repos.filter(repo => 
    !pinnedRepos.some(pinnedRepo => pinnedRepo.name === repo.name)
  );

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const RepoCard = ({ repo, isPinned = false }) => (
    <motion.div 
      key={repo.id}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{repo.name}</h3>
        {isPinned && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            {language === 'en' ? 'Pinned' : 'ピン留め'}
          </span>
        )}
      </div>
      <div className="flex items-center text-gray-500 mb-2">
        <Calendar size={16} className="mr-2" />
        <span className="text-sm">{formatDate(repo.created_at || repo.createdAt)}</span>
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <Clock size={16} className="mr-2" />
        <span className="text-sm">
          {language === 'en' ? 'Updated ' : '更新日: '}
          {formatDate(repo.updated_at || repo.updatedAt)}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{repo.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-sm px-2 py-1 bg-gray-100 rounded">
            {repo.language || (repo.primaryLanguage && repo.primaryLanguage.name)}
          </div>
          <div className="text-sm text-gray-500">
            ⭐ {repo.stargazers_count || repo.stargazerCount}
          </div>
        </div>
        <a 
          href={repo.html_url || repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 md:py-32"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          {t('greeting')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
          {t('description', { days: String(daysUntilGraduation) })}
        </p>
        <div className="flex space-x-4">
          <a href="https://github.com/brezys" className="text-gray-600 hover:text-gray-900">
            <Github size={24} />
          </a>
          <a href="mailto:nicholashbrezinski@gmail.com" className="text-gray-600 hover:text-gray-900">
            <Mail size={24} />
          </a>
          <a href="https://linkedin.com/in/nick_brezinski" className="text-gray-600 hover:text-gray-900">
            <Linkedin size={24} />
          </a>
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-gray-900"
            title={language === 'en' ? '日本語' : 'English'}
          >
            <img 
              src={`https://hatscripts.github.io/circle-flags/flags/${language === 'en' ? 'jp' : 'us'}.svg`}
              width="24"
              height="24"
              alt={language === 'en' ? 'Japanese' : 'English'}
              className="rounded-full"
            />
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors ml-4"
          >
            <FileText size={20} className="mr-2" />
            {t('viewResume')}
          </a>
        </div>
      </motion.header>

      {/* Skills Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('skills')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <Code2 className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{t('frontend')}</h3>
              <p className="text-gray-600">React, TypeScript, Tailwind, Vite</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <Terminal className="text-green-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{t('backend')}</h3>
              <p className="text-gray-600">Node.js, Python, Java</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <Database className="text-purple-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{t('databases')}</h3>
              <p className="text-gray-600">SQL, SQLite3, MySQL</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <Brain className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{t('machineLearning')}</h3>
              <p className="text-gray-600">PyTorch, scikit-learn</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <Languages className="text-orange-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{t('japanese')}</h3>
              <p className="text-gray-600">{t('nlevel')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{t('projects')}</h2>
          
          {/* Featured Projects Section */}
          {pinnedRepos.length > 0 && (
            <div className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('featuredProjects')}</h3>
              <p className="text-gray-600 mb-8">{t('featuredDescription')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedRepos.map(repo => (
                  <RepoCard key={repo.id} repo={repo} isPinned={true} />
                ))}
              </div>
            </div>
          )}

          {/* Other Projects Section */}
          {filteredRepos.length > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('otherProjects')}</h3>
              <p className="text-gray-600 mb-8">{t('otherDescription')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.slice(0, 6).map(repo => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <GraduationCap className="text-blue-500 mr-3" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">{t('education')}</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{t('degree')}</h3>
            <p className="text-gray-600">{t('university')}</p>
            <p className="text-gray-500">{t('graduation')}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">{t('coursework')}</h4>
              <ul className="list-disc list-inside text-gray-600">
                {t('courses').map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section 
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Briefcase className="text-green-500 mr-3" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">{t('experience')}</h2>
          </div>
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">Software Engineering Intern</h3>
              <p className="text-gray-600">Company Name</p>
              <p className="text-gray-500">June 2023 - August 2023</p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Developed and maintained web applications using React and Node.js</li>
                <li>Collaborated with senior developers on large-scale projects</li>
                <li>Implemented new features and fixed bugs in existing codebase</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">Teaching Assistant</h3>
              <p className="text-gray-600">Your University Name</p>
              <p className="text-gray-500">September 2023 - Present</p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Assisted professor in teaching introductory programming courses</li>
                <li>Held office hours and provided one-on-one tutoring</li>
                <li>Graded assignments and provided detailed feedback to students</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
        */}
      
      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('connect')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('lookingFor')}</p>
          <a 
            href="mailto:nicholashbrezinski@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            {t('getInTouch')}
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;