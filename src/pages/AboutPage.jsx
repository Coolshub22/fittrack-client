import React from 'react';
import { Github, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Arnold Kulavi',
    role: 'Team Lead',
    bio: 'Part of the collaborative effort to shape FitTrack from idea to execution.',
    github: 'https://github.com/Coolshub22',
    email: 'arnoldkulavi@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Arnold+Kulavi&background=0ea5e9&color=fff'
  },
  {
    name: 'Marvin Kadoyo',
    role: 'Creative Strategist',
    bio: 'Helped build, refine, and improve both the interface and experience.',
    github: 'https://github.com/marvdeveloper',
    email: 'juniormarvin094@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Marvin+Kadoyo&background=10b981&color=fff'
  },
  {
    name: 'Victor Ngigi',
    role: 'Solutions Architect',
    bio: 'Contributed across multiple layers to ensure functionality and consistency.',
    github: 'https://github.com/victorngigi',
    email: 'victor.ngigi@outlook.com',
    avatar: 'https://ui-avatars.com/api/?name=Victor+Ngigi&background=8b5cf6&color=fff'
  },
  {
    name: 'Samwel Kitolo',
    role: 'Systems Integrator',
    bio: 'Played a central role in bringing FitTrack to life from backend to frontend.',
    github: 'https://github.com/omnieskay',
    email: 'omnieskay@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Samwel+Kitolo&background=f59e0b&color=fff'
  },
  {
    name: 'Kelvin Mwirigi',
    role: 'User Experience Curator',
    bio: 'Focused on elevating the user experience with attention to usability and design.',
    github: 'https://github.com/kmwirigii',
    email: 'kmwirigi05@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Kelvin+Mwirigi&background=ef4444&color=fff'
  },
  {
    name: 'Masela Ogendo',
    role: 'Core Collaborator',
    bio: 'Part of the hands-on development team that collaborated on all major features.',
    github: 'https://github.com/Ogendo-star',
    email: '',
    avatar: 'https://ui-avatars.com/api/?name=Masela+Ogendo&background=14b8a6&color=fff'
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-text-primary">
     {/* <h1 className="text-4xl font-bold mb-6 text-center">About FitTrack</h1> */}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
        <p className="text-text-secondary">
          FitTrack was born out of a shared commitment to make fitness progress easier to monitor,
          accessible to all, and tailored to personal journeys. Our team came together with one
          goal—to build something we ourselves would use daily.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-ui-cards border border-slate-700 rounded-xl p-6 shadow-sm text-center"
            >
              <div className="mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{member.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{member.role}</p>
              <p className="text-sm text-text-secondary mb-3">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github className="w-5 h-5 hover:text-accent" />
                </a>
                {member.email && (
                  <a href={`mailto:${member.email}`} title="Email">
                    <Mail className="w-5 h-5 hover:text-accent" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
